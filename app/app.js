//requires

(function() {
    var SharapovApp = angular.module('SharapovApp', ['ngRoute']);
    console.log('control lol');

    SharapovApp.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: "public/views/main.html",
                controller: "mainController"
            }).when('/getoperations', {
                templateUrl: 'public/views/operations.html',
                controller: "operationsController"
            }).when('/getoperationDescription', {
                templateUrl: 'public/views/operationView.html',
                controller: "operationnViewController"
            }).when('/categories', {
                templateUrl: 'public/views/categories.html',
                controller: "mainController"
            }).when('/auth', {
                templateUrl: 'public/views/auth.html',
                controller: "authController"
            }).when('/admin', {
                templateUrl: 'public/views/admin.html',
                controller: "adminController"
            }).when('/consultation', {
                templateUrl: 'public/views/consultation.html',
                controller: "adminController"
            }).otherwise({
                redirectTo: '/'
            });
    });

    SharapovApp.factory('sectionFactory', function() {
        return {
            name: NaN,
            desc: NaN
        }
    });

    SharapovApp.controller('mainController', function($scope, $http, sectionFactory) {
        $http({
            method: "GET",
            url: "/categories"
        }).then(function mySucces(response) {
            $scope.categories = response;
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
        // console.log(sectionFactory.name);
        $scope.setOperations = function(e) {
            sectionFactory.name = e
        }
        console.log(sectionFactory.name);
    });

    SharapovApp.controller('operationsController', function($scope, $http, sectionFactory) {
        $http({
            method: "GET",
            url: "/operations/" + sectionFactory.name
        }).then(function mySucces(response) {
            $scope.operations = response;
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });

        $scope.setOperationDescription = function(e) {
            console.log(e);
            sectionFactory.desc = e
        }

    });

    SharapovApp.controller('authController', function($scope, $http){
      var data = $.param({
            json: JSON.stringify({
                name: $scope.newName,
                desc: sectionFactory.desc
            })
        });
        $http.post("/echo/json/", data).success(function(data, status) {
            $scope.hello = data;
        })
    })

    SharapovApp.controller('adminController', function($scope, $http) {
        $http({
            method: "GET",
            url: "/consultation"
        }).then(function mySucces(response) {
            $scope.consultations = response.data;
            console.log(response.data);
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    });


    SharapovApp.controller('operationnViewController', function($scope, $http, sectionFactory) {

        $scope.operation = sectionFactory.desc;

    });
})();



// console.log('lol');
