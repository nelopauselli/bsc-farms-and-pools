const ether = 1000000000000000000;

function fromWei(value) {
    return value / ether;
}

function PendingReward(pid, tokenName, pending) {
    this.pid = pid;
    this.tokenName = tokenName;
    this.pending = pending;
}

function Staked(pid, tokenName, pending) {
    this.pid = pid;
    this.tokenName = tokenName;
    this.pending = pending;
}

function HyruleAdapter() {
    fetch('/ABIs/hyrule.json')
        .then(response => response.json())
        .then(metadata => {
            this.contract = new document.web3.eth.Contract(metadata.ABI, metadata.address);
            this.contract.methods.poolLength()
                .call()
                .then(value => this.poolLength = value);
        });

    this.getPendingGRUPPE = function (pid, address, pool) {
        this.contract.methods.pendingGRUPEE(pid, address)
            .call()
            .then(value => {
                if (value > 0) {
                    var pendingReward = fromWei(value);
                    pool.pendings.push(new PendingReward(pid, 'GRUPPE', pendingReward));
                }
            })
            .catch(reason => {
                console.error(reason.message);
            });

        this.contract.methods.stakedWantTokens(pid, address)
            .call()
            .then(value => {
                if (value > 0) {
                    var staked = fromWei(value);
                    pool.pendings.push(new Staked(pid, 'RUPPE', staked));
                }
            })
            .catch(reason => {
                console.error(reason.message);
            });

    }

    this.search = function (address, pool) {
        for (var pid = 0; pid < this.poolLength; pid++) {
            this.getPendingGRUPPE(pid, address, pool);
        }
    }
}