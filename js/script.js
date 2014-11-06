var Region = function Region(options) {
    var self = this;

    if(!options.name) {
        throw "There is no region name";
    }

    this.name     = options.name;
    this.checked  = ko.observable(options.checked || false);
    this.children = options.children || [];
    this.parent   = null;

    var _instanceOf = 'Region';
    this.instanceOf = function() {
        return _instanceOf;
    };
};

Region.prototype.setState = function setState(parentStatus) {
    var status = arguments.length > 1 ?  !this.checked() : parentStatus;

    this.children.forEach(function(child) {
        if(child.instanceOf() == 'Region') {
            child.setState(status);
        }
    });

    this.checked(arguments.length > 1 ? status : parentStatus);
};

Region.prototype.addChild = function addChild(child) {
    if(child.instanceOf() == 'Region') {
        child.parent = this;
        this.children.push(child);
    }
};

Region.findParent = function(tree, node) {
    var parent = tree;
    var recursion = function recursion(tree, node) {
        if(tree == node) {
            return;
        }

        var result = false;
        tree.children.forEach(function(item) {
            if(item == node) {
                result = true;
                parent = tree;
                return;
            }

            recursion(item, node);
        });
    };

    recursion(tree, node);

    return parent;
};

Region.checkIfChildrenChecked = function(node) {
    var result = true;

    var recursion = function(item) {
        item.children.forEach(function(child) {
            if(!child.checked()) {
                result = false;
                return;
            } else {
                recursion(child);
            }
        });
    };

    recursion(node);

};

var viewModel = function() {

    var self = this;

    self.companyName    = ko.observable('');
    self.companyURL     = ko.observable('');
    self.adultContent   = ko.observable('false');

    self.adultContent.subscribe(function(newValue){
        console.log(newValue);
    });


    self.Ukraine        = ko.observable(false);
    self.Russia         = ko.observable(false);
    self.Belarus        = ko.observable(false);


    self.makeChildrenChecked = function(data){
        console.log(data.regions);
        for (var i = 0; i < data.regions.length; i++) {
            data.regions[i].checked(!data.regions[i].checked());
        }
        return true
    };

    self.makeParentUnchecked = function(data) {
        var region = self.geo.countries[findIndex(data)];

        console.log(region);
        if (!data.checked()) {
            region.checked(false);
        }
        else {
            var flag = true;
            for (var i = 0; i < region.regions.length; i++) {
                if (!region.regions[i].checked()) flag = false;
            }
            region.checked(flag);
        }
        return true;
    };


    function findIndex(obj) {

        var geography = self.geo.countries;
        var index = -1;

        for (var i = 0; i < geography.length; i++) {
            for (var j = 0; j < geography[i].regions.length; j++) {
                if (geography[i].regions[j].name == obj.name) {
                    index = i;
                }
            }
        }

        return index;
    }


    //self.geo = {
    //    checked: ko.observable(false),
    //    name: 'Все страны',
    //    countries: [
    //        { checked: ko.observable(false), country: 'Украина', regions: [
    //            { checked: ko.observable(false), name: "Киевская обл." },
    //            { checked: ko.observable(false), name: "Львовская обл." },
    //            { checked: ko.observable(false), name: "Донецкая обл." },
    //            { checked: ko.observable(false), name: "Николаевская обл." },
    //            { checked: ko.observable(false), name: "Крым" }
    //        ] },
    //        { checked: ko.observable(false), country: 'Россия', regions: [
    //            { checked: ko.observable(false), name: "Московская обл." },
    //            { checked: ko.observable(false), name: "Краснодарский край" },
    //            { checked: ko.observable(false), name: "Камчатка" },
    //            { checked: ko.observable(false), name: "Ленинградская обл." }
    //        ] },
    //        { checked: ko.observable(false), country: 'Беларусь', regions: [
    //            { checked: ko.observable(false), name: "Минск" },
    //            { checked: ko.observable(false), name: "Гомель" },
    //            { checked: ko.observable(false), name: "Брест" }
    //        ] }
    //
    //    ]
    //};

    self.geo = new Region({
        name: 'Все страны',
        children: [
            new Region({
                name: 'Украина',
                children: [
                    new Region({
                        name: 'Киевская обл.'
                    }),
                    new Region({
                        name: 'Львовская обл.'
                    }),
                    new Region({
                        name: 'Донецкая обл.'
                    }),
                    new Region({
                        name: 'Николаевская обл.'
                    }),
                    new Region({
                        name: 'АР Крым'
                    })
                ]
            }),
            new Region({
                name: 'Россия',
                children: [
                    new Region({
                        name: 'Московская обл.'
                    }),
                    new Region({
                        name: 'Краснодарский край'
                    }),
                    new Region({
                        name: 'Камчатка'
                    }),
                    new Region({
                        name: 'Ленинградская обл.'
                    })
                ]
            }),
            new Region({
                name: 'Беларусь',
                children: [
                    new Region({
                        name: 'Минск'
                    }),
                    new Region({
                        name: 'Брест'
                    }),
                    new Region({
                        name: 'Гомель'
                    })
                ]
            })
        ]
    });

    //self.geo.setChecked();

    //Region.prototype.toJSON = function() {
    //    var result = {
    //        name    : this.name,
    //        checked : this.checked(),
    //        children: (function() {
    //
    //        })()
    //    };
    //};
};

ko.applyBindings(new viewModel());


$(document).ready(function(){
    $('.toggleFlag').click(function(){
        if ($(this).hasClass('glyphicon-chevron-up')) {
            $(this).removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        }
        else {
            $(this).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        }
        //console.log($(this).('.toggleFlag + .toggle'));
        $(this).nextAll().last().slideToggle();
    });

});
