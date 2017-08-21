  'use strict';

  /**
   * @ngdoc function
   * @name wats4000FinalProjectApp.controller:ForecastCtrl
   * @description
   * # ForecastCtrl
   * Controller of the wats4000FinalProjectApp
   */
  angular.module('wats4000FinalProjectApp')
    .controller('ForecastCtrl',	function	($scope,	$routeParams,	forecast)	{
      $scope.cityID	=	$routeParams.cityID;

      $scope.forecastData	=	forecast.query({
        cityID:	$routeParams.cityID
      });
    });
    
