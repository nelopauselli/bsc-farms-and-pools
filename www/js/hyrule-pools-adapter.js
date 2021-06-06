function HyrulePoolsAdapter() {
    fetch('/ABIs/hyrule-pools.json')
        .then(response => response.json())
        .then(metadata => {
            this.contract = new document.web3.eth.Contract(metadata.ABI, metadata.address);
            this.contract.methods.poolLength()
                .call()
                .then(value => this.poolLength = value);
        });

    this.getStaked = function (pid, address, pool) {
        this.contract.methods.userInfo(pid, address)
            .call()
            .then(userInfo => {
                if (userInfo.amount > 0) {
                    var staked = fromWei(userInfo.amount);
                    var info = new Staked(pid, 'gRUPEE', round(staked));
                    pool.pendings.push(info);

                    this.getPendingReward(pid, address, info);
                }
            })
            .catch(reason => {
                console.error(reason.message);
            });
    }

    this.getPendingReward = function (pid, address, info) {
        this.contract.methods.pendingEgg(pid, address)
            .call()
            .then(value => {
                if (value > 0) {
                    var pendingReward = fromWei(value);
                    info.rewardTokenName('RUPPE');
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