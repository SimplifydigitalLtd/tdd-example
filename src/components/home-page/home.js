define(["knockout", "text!./home.html"], function (ko, homeTemplate) {

    function HomeViewModel(route) {
        this.message = ko.observable('Welcome to tdd_example!');

        this.providers = [
            {
                name: 'provider1',
                logoUrl: 'http://placehold.it/160x100',
                details: 'badger'
            },
            {
                name: 'provider2',
                logoUrl: 'http://placehold.it/160x100',
                details: 'badger2'
            }
        ];
    }

    HomeViewModel.prototype.doSomething = function () {
        this.message('You invoked doSomething() on the viewmodel.');
    };

    return {viewModel: HomeViewModel, template: homeTemplate};

});
