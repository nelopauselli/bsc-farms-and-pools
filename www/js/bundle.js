const ether = 1000000000000000000;

function fromWei(value) {
    return value / ether;
}

function round(value) {
    return Math.round(value * 1000) / 1000;
}

function Pool(adapter, name, imageUrl) {
    this.adapter = adapter;
    this.imageUrl = imageUrl;
    this.name = name;

    this.pendings = ko.observableArray();

    this.search=function(address){
        this.adapter.search(address, this);
    }
}

function Staked(pid, wantTokenName, staked) {
    this.pid = pid;
    this.wantTokenName = wantTokenName;
    this.staked = staked;

    this.rewardTokenName = ko.observable();
    this.pendingReward = ko.observable();
}

function ViewModel() {
    this.address = '0x5a31925d4d8bed0abd2b3e452644691be8739c67';

    this.pools = [];
    this.pools.push(new Pool(null, 'Pancake Swap', '/img/pancake.png'));
    this.pools.push(new Pool(new HyruleVaultsAdapter(), 'Hyrule Swap - Vaults', '/img/hyrule.png'));
    this.pools.push(new Pool(new HyrulePoolsAdapter(), 'Hyrule Swap - Pools', '/img/hyrule.png'));
    this.pools.push(new Pool(null, 'Ape Swap', '/img/ape.png'));

    this.search = function () {
        this.pools.forEach(pool => {
            if (pool.adapter)
                pool.search(this.address);
        });
    }
}

(function (ko, Web3) {
    ko.applyBindings(new ViewModel());

    document.web3 = new Web3('https://bsc-dataseed1.binance.org:443');
})(ko, Web3);