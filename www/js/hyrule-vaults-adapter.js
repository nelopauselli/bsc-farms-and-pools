function HyruleVaultsAdapter() {
    fetch('/ABIs/hyrule-vaults.json')
        .then(response => response.json())
        .then(metadata => {
            this.contract = new document.web3.eth.Contract(metadata.ABI, metadata.address);
            this.contract.methods.poolLength()
                .call()
                .then(value => this.poolLength = value);
        });

    this.getStaked = function (pid, address, pool) {
        this.contract.methods.stakedWantTokens(pid, address)
            .call()
            .then(value => {
                if (value > 0) {
                    var staked = fromWei(value);
                    var info = new Staked(pid, 'RUPPE', round(staked));
                    pool.pendings.push(info);

                    this.getPendingReward(pid, address, info);
                }
            })
            .catch(reason => {
                console.error(reason.message);
            });
    }

    this.getPendingReward = function (pid, address, info) {
        this.contract.methods.pendingGRUPEE(pid, address)
            .call()
            .then(value => {
                if (value > 0) {
                    var pendingReward = fromWei(value);
                    info.rewardTokenName('GRUPPE');
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