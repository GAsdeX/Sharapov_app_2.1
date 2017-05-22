//requires

(function() {
    var SharapovApp = angular.module('SharapovApp', ['ngRoute']);
    console.log('control lol');

    SharapovApp.config(function($routeProvider) {
        $routeProvider
          .when('/', {
            templateUrl: "public/views/main.html",
            controller: "mainController"
        }).when('/operations', {
            templateUrl: 'public/views/operations.html',
            controller: "operationsController"
        }).otherwise({
            redirectTo: '/'
        });
    });
    SharapovApp.controller('mainController', function($scope, $http) {
      $http({
        method : "GET",
        url : "/categories"
        }).then(function mySucces(response) {
            $scope.myWelcome = response.data;
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
      });

      // $http.get('localhost:3001/categories/').then(function(response){
      //   // $scope.categories  = response.data;
      //   // console.log($scope.att);
      // });
    });

    SharapovApp.controller('operationsController', function($scope, $http) {

    });

})();



// console.log('lol');
