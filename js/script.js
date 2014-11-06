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



    self.geo = ko.observableArray([

        { checked: ko.observable(false), country: 'Украина', regions: [
            { checked: ko.observable(false), name: "Киевская обл." },
            { checked: ko.observable(false), name: "Львовская обл." },
            { checked: ko.observable(false), name: "Донецкая обл." },
            { checked: ko.observable(false), name: "Николаевская обл." },
            { checked: ko.observable(false), name: "Крым" }
        ] },
        { checked: false, country: 'Россия', regions: [
            { checked: ko.observable(false), name: "Московская обл." },
            { checked: ko.observable(false), name: "Краснодарский край" },
            { checked: ko.observable(false), name: "Камчатка" },
            { checked: ko.observable(false), name: "Ленинградская обл." }
        ] },
        { checked: false, country: 'Беларусь', regions: [
            { checked: ko.observable(false), name: "Минск" },
            { checked: ko.observable(false), name: "Гомель" },
            { checked: ko.observable(false), name: "Брест" }
        ] }

    ]);


};

ko.applyBindings(new viewModel());

