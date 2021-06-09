function HyruleVaultsAdapter(address) {
    this.address = address;
    this.abi = hyruleVaultAbi;

    this.init = () => {
        this.contract =
            new document.web3.eth.Contract(this.abi, this.address);

        var info = {};
        return this.contract.methods.poolLength()
            .call()
            .then(value => {
                info.poolLength = parseInt(value);
                return this.contract.methods.GRUPEE().call()
            })
            .then(tokenRewardContract => {
                return getTokenSymbol(tokenRewardContract)
            }).then(symbol => {
                info.wantTokenName = symbol;
                return info;
            });
    };

    this.getStaked = (pid, address) => {
        return this.contract.methods.stakedWantTokens(pid, address)
            .call()
            .then(response => {
                var staked = round(fromWei(response));

                return staked;
            });
    };

    this.getPendingReward = (pid, address) => {
        return this.contract.methods.pendingGRUPEE(pid, address)
            .call()
            .then(value => {
                var pendingReward = fromWei(value);
                return pendingReward;
            })
    }

    this.getPoolInfo = (pid) => {
        return this.contract.methods.poolInfo(pid)
            .call()
            .then(poolInfo => getTokenSymbol(poolInfo.want));
    }
}