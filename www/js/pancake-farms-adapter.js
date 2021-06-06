function PancakeFarmsAdapter() {
    fetch('/ABIs/pancake-farms.json')
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
                var staked = round(fromWei(userInfo.amount));
                if (staked > 0) {
                    var info = new Staked(pid, 'CAKE-BNB LP', staked);
                    pool.pendings.push(info);

                    this.getPendingReward(pid, address, info);
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
                    info.rewardTokenName('CAKE');
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