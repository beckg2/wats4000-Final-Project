  'use strict';

  /**
   * @ngdoc service
   * @name wats4000FinalProjectApp.forecast
   * @description
   * # forecast
   * Factory in the wats4000FinalProjectApp.
   */
  angular.module('wats4000FinalProjectApp')
  .factory('forecast',	function	($resource)	{
    //	Service	logic
    //	...

    //	Public	API	here
    return	$resource('http://api.openweathermap.org/data/2.5/forecast/daily?id=:cityID&cnt=7&units=imperial&APPID=a8e3a9a92d14fe6ae7e920debac049d1',	{},	{
      query:	{
        method:'GET',
        params:{
          cityID:	'4717560'	//	Paris,	France	ID
        },
        isArray:false
      }
    });
  });
