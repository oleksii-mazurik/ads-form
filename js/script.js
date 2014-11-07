var Region = function Region(options) {

    var self = this;

    if(!options.name) {
        throw "There is no region name";
    }

    this.name     = options.name;
    this.checked  = ko.observable(options.checked || false);
    //this.children = this.addChildren(options.children) || [];
    this.children = options.children ? this.addChildren(options.children) : [];
    this.parent   = null;

    var _instanceOf = 'Region';
    this.instanceOf = function() {
        return _instanceOf;
    };
};

Region.prototype.addChildren = function(kids){
    this.children = [];
    console.log(kids.length);
    //debugger;
    for (var i = 0; i < kids.length; i++) {
        this.addChild(kids[i], this);
    }
    return this;
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

Region.prototype.addChild = function addChild(child, parentNode) {
    //debugger;
    console.log(child);
    if(child.instanceOf() == 'Region') {
        child.parent = parentNode;
        parentNode.children.push(child);
    }
    console.log(child);
    return this;
};

//Region.findParent = function(tree, node) {
//    var parent = tree;
//    var recursion = function recursion(tree, node) {
//        if(tree == node) {
//            return;
//        }
//
//        var result = false;
//        tree.children.forEach(function(item) {
//            if(item == node) {
//                result = true;
//                parent = tree;
//                return;
//            }
//
//            recursion(item, node);
//        });
//    };
//
//    recursion(tree, node);
//
//    return parent;
//};

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
