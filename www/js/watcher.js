const secondsPerDay = 24 * 60 * 60;

function Watcher(adapter) {
    this.adapter = adapter;
    this.ready = false;
    this.error = false;

    this.adapter.init()
        .then(r => {
            this.poolLength = r.poolLength;
            this.wantTokenName = r.wantTokenName;
            this.endBlock = r.endBlock;
            this.rewardPerBlock = r.rewardPerBlock;

            console.log(`adapter con ${this.adapter.address} inicializado`);
            this.ready = true;
        }).catch(reason => {
            console.error(`error inicializando adapter con ${this.adapter.address}: ${reason}`);
            this.error = true;
        });

    this.futureReward = function (pid, address) {
        return new Promise((resolve, reject) => {
            if (this.endBlock === undefined || this.rewardPerBlock === undefined) {
                resolve(undefined)
            } else {
                document.web3.eth.getBlockNumber()
                    .then(blockNumber => {
                        console.log(`blockNumber: ${blockNumber} / endAt: ${this.endBlock}`);
                        if (this.endBlock <= blockNumber) {
                            console.log(`pool is ended`);
                            resolve(0);
                        } else {
                            var multiplier = this.endBlock - blockNumber;
                            console.log(`pool is live!. blocks to end: ${multiplier}`);

                            return this.adapter.getStakedBalance(pid)
                                .then(value => {
                                    var stakedTokenSupply = parseInt(value);
                                    console.log(`total staked supply: ${stakedTokenSupply}`);

                                    var reward = multiplier * this.rewardPerBlock;
                                    var futureReward = this.userStaked * reward / stakedTokenSupply;
                                    resolve({
                                        blocksToEnd: Math.max(this.endBlock - blockNumber, 0),
                                        futureReward: futureReward
                                    });
                                });
                        }
                    }).catch(reject);
            }
        });
    }

    this.getStaked = function (pid, address, callback) {
        this.adapter.getStaked(pid, address)
            .then(staked => {
                if (staked > 0) {
                    this.userStaked = staked;
                    var info = new Staked(`${this.wantTokenName} Pool`, staked);
                    info.rewardTokenName(this.wantTokenName);
                    callback(info);

                    setInterval(() => {
                        this.adapter.getPendingReward(pid, address)
                            .then(pendingReward => {
                                let now = moment();
                                if (info.startAt === undefined) {
                                    info.startAt = now;
                                    info.startPendingReward = pendingReward;
                                }
                                info.lastPendingRewardAt = now;
                                info.lastPendingReward = pendingReward;
                                info.pendingReward(round(pendingReward));
                            });
                        this.futureReward(pid, address)
                            .then(response => {
                                if (response !== undefined) {
                                    info.futureReward(round(response.futureReward));
                                    let days = response.blocksToEnd / 28000;
                                    info.futureRewardTimestamp(round(days, 0));
                                }
                                else if (info.lastPendingRewardAt) {
                                    let seconds = moment.duration(info.lastPendingRewardAt.diff(info.startAt)).asSeconds();
                                    if (seconds > 10) {
                                        let rewards = info.lastPendingReward - info.startPendingReward;
                                        console.log(`rewards ${rewards}|seconds ${seconds}`);

                                        info.futureReward(round(rewards * secondsPerDay * 28 / seconds));
                                        info.futureRewardTimestamp(28);
                                    }
                                }
                            });
                    }, 5000);

                    this.adapter.getPoolInfo(pid)
                        .then(symbol => info.wantTokenName(symbol));
                }
            })
            .catch(reason => {
                console.error(`error in pid ${pid}: ${reason.message}`);
            });
    }

    this.search = (address, callback) => {
        if (!this.ready) {
            if (!this.error) {
                console.log('Esperando que el adapter est?? inicializado');
                setTimeout(() => this.search(address, callback), 1000);
            } else {
                console.log('El adapter no pudo ser inicializado');
            }
            return;
        }

        console.log(`Recorriendo ${this.poolLength} pools`);

        for (var pid = 0; pid < this.poolLength; pid++) {
            this.getStaked(pid, address, callback);
        }
    };
}