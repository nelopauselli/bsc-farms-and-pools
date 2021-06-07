function getTokenSymbol(address) {
    var contract = new document.web3.eth.Contract(bep20abi, address);
    return contract.methods.symbol().call();
}

function FarmsAdapter(address) {
    fetch('/ABIs/pancake-farms.json')
        .then(response => response.json())
        .then(abi => {
            this.contract = new document.web3.eth.Contract(abi, address);
            this.contract.methods.poolLength()
                .call()
                .then(value => this.poolLength = value);

            console.log(this.contract.methods);
            
            this.contract.methods.cake()
                .call()
                .then(tokenRewardContract => {
                    getTokenSymbol(tokenRewardContract)
                        .then(symbol => {
                            console.log(symbol);
                            this.wantTokenName = symbol;
                        })
                });
        });



    this.getStaked = function (pid, address, pool) {
        this.contract.methods.userInfo(pid, address)
            .call()
            .then(userInfo => {
                var staked = round(fromWei(userInfo.amount));
                if (staked > 0) {
                    var info = new Staked(pid, staked);
                    info.rewardTokenName(this.wantTokenName);
                    pool.pendings.push(info);

                    this.getPendingReward(pid, address, info);
                    this.contract.methods.poolInfo(pid)
                        .call()
                        .then(poolInfo => {
                            getTokenSymbol(poolInfo.lpToken)
                                .then(symbol => info.wantTokenName(symbol))
                        });
                }
            })
            .catch(reason => {
                console.error(reason.message);
            });
    }

    this.getPendingReward = function (pid, address, info) {
        this.contract.methods.pendingCake(pid, address)
            .call()
            .then(value => {
                if (value > 0) {
                    var pendingReward = fromWei(value);
                    info.pendingReward(round(pendingReward));
                }
            })
            .catch(reason => {
                console.error(reason.message);
            });
    }

    this.search = function (address, pool) {
        for (var pid = 0; pid < this.poolLength; pid++) {
            this.getStaked(pid, address, pool);
        }
    }
}