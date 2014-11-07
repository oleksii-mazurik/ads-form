var Region = function Region(options) {

    if(!options.name) {
        throw "There is no region name";
    }

    this.name     = options.name;
    this.checked  = ko.observable(options.checked || false);
    this.children = options.children ? this.addChildren(options.children) : [];
    this.parent   = null;

    var _instanceOf = 'Region';
    this.instanceOf = function() {
        return _instanceOf;
    };

};

Region.prototype.addChildren = function(kids){
    this.children = [];
    for (var i = 0; i < kids.length; i++) {
        this.addChild(kids[i], this);
    }
    return this.children;
};

Region.prototype.setState = function setState(parentStatus) {

    parentStatus.checked(!parentStatus.checked())
    function toChilds(status, node) {
        if (node.children) {
            node.children.forEach(function(child){
                if (child.instanceOf() == 'Region') {
                    child.checked(status);
                }
                toChilds(status, child);
            });
        }
        else return;
    }

    function toParents(node) {
        if (node.parent) {
            var flag = true;
            node.parent.children.forEach(function(child){
                if (!child.checked()) {
                    flag = false;
                    return;
                }
            });
            node.parent.checked(flag);
            toParents(node.parent);
        }
        else {
            return;
        }
    }
    toChilds(parentStatus.checked(), parentStatus);
    toParents(parentStatus);
};

Region.prototype.addChild = function addChild(child, parentNode) {
    if(child.instanceOf() == 'Region') {
        child.parent = parentNode;
        parentNode.children.push(child);

    }
    return child;
};

var viewModel = function() {

    var self = this;

    self.companyName    = ko.observable('');
    self.companyURL     = ko.observable('');
    self.adultContent   = ko.observable('false');
    self.sex            = ko.observable('any');
    self.sumBudget      = ko.observable('');
    self.perDayBudget   = ko.observable('');
    self.adsSubject     = ko.observable('');

    self.remained       = ko.computed(function(){
        return (30 - self.companyName().length).toString();
    });



    self.returnSendForm = function() {


        var categoriesCont = [];
        var regionsCont = [];

        var categories = self.categories.categories;
        var countries = self.geo.children;

        for (var j = 0; j < countries.length; j++) {
            countries[j].children.forEach(function(child){
                if (child.checked()) {
                    regionsCont.push(child.name);
                }
            })
        }

        for (var i = 0; i < categories.length; i++) {
            if (categories[i].checked())
                categoriesCont.push(categories[i].name);
        }

        var sendForm = {
            name: self.companyName(),
            url: self.companyURL(),
            adultContent: self.adultContent(),
            sex: self.sex(),
            regions: regionsCont,
            sumBudget: self.sumBudget(),
            perDayBudget: self.perDayBudget(),
            subject: self.adsSubject(),
            categories: categoriesCont
        };


        alert('Отправлено: ' + ko.toJSON(sendForm));


        return ko.toJSON(sendForm);
    };

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


    self.categories = {
        checked: ko.observable(false),
        name: 'Категория',
        minPrice: 'Минимальн. Цена',
        recommendedPrice: 'Рекомендов. Цена',
        stablePrice: 'Установлен. Цена',
        categories: [
            {
                checked: ko.observable(false),
                name: 'Авто/Мото',
                minPrice: '0.50',
                recommendedPrice: '0.50',
                stablePrice:'0.50'
            },
            {
                checked: ko.observable(false),
                name: 'Бизнес и финансы',
                minPrice: '1.50',
                recommendedPrice: '1.50',
                stablePrice:'1.50'
            },
            {
                checked: ko.observable(false),
                name: 'Дом и быт',
                minPrice: '0.50',
                recommendedPrice: '0.50',
                stablePrice:'0.50'
            },
            {
                checked: ko.observable(false),
                name: 'Красота и здоровье',
                minPrice: '1.89',
                recommendedPrice: '1.89',
                stablePrice:'1.89'
            },
            {
                checked: ko.observable(false),
                name: 'Культура и искусство',
                minPrice: '0.50',
                recommendedPrice: '0.50',
                stablePrice:'0.50'
            },
            {
                checked: ko.observable(false),
                name: 'Мода и стиль',
                minPrice: '1.50',
                recommendedPrice: '1.50',
                stablePrice:'1.50'
            },
            {
                checked: ko.observable(false),
                name: 'Недвижимость',
                minPrice: '0.50',
                recommendedPrice: '0.50',
                stablePrice:'0.50'
            },
            {
                checked: ko.observable(false),
                name: 'Новости и СМИ',
                minPrice: '1.89',
                recommendedPrice: '1.89',
                stablePrice:'1.89'
            },
            {
                checked: ko.observable(false),
                name: 'Образование и работа',
                minPrice: '0.50',
                recommendedPrice: '0.50',
                stablePrice:'0.50'
            },
            {
                checked: ko.observable(false),
                name: 'Политика',
                minPrice: '1.50',
                recommendedPrice: '1.50',
                stablePrice:'1.50'
            },
            {
                checked: ko.observable(false),
                name: 'Знакомства',
                minPrice: '0.50',
                recommendedPrice: '0.50',
                stablePrice:'0.50'
            },
            {
                checked: ko.observable(false),
                name: 'Развлечения и досуг',
                minPrice: '1.89',
                recommendedPrice: '1.89',
                stablePrice:'1.89'
            },
            {
                checked: ko.observable(false),
                name: 'Спорт',
                minPrice: '0.50',
                recommendedPrice: '0.50',
                stablePrice:'0.50'
            },
            {
                checked: ko.observable(false),
                name: 'Техника и аксессуары',
                minPrice: '1.50',
                recommendedPrice: '1.50',
                stablePrice:'1.50'
            },
            {
                checked: ko.observable(false),
                name: 'Туризм и путешествия',
                minPrice: '0.50',
                recommendedPrice: '0.50',
                stablePrice:'0.50'
            },
            {
                checked: ko.observable(false),
                name: 'Азартные игры',
                minPrice: '1.89',
                recommendedPrice: '1.89',
                stablePrice:'1.89'
            },
            {
                checked: ko.observable(false),
                name: 'Игры',
                minPrice: '0.50',
                recommendedPrice: '0.50',
                stablePrice:'0.50'
            },
            {
                checked: ko.observable(false),
                name: 'Прочее',
                minPrice: '1.50',
                recommendedPrice: '1.50',
                stablePrice:'1.50'
            },
            {
                checked: ko.observable(false),
                name: 'Для взрослых',
                minPrice: '0.50',
                recommendedPrice: '0.50',
                stablePrice:'0.50'
            }
        ]
    };

    self.changeChildren = function(){

        self.categories.categories.forEach(function(child){
            child.checked(self.categories.checked());
        });

        return true;
    };

    self.changeParent = function() {
        var flag = true;

        self.categories.categories.forEach(function(child){
            if (!child.checked()) {
                flag = false;
            }
        });

        self.categories.checked(flag);
        return true;
    };
};

ko.applyBindings(new viewModel());




$(document).ready(function(){
    $('.toggleFlag').click(function(){
        if ($(this).hasClass('glyphicon-chevron-down')) {
            $(this).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-right');
        }
        else {
            $(this).removeClass('glyphicon-chevron-right').addClass('glyphicon-chevron-down');
        }
        $(this).nextAll().last().slideToggle();
    });

});
