var viewModel = function() {

    var self = this;

    self.companyName    = ko.observable('');
    self.companyURL     = ko.observable('');
    self.adultContent   = ko.observable('false');


    self.changeCountries = function() {
        var geography = self.geo;
        //geography.checked(!geography.checked());

        for (var i = 0; i < geography.countries.length; i++) {
            geography.countries[i].checked(geography.checked());
            self.makeChildrenChecked(geography.countries[i]);
        }

        return true;
    };

    self.makeChildrenChecked = function(data){

        //data.checked(!data.checked());
        var flag = checked
        for (var i = 0; i < data.regions.length; i++) {
            data.regions[i].checked(data.checked());
        }
        return true;
    };

    self.makeParentUnchecked = function(data, event) {
        //data.checked(!data.checked());

        var region = self.geo.countries[findIndex(data)];

        var flag = true;
        for (var i = 0; i < region.regions.length; i++) {
            if (!region.regions[i].checked()) flag = false;
        }
        region.checked(flag);

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


    self.geo = {
        checked: ko.observable(false),
        name: 'Все страны',
        countries: [
            { checked: ko.observable(false), country: 'Украина', regions: [
                { checked: ko.observable(false), name: "Киевская обл." },
                { checked: ko.observable(false), name: "Львовская обл." },
                { checked: ko.observable(false), name: "Донецкая обл." },
                { checked: ko.observable(false), name: "Николаевская обл." },
                { checked: ko.observable(false), name: "Крым" }
            ] },
            { checked: ko.observable(false), country: 'Россия', regions: [
                { checked: ko.observable(false), name: "Московская обл." },
                { checked: ko.observable(false), name: "Краснодарский край" },
                { checked: ko.observable(false), name: "Камчатка" },
                { checked: ko.observable(false), name: "Ленинградская обл." }
            ] },
            { checked: ko.observable(false), country: 'Беларусь', regions: [
                { checked: ko.observable(false), name: "Минск" },
                { checked: ko.observable(false), name: "Гомель" },
                { checked: ko.observable(false), name: "Брест" }
            ] }
        ]
    };

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

    $('.glyphicon-chevron-down').click(function(){
        console.log(this);
        $(this).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        $('.toggle').slideDown();
    })
});
