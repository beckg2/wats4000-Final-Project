"use strict";angular.module("wats4000FinalProjectApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngStorage","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/current/:cityID",{templateUrl:"views/current.html",controller:"CurrentCtrl",controllerAs:"current"}).when("/forecast/:cityID",{templateUrl:"views/forecast.html",controller:"ForecastCtrl",controllerAs:"forecast"}).otherwise({redirectTo:"/"})}]),angular.module("wats4000FinalProjectApp").controller("MainCtrl",["$scope","citysearch","$localStorage","$window",function(a,b,c,d){a.citiesFound=b.find(),a.storage=c,a.findCities=function(){a.citiesFound=b.find({query:a.location}),a.searchQuery=a.location},a.removeCity=function(){d.localStorage.clear(),d.location.reload()},a.options={types:["(cities"]}}]),angular.module("wats4000FinalProjectApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("wats4000FinalProjectApp").factory("current",["$resource",function(a){return a("http://api.openweathermap.org/data/2.5/weather?id=:cityID&units=imperial&APPID=a8e3a9a92d14fe6ae7e920debac049d1",{},{query:{method:"GET",params:{cityID:"4717560"},isArray:!1}})}]),angular.module("wats4000FinalProjectApp").factory("citysearch",["$resource",function(a){return a("http://api.openweathermap.org/data/2.5/find?q=:query&units=imperial&type=like&mode=json&APPID=a8e3a9a92d14fe6ae7e920debac049d1",{},{find:{method:"GET",params:{query:"seattle"},isArray:!1}})}]),angular.module("wats4000FinalProjectApp").controller("CurrentCtrl",["$scope","$routeParams","current","$localStorage",function(a,b,c,d){a.cityID=b.cityID,a.currentWeather=c.query({cityID:b.cityID}),a.saveCity=function(b){var c={name:b.name,id:b.id};if(d.savedCities){for(var e=!0,f=0;f<d.savedCities.length;f++)d.savedCities[f].id==c.id&&(e=!1);1==e?(d.savedCities.push(c),a.citySaved={success:!0}):(console.log("city	already	saved"),a.citySaved={duplicate:!0})}else d.savedCities=[c]}}]),angular.module("wats4000FinalProjectApp").factory("forecast",["$resource",function(a){return a("http://api.openweathermap.org/data/2.5/forecast/daily?id=:cityID&cnt=7&units=imperial&APPID=a8e3a9a92d14fe6ae7e920debac049d1",{},{query:{method:"GET",params:{cityID:"4717560"},isArray:!1}})}]),angular.module("wats4000FinalProjectApp").controller("ForecastCtrl",["$scope","$routeParams","forecast",function(a,b,c){a.cityID=b.cityID,a.forecastData=c.query({cityID:b.cityID})}]),angular.module("wats4000FinalProjectApp").run(["$templateCache",function(a){a.put("views/about.html","<p>Here is My Weather App built using AngularJS!</p>"),a.put("views/current.html",'<div class="jumbotron"> <h1>Current Weather for {{currentWeather.name}}</h1> <p><button class="btn btn-sm btn-primary" ng-click="saveCity(currentWeather)">Save City</button></p> <div ng-messages="citySaved"> <p class="city-saved-alert bg-success text-success" ng-message="success"> {{currentWeather.name}} has been saved to your list of cities. </p> <p class="city-saved-alert bg-warning text-warning" ng-message="duplicate"> {{currentWeather.name}} has already been saved to your list of cities. </p> </div> <dl> <dt>Currently</dt> <dd>{{currentWeather.weather[0].main}}</dd> <!-- turn off --> <dd>{{currentWeather.weather[0].description}}</dd> <dt>Temperature</dt> <dd>{{currentWeather.main.temp}} &deg;F</dd> <dd><img src="http://openweathermap.org/img/w/{{currentWeather.weather[0].icon}}.png" alt="icon" style="width:250px;height:250px"></dd> <dd>High: {{currentWeather.main.temp_max}} &deg;F</dd> <!-- turn off --> <dd>Low: {{currentWeather.main.temp_min}} &deg;F</dd> <!-- turn off --> <dt>Wind</dt> <dd>{{currentWeather.wind.speed}} mph at {{currentWeather.wind.deg}} &deg;</dd> <dt>Clouds</dt> <dd>{{currentWeather.clouds.all}}%</dd> </dl> <p><a ng-href="#!/forecast/{{cityID}}" class="btn btn-lg btn-primary">View 7-day Forecast</a></p> <p><a ng-href="#!/" class="btn btn-lg btn-primary">Select New City</a></p></div>'),a.put("views/forecast.html",'<div class="jumbotron"> <h1>7-day Forecast</h1> <h1>{{forecastData.city.name}} {{forecastData.city.country}}</h1> <dl ng-repeat="weather	in	forecastData.list" class="weather-report"> <div class="day">{{weather.dt*1000 | date: \'EEE\'}}</div> <div class="date">{{weather.dt*1000 | date:\'MMM dd, yyyy\'}}</div> <div class="forecast-icon"><img ng-src="http://openweathermap.org/img/w/{{weather.weather[0].icon}}.png" alt="icon" style="width:250px;height:250px"></div> <dd>{{weather.weather[0].main}}</dd> <dd>{{weather.weather[0].description}}</dd> <dt>Temperature</dt> <dd>High: {{weather.temp.max}} &deg;F</dd> <dd>Low: {{weather.temp.min}} &deg;F</dd> </dl> <p><a ng-href="#!/current/{{cityID}}" class="btn btn-lg btn-primary">View Current Weather</a></p> <p><a ng-href="#!/" class="btn btn-lg btn-primary">Select New City</a></p></div>'),a.put("views/main.html",'<div ng-if="storage.savedCities"> <h2>Saved Cities</h2> <ul class="saved-cities-list"> <li ng-repeat="city	in	storage.savedCities"> <a ng-href="#!/current/{{city.id}}" class="btn btn-lg btn-primary">{{city.name}}</a> </li> </ul> <p><button class="btn btn-sm btn-primary" ng-click="removeCity()">Clear Cities</button></p> </div> <div ng-app class="jumbotron" ng-controller="MainCtrl"> <h1>Select Your City</h1> <p class="lead"> <div ng-init="location=\'Seattle\'"> <p> <label for="location">Location: <input type="text" name="location" ng-model="location"> </label> </p> <p> <button class="btn btn-lg btn-primary" ng-click="findCities()">Find City</button> </p> </div> <div ng-if="searchQuery"> <p class="lead">{{citiesFound.count}} cities found matching the query: {{searchQuery}}.</p> <dl ng-repeat="city	in	citiesFound.list"> <dt>{{city.name}}, {{city.sys.country}}</dt> <dd>{{city.weather[0].main}} - {{city.weather[0].description}}</dd> <dt>Temperature</dt> <dd>{{city.main.temp}} &deg;F</dd> <dd><img ng-src="http://openweathermap.org/img/w/{{city.weather[0].icon}}.png" alt="icon" style="width:250px;height:250px"></dd> <dd><a ng-href="#!/current/{{city.id}}" class="btn btn-lg btn-primary">View Weather</a></dd> </dl> </div> </p> </div>')}]);