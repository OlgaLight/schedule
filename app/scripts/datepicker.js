var app = angular.module('scheduleApp');

app.controller('DatepickerCtrl', function ($scope, $http) {
  $scope.selectDate = function (date, schedule) {
    console.log('day: ' + date.getDate() + '  group id: ' + schedule.id + ' # day: ' + date.getDay());
    var lessons = {};
    var weekDay = date.getDay();
    for (var i = 0; i < schedule.curriculum.length; i++) {
      if (schedule.curriculum[i].day == weekDay) {
        lessons = schedule.curriculum[i].lessons;
        break;
      }
    }
    $scope.lessons = lessons;
  };

  $scope.today = function () {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.options = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.toggleMin = function () {
    $scope.options.minDate = $scope.options.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.setDate = function (year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date(tomorrow);
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
        mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }
    return '';
  }
});