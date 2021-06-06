function PancakePoolAdapter(token) {
    fetch(`/ABIs/pancake-pool-${token}.json`)
        .then(response => response.json())
        .then(metadata => {
            this.contract = new document.web3.eth.Contract(metadata.ABI, metadata.address);
        });

    this.getStaked = function (address, pool) {
        this.contract.methods.userInfo(address)
            .call()
            .then(userInfo => {
                var staked = round(fromWei(userInfo.amount));
                if (staked > 0) {
                    var info = new Staked('?', 'CAKE', staked);
                    pool.pendings.push(info);

                    this.getPendingReward(address, info);
                }
            })
            .catch(reason => {
                console.error(reason.message);
            });
    }

    this.getPendingReward = function (address, info) {
        this.contract.methods.pendingReward(address)
            .call()
            .then(value => {
                if (value > 0) {
                    var pendingReward = fromWei(value);
                    info.rewardTokenName('TRX');
                    info.pendingReward(round(pendingReward));
                }
            })
            .catch(reason => {
                console.error(reason.message);
            });
    }

    this.search = function (address, pool) {
        this.getStaked(address, pool);
    }
}