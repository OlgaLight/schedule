/**
 * Created by olga on 18.07.16.
 */
angular.module('scheduleApp')
    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
      // route for the home page
          .state('app', {
            url: '/',
            views: {
              'header': {
                templateUrl: 'views/header.html'
              },
              'content@': {
                templateUrl: 'views/groups.html',
                controller: 'AccordionCtrl'
              }
            }
          })
          // route for the groups accordion page

          // .state('app.groups', {
          //   url: 'groups',
          //   views: {
          //     'header': {
          //       templateUrl: 'views/header.html'
          //     },
          //     'content@': {
          //       templateUrl: 'views/groups.html',
          //       controller: 'AccordionCtrl'
          //     }
          //   }
          // })


          // route for the schedule page
          .state('app.schedule', {
            url: 'groups/:id',
            views: {
              'header': {
                templateUrl: 'views/header.html'
              },
              'content@': {
                template: 'views/schedule.html',
                controller: 'ScheduleCtrl'
              }
            }
          });




      // route for the dishdetail page
      // .state('app.dishdetails', {
      //   url: 'menu/:id',
      //   views: {
      //     'content@': {
      //       templateUrl : 'views/dishdetail.html',
      //       controller  : 'DishDetailController'
      //     }
      //   }
      // });
      $urlRouterProvider.otherwise('/');
    });