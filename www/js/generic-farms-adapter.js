function getTokenSymbol(address) {
    var contract = new document.web3.eth.Contract(bep20abi, address);
    return contract.methods.symbol().call();
}

function FarmsAdapter(options) {
    if (typeof options === 'string')
        options = { address: options };

    this.options = Object.assign({
        abi: genericPoolAbi,
        wantTokenMethod: "cake()",
        rewardTokenMethod: "pendingCake(uint256,address)",
        getStakedMethod: "userInfo(uint256,address)",
        userInfoAmountProperty: "amount",
        poolInfoLpProperty: "lpToken"
    }, options);

    this.contract = new document.web3.eth.Contract(this.options.abi, this.options.address);
    this.contract.methods.poolLength()
        .call()
        .then(value => this.poolLength = value);

    this.contract.methods[this.options.wantTokenMethod]()
        .call()
        .then(tokenRewardContract => {
            getTokenSymbol(tokenRewardContract)
                .then(symbol => { this.wantTokenName = symbol; })
        });

    this.getStaked = function (pid, address, pool) {
        this.contract.methods[this.options.getStakedMethod](pid, address)
            .call()
            .then(response => {
                var value = typeof response === 'object'
                    ? response[this.options.userInfoAmountProperty]
                    : parseInt(response);

                var staked = round(fromWei(value));
                if (staked > 0) {
                    var info = new Staked(pid, staked);
                    info.rewardTokenName(this.wantTokenName);
                    pool.pendings.push(info);

                    this.getPendingReward(pid, address, info);
                    this.contract.methods.poolInfo(pid)
                        .call()
                        .then(poolInfo => {
                            getTokenSymbol(poolInfo[this.options.poolInfoLpProperty])
                                .then(symbol => info.wantTokenName(symbol))
                        });
                }
            })
            .catch(reason => {
                console.error(reason.message);
            });
    }

    this.getPendingReward = function (pid, address, info) {
        this.contract.methods[this.options.rewardTokenMethod](pid, address)
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