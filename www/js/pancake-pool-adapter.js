function PancakePoolAdapter(address) {
    this.address = address;
    this.abi = pancakePoolAbi;

    this.init = () => {
        this.contract =
            new document.web3.eth.Contract(this.abi, this.address);

        var info = { poolLength: 1 };
        return this.contract.methods.rewardToken()
            .call()
            .then(tokenRewardContract => {
                this.tokenRewardContract = tokenRewardContract;
                return getTokenSymbol(tokenRewardContract)
            }).then(symbol => {
                info.wantTokenName = symbol;
                return this.contract.methods.rewardPerBlock().call();
            }).then(rewardPerBlock => {
                info.rewardPerBlock = rewardPerBlock;
                return this.contract.methods.bonusEndBlock().call();
            }).then(endBlock => {
                info.endBlock = endBlock;
                return info;
            });
    };

    this.getStaked = (pid, address) => {
        return this.contract.methods.userInfo(address)
            .call()
            .then(response => {
                var value = response.amount;
                var staked = round(fromWei(value));
                if (staked > 0)
                    console.log(`staked ${staked} in ${this.address}`);
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
        return this.contract.methods.stakedToken()
            .call()
            .then(stakedTokenContract => {
                this.stakedTokenContract = stakedTokenContract;
                return getTokenSymbol(stakedTokenContract);
            });
    }

    this.getStakedBalance = (pid) => {
        return getTokenBalance(this.stakedTokenContract, this.address);
    };
}