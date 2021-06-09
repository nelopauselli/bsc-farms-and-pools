function PancakePoolAdapter(address) {
    this.address = address;
    this.abi = pancakePoolAbi;

    this.init = () => {
        this.contract =
            new document.web3.eth.Contract(this.abi, this.address);

        var info = { poolLength: 1 };
        return this.contract.methods.stakedToken()
            .call()
            .then(tokenRewardContract => {
                return getTokenSymbol(tokenRewardContract)
            }).then(symbol => {
                info.wantTokenName = symbol;
                return info;
            });
    };

    this.getStaked = (pid, address) => {
        return this.contract.methods.userInfo(address)
            .call()
            .then(response => {
                var value = response.amount;
                var staked = round(fromWei(value));

                return staked;
            });
    };

    this.getPendingReward = (pid, address) => {
        return this.contract.methods.pendingReward(address)
            .call()
            .then(value => {
                var pendingReward = fromWei(value);
                return pendingReward;
            })
    }

    this.getPoolInfo = (pid) => {
        return this.contract.methods.rewardToken()
            .call()
            .then(rewardToken => getTokenSymbol(rewardToken));
    }
}