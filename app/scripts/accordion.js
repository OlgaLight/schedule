var app = angular.module('scheduleApp', ['ngAnimate', 'ui.bootstrap']);

app.controller('AccordionCtrl', function ($scope, $http) {
  $http.get("schedule.json").then(function (response) {
    $scope.myData = response.data.groups;
  });
});