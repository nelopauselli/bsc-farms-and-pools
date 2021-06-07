function PancakePoolAdapter(token) {
    fetch(`/ABIs/pancake-pool-${token}.json`)
        .then(response => response.json())
        .then(metadata => {
            this.contract = new document.web3.eth.Contract(metadata.ABI, metadata.address);

            this.contract.methods.stakedToken()
                .call()
                .then(tokenRewardContract => {
                    getTokenSymbol(tokenRewardContract)
                        .then(symbol => { this.wantTokenName = symbol; })
                });
        });

    this.getStaked = function (address, pool) {
        this.contract.methods.userInfo(address)
            .call()
            .then(userInfo => {
                var staked = round(fromWei(userInfo.amount));
                if (staked > 0) {
                    var info = new Staked('?', staked);
                    info.wantTokenName(this.wantTokenName);
                    pool.pendings.push(info);

                    this.getPendingReward(address, info);
                    this.contract.methods.rewardToken()
                        .call()
                        .then(rewardTokenContract => {
                            getTokenSymbol(rewardTokenContract)
                                .then(symbol => info.rewardTokenName(symbol))
                        });
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