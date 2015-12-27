angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngSanitize', 'angular-flexslider', 'ngMaterial'])

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("home");
  $scope.menutitle = NavigationService.makeactive("Home");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})
.controller('LoginCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("login");
  $scope.menutitle = NavigationService.makeactive("Login");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})
.controller('TeamCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("team");
  $scope.menutitle = NavigationService.makeactive("Team");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})
.controller('ProjectsCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("projects");
  $scope.menutitle = NavigationService.makeactive("Projects");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})
.controller('TestCasesCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("testcases");
  $scope.menutitle = NavigationService.makeactive("Test Cases");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('headerctrl', function($scope, TemplateService) {
  $scope.template = TemplateService;
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $(window).scrollTop(0);
  });
});
