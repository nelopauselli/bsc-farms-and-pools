function Watcher(adapter) {
    this.adapter = adapter;

    this.adapter.init()
        .then(r => {
            this.poolLength = r.poolLength;
            this.wantTokenName = r.wantTokenName;
        });

    this.getStaked = function (pid, address, pool) {
        this.adapter.getStaked(pid, address)
            .then(staked => {
                if (staked > 0) {
                    var info = new Staked(pid, staked);
                    info.rewardTokenName(this.wantTokenName);
                    pool.pendings.push(info);

                    this.adapter.getPendingReward(pid, address)
                        .then(pendingReward => info.pendingReward(round(pendingReward)));

                    this.adapter.getPoolInfo(pid)
                        .then(poolInfo => getTokenSymbol(poolInfo.wantToken))
                        .then(symbol => info.wantTokenName(symbol));
                }
            })
            .catch(reason => {
                console.error(`error in pid ${pid}: ${reason.message}`);
            });
    }

    this.search = (address, pool) => {
        console.log(`Recorriendo ${this.poolLength} pools`);

        for (var pid = 0; pid < this.poolLength; pid++) {
            this.getStaked(pid, address, pool);
        }
    };
}