define(['knockout', 'text!./provider-carousel.html', 'lodash', 'jquery'], function(ko, templateMarkup, _, $) {

  function ProviderCarousel(params) {
    this.message = ko.observable('Hello from the provider-carousel component!');

      self.currentIndex = ko.observable(0);
      self.providers = ko.observable();
      self.selectedProvider = ko.observable({});
      self.visibleProviders = ko.computed(function() {
          return _.slice(self.providers(), self.currentIndex(), self.currentIndex() + 5)
      });

      self.selectProvider = function(provider) {
        self.selectedProvider(provider);
      };

      self.next = function() {
          if (self.currentIndex() +5 >= self.providers().length){
              return;
          }

          self.currentIndex(self.currentIndex() +1);
      };

      self.previous = function() {
          if (self.currentIndex() <= 0) {
              return;
          }

          self.currentIndex(self.currentIndex()-1);
      };

      function getProviders() {
          $.ajax({
                  url: 'http://odin.staging.simplifysystems.co.uk/api/v1/search/france/supplier',
                  type: 'POST',
                  contentType: 'application/json',
                  data: JSON.stringify({
                      "query": {}
                  })
              }
          ).done(function (data) {
                  var providers = mapElasticSearchResultsToProviderData(data.Results.hits.hits);

                  self.providers(providers);
              }).fail(function (error, text) {
              });
      }

      function mapElasticSearchResultsToProviderData (results) {
          return _.map(results, function(result){
              return result._source;
          });
      }

      getProviders();
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  ProviderCarousel.prototype.dispose = function() { };
  
  return { viewModel: ProviderCarousel, template: templateMarkup };

});
