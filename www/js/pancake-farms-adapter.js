function PancakeFarmsAdapter(address) {
    this.address = address;
    this.abi = pancakeFarmsAbi;

    this.init = () => {
        this.contract =
            new document.web3.eth.Contract(this.abi, this.address);

        var info = {};
        return this.contract.methods.poolLength()
            .call()
            .then(value => {
                info.poolLength = parseInt(value);
                return this.contract.methods.cake().call()
            })
            .then(tokenRewardContract => {
                return getTokenSymbol(tokenRewardContract)
            }).then(symbol => {
                info.wantTokenName = symbol;
                return info;
            });
    };

    this.getStaked = (pid, address) => {
        return this.contract.methods.userInfo(pid, address)
            .call()
            .then(response => {
                var value = response.amount;
                var staked = round(fromWei(value));

                return staked;
            });
    };

    this.getPendingReward = (pid, address) => {
        return this.contract.methods.pendingCake(pid, address)
            .call()
            .then(value => {
                var pendingReward = fromWei(value);
                return pendingReward;
            })
    }

    this.getPoolInfo = (pid) => {
        return this.contract.methods.poolInfo(pid)
            .call()
            .then(poolInfo => getTokenSymbol( poolInfo.lpToken ));
    }
}