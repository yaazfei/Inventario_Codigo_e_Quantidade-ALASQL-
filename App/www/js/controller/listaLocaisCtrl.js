angular.module('starter').controller('listaLocaisCtrl', function($scope, $state, $cordovaFile, $ionicPopup, $http, $timeout, Scopes, FormatarCsv, PopUps, CriarDiretorio) {


// // Links úteis
// http://angular-ui.github.io/ui-grid/
// http://plnkr.co/edit/50vJrs?p=preview
// http://www.igniteui.com/javascript-excel-library/excel-import-data
// http://jsfiddle.net/gh/get/jquery/1.9.1/igniteuisamples/jsfiddle-samples/tree/master/EN/HtmlSamples/javascript-excel-library/excel-import-data/
// http://brianhann.com/easily-import-spreadsheets-into-ui-grid/
// https://github.com/aaronksaunders/hu1/wiki/2.1-Using-ng-repeat-in-Ionic-ListView
// https://github.com/SheetJS/js-xlsx
// https://github.com/brexis/angular-js-xlsx
// http://codetheory.in/parse-read-excel-files-xls-xlsx-javascript/


    $scope.mySelections = [];
    $scope.myData = [{name: "Moroni", age: 50},
                     {name: "Tiancum", age: 43},
                     {name: "Jacob", age: 27},
                     {name: "Nephi", age: 29},
                     {name: "Enos", age: 34}];

    $scope.gridOptions = {
      data: 'myData',
      selectedItems: $scope.mySelections,
      multiSelect: false
    };































  //
  // $scope.filterOptions = {
  //         filterText: "",
  //         useExternalFilter: true
  //     };
  //     $scope.totalServerItems = 0;
  //     $scope.pagingOptions = {
  //         pageSizes: [5, 10, 20],
  //         pageSize: 5,
  //         currentPage: 1
  //     };
  //     $scope.setPagingData = function(data, page, pageSize){
  //         var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
  //         $scope.myData = pagedData;
  //         $scope.totalServerItems = data.length;
  //         if (!$scope.$$phase) {
  //             $scope.$apply();
  //         }
  //     };
  //     $scope.getPagedDataAsync = function (pageSize, page, searchText) {
  //         setTimeout(function () {
  //             var data;
  //             if (searchText) {
  //                 var ft = searchText.toLowerCase();
  //                 $http.get('App/www/js/locais.json').success(function (locais) {
  //                     data = locais.filter(function(item) {
  //                         return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
  //                     });
  //                     $scope.setPagingData(data,page,pageSize);
  //                 });
  //             } else {
  //                 $http.get('App/www/js/locais.json').success(function (locais) {
  //                     $scope.setPagingData(locais,page,pageSize);
  //                 });
  //             }
  //         }, 100);
  //     };
  //
  //     $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
  //
  //     $scope.$watch('pagingOptions', function (newVal, oldVal) {
  //         if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
  //           $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
  //         }
  //     }, true);
  //     $scope.$watch('filterOptions', function (newVal, oldVal) {
  //         if (newVal !== oldVal) {
  //           $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
  //         }
  //     }, true);
  //
  //     $scope.gridOptions = {
  //         data: 'myData',
  //         enablePaging: true,
  //         showFooter: true,
  //         totalServerItems:'totalServerItems',
  //         pagingOptions: $scope.pagingOptions,
  //         filterOptions: $scope.filterOptions
  //     };
  //
  //
  //
  //
  //
  //
  //
  //

});
