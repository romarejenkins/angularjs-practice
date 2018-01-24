
var myNinjaApp = angular.module('myNinjaApp',['ngRoute','ngAnimate']);

myNinjaApp.config(['$routeProvider',function($routeProvider){

  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html'
    })
    .when('/directory',{
      templateUrl: 'views/directory.html',
      controller: 'NinjaController'
    }).otherwise({
      redirectTo: '/home'
    });

}]);

myNinjaApp.directive('randomNinja', [function(){

  return {
    //E is element
    restrict: 'E',
    //isolate scope
    scope: {
      ninjas:'=',
      title:'='
    },
    templateUrl: 'views/random.html',
    transclude: true,
    replace: true,
    controller: function($scope){
      $scope.random = Math.floor(Math.random() * 4);
    }
  }
}])

myNinjaApp.controller('NinjaController',['$scope','$http', function($scope, $http){

  $scope.removeNinja = function(ninja){
    var removedNinja = $scope.ninjas.indexOf(ninja);
    $scope.ninjas.splice(removedNinja, 1)
  };

  $scope.addNinja = function(){
    $scope.ninjas.push({
      name: $scope.newninja.name,
      belt: $scope.newninja.belt,
      rate: parseInt($scope.newninja.rate),
      available: true
    });

    $scope.newninja.name = "";
    $scope.newninja.belt = "";
    $scope.newninja.rate = "";
  };

  $scope.removeAll = function(){
    $scope.ninjas =[];
  }

  $http.get('data/ninjas.json').then(function(response){
    $scope.ninjas = response.data;
  });
  // $scope.ninjas = [
  //   {
  //     name: "Yoshi",
  //     belt: "green",
  //     rate: 50,
  //     available: true,
  //     thumb: "http://placehold.it/50x50/666666/ffffff"
  //   },
  //   {
  //     name: "Crystal",
  //     belt: "yellow",
  //     rate: 30,
  //     available: true,
  //     thumb: "http://placehold.it/50x50/666666/ffffff"
  //   },
  //   {
  //     name: "Ryu",
  //     belt: "orange",
  //     rate: 10,
  //     available: true,
  //     thumb: "http://placehold.it/50x50/666666/ffffff"
  //   },
  //   {
  //     name: "Shaun",
  //     belt: "black",
  //     rate: 1000,
  //     available: true,
  //     thumb: "http://placehold.it/50x50/666666/ffffff"
  //   }
  // ];
  // // convert all list objects into JSON
  // console.log(angular.toJson($scope.ninjas));

}]);
