angular.module('starter').controller('consultarProdutoCtrl', function($scope, $state, $cordovaFile, $ionicPopup, $cordovaContacts, $http, $ionicScrollDelegate, filterFilter, $location, $anchorScroll, Scopes, FormatarCsv, PopUps, CriarDiretorio) {

      //local = Scopes.getItem();
      $scope.local = Scopes.getItem();



// Lista em Json
      $scope.bens= [];
      $http.get('js/bens.json').then(function(response) {
          $scope.bens =response.data;
          var bens = $scope.bens;
          console.log($scope.bens);
      });





      //Filter/Busca

      var letters = $scope.letters = [];
      var listaBem = $scope.listaBem = [];
      var currentCharCode = ' '.charCodeAt(0) - 1;


        $scope.bens.sort(function(a, b) {
            return a.DESC_BEM > b.DESC_BEM ? 1 : -1;
          })
          .forEach(function(bem) {
            //Get the first letter of the last name, and if the last name changes
            //put the letter in the array
            var bemCharCode = bem.DESC_BEM.toUpperCase().charCodeAt(0);
            if (bemCharCode < 65) {
               bemCharCode = 35;
            }

            //We may jump two letters, be sure to put both in
            //(eg if we jump from Adam Bradley to Bob Doe, add both C and D)
            var difference = bemCharCode - currentCharCode;

            for (var i = 1; i <= difference; i++) {
              /*console.log(String.fromCharCode(currentCharCode));*/
              addLetter(currentCharCode + i);
            }
            currentCharCode = bemCharCode;
            listaBem.push(bem);
          });

        //If names ended before Z, add everything up to Z
        for (var i = currentCharCode + 1; i <= 'Z'.charCodeAt(0); i++) {
          addLetter(i);
        }

        function addLetter(code) {
          var letter = String.fromCharCode(code);

          listaBem.push({
            isLetter: true,
            letter: letter
          });

          letters.push(letter);
        }

        //Letters are shorter, everything else is 52 pixels
        $scope.getItemHeight = function(item) {
          return item.isLetter ? 40 : 100;
        };

        $scope.scrollTop = function() {
          $ionicScrollDelegate.scrollTop();
        };

        $scope.scrollBottom = function() {
          $ionicScrollDelegate.scrollBottom();
        };

        var letterHasMatch = {};
        $scope.getBem = function() {
          letterHasMatch = {};
          //Filter contacts by $scope.search.
          //Additionally, filter letters so that they only show if there
          //is one or more matching contact
          return listaBem.filter(function(item) {
            var itemDoesMatch = !$scope.search || item.isLetter ||
              item.DESC_BEM.toLowerCase().indexOf($scope.search.toLowerCase()) > -1 ||
              item.CHAPA.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;

            //console.log(item.last_name.toString().charAt(0));

            //Mark this person's last name letter as 'has a match'
            if (!item.isLetter && itemDoesMatch) {

              var letter = item.DESC_BEM.charAt(0).toUpperCase();
              if ( item.DESC_BEM.charCodeAt(0) < 65 ){
                letter = "#";
              }
              letterHasMatch[letter] = true;
            }

            return itemDoesMatch;
          }).filter(function(item) {
            //Finally, re-filter all of the letters and take out ones that don't
            //have a match
            if (item.isLetter && !letterHasMatch[item.letter]) {
              return false;
            }

            return true;
          });
        };

        $scope.clearSearch = function() {
          $scope.search = '';
        };








console.log($scope.bens);
//console.log(bens);
console.log(blau = $scope.getBem());
console.log($scope.bens);
console.log(listaBem);


















});
