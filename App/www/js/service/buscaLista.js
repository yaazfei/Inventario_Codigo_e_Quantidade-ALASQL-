angular.module("starter")

//PARA SER USADO NO EXEMPLO DE https://github.com/ccoenraets/force-contacts-angular-ionic/blob/master/force-contacts-angular-ionic/www/templates/contact-index.html





      .factory('OAuthService', function($q) {

          var apiVersion = "v29.0", // The version of the REST API you wish to use in your app.
              forcetkClient,
              oauth;

          function initialize() {
              var deferred = $q.defer();

              oauth = cordova.require("salesforce/plugin/oauth");

              // Call getAuthCredentials to get the initial session credentials
              oauth.getAuthCredentials(
                  function (creds) {
                      salesforceSessionRefreshed(creds);
                      deferred.resolve();
                  },
                  function(error) {
                      alert("Authentication Error: " + error);
                      deferred.fail(error);
                  });

              // Register to receive notifications when autoRefreshOnForeground refreshes the sfdc session
              document.addEventListener("salesforceSessionRefresh", salesforceSessionRefreshed, false);

              return deferred.promise;
          }

          function salesforceSessionRefreshed(creds) {
              // Depending on how we come into this method, `creds` may be callback data from the auth
              // plugin, or an event fired from the plugin.  The data is different between the two.
              var credsData = creds;
              if (creds.data)  // Event sets the `data` object with the auth data.
                  credsData = creds.data;

              forcetkClient = new forcetk.Client(credsData.clientId, credsData.loginUrl, null, oauth.forcetkRefresh);
              forcetkClient.setSessionToken(credsData.accessToken, apiVersion, credsData.instanceUrl);
              forcetkClient.setRefreshToken(credsData.refreshToken);
              forcetkClient.setUserAgentString(credsData.userAgent);
          }

          return {
              initialize: initialize,
              getClient: function() {
                  return forcetkClient;
              }
          };

      })



.factory('buscaLista', function($q, OAuthService) {
          function query(queryStr) {
            var injector = angular.injector(["ng"]);
            var $q = injector.get("$q");

              var deferred = $q.defer();
              OAuthService.getClient().query(queryStr,
                  function(response) {
                      var bens = response.records;
                      deferred.resolve(bens);
                  },
                  function(error) {
                      alert(JSON.stringify(error));
                      deferred.fail(error);
                  });
              return deferred.promise;
          }

          return {
              findAll: function() {
                  return query('SELECT CHAPA, DESC_BEM FROM bem LIMIT 50');
              },

              findByName: function(searchKey) {
                  return query('SELECT CHAPA, DESC_BEM FROM bem WHERE DESC_BEM LIKE \'%' + searchKey + '%\' LIMIT 50');
              },

              findByCodigo: function(bemCodigo) {
                  var deferred = $q.defer();
                  OAuthService.getClient().retrieve('Bem', bemCodigo, ['Chapa', 'Descrição', 'Código', 'Código Local'],
                      function(bem) {
                          deferred.resolve(bem);
                      },
                      function(error) {
                          alert(JSON.stringify(error));
                          deferred.fail(error);
                      });
                  return deferred.promise;
              }

          };







});
