/**
 * Created by scarratt on 26/01/2015.
 */

(function () {
    define(['knockout', './../../src/components/provider-carousel/provider-carousel.js', 'jquery'], function (ko, component, $) {
        var ProviderCarouselViewModel = component.viewModel;
        var componentName = 'provider-carousel';
        component.synchronous = true;
        ko.components.register(componentName, component);

        describe('provider carousel component', function () {
            var fixture;

            beforeEach(function () {
                fixture = setFixtures('<' + componentName + ' params="{providers: providers}"></' + componentName + '>');


            });

            describe('when component loads', function() {

                beforeEach(function() {
                    ko.applyBindings({providers: expectedProviders}, $('#jasmine-fixtures')[0]);
                });

                it('has a img element for each provider provided', function() {
                    expect($('img').length).toBe(expectedProviders.length);
                })
            });
        });

        var expectedProviders = [
            {
                name: 'provider1',
                logoUrl: 'http://testlogo.com'
            },
            {
                name: 'provider2',
                logoUrl: 'http://testlogo.com'
            }
        ];
    })
}());
