var app = angular.module("myapp", ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/home', { templateUrl: 'views/home.html' })
        .when('/directory', { templateUrl: 'views/directory.html', controller: 'mycontroller' })
        .otherwise({ redirectTo: '/home' });
}]);

app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

// var shoppinglist = [
//     { item: 'coconut', price: 50 },
//     { item: 'pepper', price: 10 },
//     { item: 'chilli', price: 80 },
//     { item: 'carrot', price: 20 }
// ];

// console.log(angular.toJson(shoppinglist)); //CONVERT OBJECT TO JSON

app.controller("mycontroller", ['$scope', '$http', function ($scope, $http) {

    // $scope.shopping = shoppinglist;

    $http.get('./data/data.json').then(function(res){
        $scope.shopping = res.data;
    });

    $scope.deletefn = function (order) {
        var index = $scope.shopping.indexOf(order);
        $scope.shopping.splice(index, 1);
        shoppinglist = $scope.shopping;
    }

    $scope.addfn = function (item, price) {
        if (item == "" || item == undefined)
            return document.getElementById('item').select();
        if (!/\d+/.test(parseInt(price)))
            return document.getElementById('price').select();
        $scope.shopping.push({ item, price });
        shoppinglist = $scope.shopping;
        // document.getElementById('formadd').reset();  //NOT WORKS!
        $scope.item = $scope.price = "";
        document.getElementById('item').focus();
    }
}]);