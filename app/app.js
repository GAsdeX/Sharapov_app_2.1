//requires

(function(){
  var SharapovApp = angular.module('SharapovApp', ['ngRoute']);
  console.log('control lol');

  SharapovApp.config('$routeProvider', function($routeProvider){
    $routeProvider
      .when('/',{
        templateUrl: "public/views/main.html",
        controller: "mainController"
      })
      .when('/operations', {
        templateUrl: 'public/views/operations.html',
        controller: "operationsController"
      })
      .otherwise({ redirectTo: '/'});
  })
  SharapovApp.controller('mainController', function($scope){

  })

  SharapovApp.controller('operationsController', function($scope){})

})();



// console.log('lol');
