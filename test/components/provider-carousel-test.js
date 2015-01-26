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
                });

                it('has the src of each img element set to the value for that provider', function() {
                    expect($("img[src='"+ expectedProviders[0].logoUrl +"']").length).toBe(1);
                    expect($("img[src='"+ expectedProviders[1].logoUrl +"']").length).toBe(1);
                });
            });
        });

        var expectedProviders = [
            {
                name: 'provider1',
                logoUrl: 'http://testlogo1.com'
            },
            {
                name: 'provider2',
                logoUrl: 'http://testlogo2.com'
            }
        ];
    })
}());
