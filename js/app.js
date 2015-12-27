// JavaScript Document
var firstapp = angular.module('firstapp', [
    'ui.router',
    'phonecatControllers',
    'templateservicemod',
    'navigationservice'
]);

firstapp.config(function($stateProvider, $urlRouterProvider,$httpProvider) {

    // for http request with session
    $httpProvider.defaults.withCredentials = true;

    $stateProvider

    .state('login', {
        url: "/login",
        templateUrl: "views/login.html",
        controller: 'LoginCtrl'
    })

    .state('users', {
        url: "/users",
        templateUrl: "views/template.html",
        controller: 'UsersCtrl'
    })

    .state('projects', {
        url: "/projects",
        templateUrl: "views/template.html",
        controller: 'ProjectsCtrl'
    })

    .state('api', {
        url: "/api",
        templateUrl: "views/template.html",
        controller: 'APICtrl'
    })

    $urlRouterProvider.otherwise("/users");

});


firstapp.directive('img', function($compile, $parse) {
    return {
        restrict: 'E',
        replace: false,
        link: function($scope, element, attrs) {
            var $element = $(element);
            if(!attrs.noloading)
            {
                $element.after("<img src='img/loading.gif' class='loading' />");
                var $loading = $element.next(".loading");
                $element.load(function() {
                    $loading.remove();
                    $(this).addClass("doneLoading");
                });
            }
            else
            {
                $($element).addClass("doneLoading");
            }
        }
    };
});


var jsonEditorNo = 0;
firstapp.directive('jsoneditor', function($compile, $parse) {
  return {
    restrict: 'EA',
    link: function($scope, element, attrs) {
      $element = $(element);
      $element.css("min-height","200px");
      var jsoneditornumber = (jsonEditorNo++);
      $element.attr("id","jsonEditor"+jsoneditornumber);
      var editor = ace.edit("jsonEditor"+jsoneditornumber);
      editor.setTheme("ace/theme/monokai");
      var JsonMode = ace.require("ace/mode/json").Mode;
      editor.session.setMode(new JsonMode());
    }
  };
});
