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
                fixture = setFixtures('<' + componentName + '></' + componentName + '>');

            });

            describe('when component loads', function() {
                var request;

                beforeEach(function() {
                    jasmine.Ajax.install();
                    jasmine.clock().install();
                    ko.applyBindings({}, $('#jasmine-fixtures')[0]);
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

                describe('after successful response from providers service', function() {
                    var provider1 = {id: 1, logoUrl: 'http://newtestlogo1.com', details: 'badger1'},
                        provider2 = {id: 2, logoUrl: 'http://newtestlogo2.com', details: 'badger2'},
                        provider3 = {id: 3, logoUrl: 'http://newtestlogo3.com', details: 'badger3'},
                        provider4 = {id: 3, logoUrl: 'http://newtestlogo4.com', details: 'badger4'},
                        provider5 = {id: 3, logoUrl: 'http://newtestlogo5.com', details: 'badger5'},
                        provider6 = {id: 3, logoUrl: 'http://newtestlogo6.com', details: 'badger6'},
                        allProviders = {Results:{hits: {hits: [{_source: provider1}, {_source: provider2}, {_source: provider3}, {_source: provider4}, {_source: provider5}, {_source: provider6}]}}};

                    beforeEach(function(){
                        request.response({
                            "status": 200,
                            "contentType": 'application/json',
                            "responseText": JSON.stringify(allProviders)
                        })
                    });

                    it('only displays 5 images', function() {
                        expect($('img').length).toBe(5);
                    });

                    it('shows logo for first provider', function() {
                        expect(getImageForUrl( provider1.logoUrl).length).toBe(1);
                    });

                    it('shows logo for fitfth provider', function() {
                        expect(getImageForUrl( provider5.logoUrl).length).toBe(1);
                    });

                    it('does not show logo for sixth provider', function() {
                        expect(getImageForUrl( provider6.logoUrl).length).not.toBe(1);
                    });

                    describe('when user clicks previous arrow and already at start', function() {

                        beforeEach(function() {
                            $('.prevArrow').click();
                        });

                        it('shows logo for first provider', function() {
                            expect(getImageForUrl( provider1.logoUrl).length).toBe(1);
                        });

                        it('shows logo for fitfth provider', function() {
                            expect(getImageForUrl( provider5.logoUrl).length).toBe(1);
                        });
                    });

                    describe('when user clicks on next arrow', function() {
                        beforeEach(function() {
                            $('.nextArrow').click();
                        });

                        it('does not show logo for first provider', function() {
                            expect(getImageForUrl( provider1.logoUrl).length).not.toBe(1);
                        });

                        it('shows logo for sixth provider', function() {
                            expect(getImageForUrl( provider6.logoUrl).length).toBe(1);
                        });

                        describe('then when user clicks on next arrow but carousel is at the end', function() {
                            beforeEach(function() {
                                $('.nextArrow').click();
                            });

                            it('does not show logo for first provider', function() {
                                expect(getImageForUrl( provider1.logoUrl).length).not.toBe(1);
                            });

                            it('shows logo for second provider', function() {
                                expect(getImageForUrl( provider2.logoUrl).length).toBe(1);
                            });

                            it('shows logo for sixth provider', function() {
                                expect(getImageForUrl( provider6.logoUrl).length).toBe(1);
                            });
                        });

                        describe('then when user clicks on previous arrow', function() {
                            beforeEach(function() {
                                $('.prevArrow').click();
                            });


                            it('shows logo for first provider', function() {
                                expect(getImageForUrl( provider1.logoUrl).length).toBe(1);
                            });

                            it('shows logo for fitfth provider', function() {
                                expect(getImageForUrl( provider5.logoUrl).length).toBe(1);
                            });

                            it('does not show logo for sixth provider', function() {
                                expect(getImageForUrl( provider6.logoUrl).length).not.toBe(1);
                            });
                        })

                    });

                    describe('when user clicks on provider', function() {
                        beforeEach(function() {
                            getImageForUrl( provider1.logoUrl).click();
                        });

                        it('displays details for that provider', function() {
                            expect(findSpanContainingText(provider1.details).is(':visible')).toBeTruthy();
                        });

                        describe('then when user selects different provider', function() {
                            beforeEach(function() {
                                getImageForUrl( provider2.logoUrl).click();
                            });

                            it('displays details for new provider', function() {
                                expect(findSpanContainingText(provider2.details).is(':visible')).toBeTruthy();
                            });
                        })
                    })
                });
            });

            function getImageForUrl(providerLogo) {
                return $("img[src='"+ providerLogo +"']");
            }

            function findSpanContainingText(text) {
                return $("span:contains('"+ text +"')")
            }
        });
    })
}());
