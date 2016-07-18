/**
 * Created by olga on 15.07.16.
 */
angular.module('scheduleApp', ['ngAnimate', 'ui.bootstrap'])
    .controller('ScheduleCtrl', function ($scope, $http) {
      $http.get("../schedule.json").then(function (response) {
        $scope.myData = response.data.groups[0].curriculum[0].lessons;
      });

      // $http.get("../schedule.json").(function (data){
      //     $.each(data.schedule, function (i, f) {
      //         var tblRow = "<tr>" + "<td>" + f.day+ "</td>" +
      //             "<td>" + f.lessons + "</td>" + "</tr>" + "<tr>" + "<td>" + f.lessons.time+ "</td>" +
      //             "<td>" + f.lessons.lessons + "</td>" + "</tr>"
      //         $(tblRow).appendTo("#scheduleDate tbody");
      //     });
      // });
    });

// $(function () {
//
//
//     var schedule = [];
//
//     $.getJSON('schedule.json', function (data) {
//         $.each(data.schedule, function (i, f) {
//             var tblRow = "<tr>" + "<td>" + f.time + "</td>" +
//                 "<td>" + f.lesson + "</td>" + "<td>" + f.room + "</td>" + "</tr>"
//             $(tblRow).appendTo("#scheduledate tbody");
//         });
//
//     });