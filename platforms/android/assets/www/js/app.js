// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var ionicLocationApp = angular.module('mapApp', ['ionic','ngCordova','ngMap']);

ionicLocationApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
      
  });
});

ionicLocationApp.controller('mapController', function ($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform, $http) {

    $scope.getCurrentLocation = function () {
        return onDeviceReady();
    }

    $scope.currentLocation = "";
    $scope.selectedService = "";

    $ionicPlatform.ready(onDeviceReady);

    function onDeviceReady() {
        $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
        });

        var posOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        };

        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            $scope.currentLocation = lat + ',' + long;
            $ionicLoading.hide();
            console.log(position);
        }, function (err) {
            $ionicLoading.hide();
            console.log(err);
        });
    }

});