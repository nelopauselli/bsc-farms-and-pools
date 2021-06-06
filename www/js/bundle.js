const ether = 1000000000000000000;

function fromWei(value) {
    return value / ether;
}

function round(value) {
    return Math.round(value * 1000) / 1000;
}

function Pool(adapters, name, imageUrl) {
    this.adapters = adapters;
    this.imageUrl = imageUrl;
    this.name = name;

    this.pendings = ko.observableArray();

    this.search = function (address) {
        this.adapters.forEach(adapter => {
            adapter.search(address, this);
        });
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
    var self = this;
    this.address = ko.observable();

    this.pools = [];
    this.pools.push(new Pool([new PancakeFarmsAdapter(), new PancakePoolAdapter("trx")], 'Pancake Swap', '/img/pancake.png'));
    this.pools.push(new Pool([new HyruleVaultsAdapter(), new HyrulePoolsAdapter()], 'Hyrule Swap', '/img/hyrule.png'));
    this.pools.push(new Pool([], 'Ape Swap', '/img/ape.png'));

    this.address.subscribe(function (addr) {
        self.search(addr);
    });

    this.search = function (addr) {
        if (!addr)
            addr = this.address();

        this.pools.forEach(pool => {
            pool.search(this.address());
        });
    }

}

(function (ko, Web3) {
    var vm = new ViewModel();
    ko.applyBindings(vm);

    //para esperar a que cargue los poolLength de los contratos
    setTimeout(() => {
        vm.address('0x5a31925d4d8bed0abd2b3e452644691be8739c67');
    }, 2000);

    document.web3 = new Web3('https://bsc-dataseed1.binance.org:443');
})(ko, Web3);