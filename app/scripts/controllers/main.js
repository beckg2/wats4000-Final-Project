  'use strict';

  /**
   * @ngdoc function
   * @name wats4000FinalProjectApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the wats4000FinalProjectApp
   */
  angular.module('wats4000FinalProjectApp')
    .controller('MainCtrl', function ($scope, citysearch, $localStorage, $window) {
      	$scope.citiesFound	=	citysearch.find();
        $scope.storage	=	$localStorage;
        $scope.findCities	=	function(){
          $scope.citiesFound	=	citysearch.find({
            query:	$scope.location
          });
          $scope.searchQuery = $scope.location;
        };
        $scope.removeCity = function() {
           $window.localStorage.clear();
           $window.location.reload();
       };

       $scope.options = {
           types: ['(cities']
       };
    });
