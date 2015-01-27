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
                var request;

                beforeEach(function() {
                    jasmine.Ajax.install();
                    jasmine.clock().install();
                    ko.applyBindings({providers: expectedProviders}, $('#jasmine-fixtures')[0]);
                    request = jasmine.Ajax.requests.mostRecent();
                });


                afterEach(function() {
                    jasmine.clock().uninstall();
                    jasmine.Ajax.uninstall();
                });

                it('makes a call to the odin service', function() {
                    expect(request.url).toBe('http://odin.staging.simplifysystems.co.uk/api/v1/search/france/supplier');
                });

                it('request is a POST method', function() {
                    expect(request.method).toBe('POST');
                });

                it('has a img element for each provider provided', function() {
                    expect($('img').length).toBe(expectedProviders.length);
                });

                it('has the src of each img element set to the value for that provider', function() {
                    expect(getImageForUrl( expectedProviders[0].logoUrl).length).toBe(1);
                    expect(getImageForUrl( expectedProviders[1].logoUrl).length).toBe(1);
                });

                it('does not display details of any providers initialls', function() {
                    expect(findSpanContainingText(expectedProviders[0].details).is(':visible')).toBeFalsy();
                    expect(findSpanContainingText(expectedProviders[1].details).is(':visible')).toBeFalsy();
                });

                it('has timer set to 0 seconds to start', function() {
                    expect(findSpanContainingText("0").length).toBe(1);
                });

                describe('after successful response from providers service', function() {
                    var provider1 = {id: 1, logoUrl: 'http://newtestlogo1.com'},
                        provider2 = {id: 2, logoUrl: 'http://newtestlogo2.com'},
                        provider3 = {id: 3, logoUrl: 'http://newtestlogo3.com'},
                        allProviders = {Results:{hits: {hits: [{_source: provider1}, {_source: provider2}, {_source: provider3}]}}};

                    beforeEach(function(){
                        request.response({
                            "status": 200,
                            "contentType": 'application/json',
                            "responseText": JSON.stringify(allProviders)
                        })
                    });

                    it('replaces the original suppliers displayed with the new ones', function() {
                        expect(getImageForUrl( provider1.logoUrl).length).toBe(1);
                        expect(getImageForUrl( provider2.logoUrl).length).toBe(1);
                        expect(getImageForUrl( provider3.logoUrl).length).toBe(1);
                    })
                });

                describe('after 10 seconds', function() {
                    beforeEach(function() {
                        jasmine.clock().tick(10000);
                    });

                    it('has timer set to 10 seconds', function() {
                        expect(findSpanContainingText("10").length).toBe(1);
                    });
                });

                describe('when user clicks on provider', function() {
                    beforeEach(function() {
                        getImageForUrl( expectedProviders[0].logoUrl).click();
                    });

                    it('displays details for that provider', function() {
                        expect(findSpanContainingText(expectedProviders[0].details).is(':visible')).toBeTruthy();
                    });

                    describe('then when user selects different provider', function() {
                        beforeEach(function() {
                            getImageForUrl( expectedProviders[1].logoUrl).click();
                        });

                        it('displays details for new provider', function() {
                            expect(findSpanContainingText(expectedProviders[1].details).is(':visible')).toBeTruthy();
                        });
                    })
                })
            });

            function getImageForUrl(providerLogo) {
                return $("img[src='"+ providerLogo +"']");
            }

            function findSpanContainingText(text) {
                return $("span:contains('"+ text +"')")
            }
        });

        var expectedProviders = [
            {
                name: 'provider1',
                logoUrl: 'http://testlogo1.com',
                details: 'badger'
            },
            {
                name: 'provider2',
                logoUrl: 'http://testlogo2.com',
                details: 'badger2'
            }
        ];
    })
}());
