angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ngSanitize', 'ngMaterial', 'ngMdIcons'])

.controller('LoginCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  $scope.menutitle = NavigationService.makeactive("Login");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('UsersCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("users");
  $scope.menutitle = NavigationService.makeactive("Users");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('ProjectsCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("projects");
  $scope.menutitle = NavigationService.makeactive("Projects");

  function successCallback(data, status) {
    if (status == 200) {
      $scope.projects = data.data;
      console.log(data);
    } else {
      errorCallback(status);
    }
  }


  $scope.saveProject = function(project) {
    console.log(project);
    NavigationService.saveProject(project, function(data) {
      project._id = data.data._id;
      console.log(data);
    }, function() {
      console.log(data);
    });
  };
  $scope.deleteProject = function(project) {
    NavigationService.deleteProject(project, function(data) {
      _.remove($scope.projects, function(n) {
        return n._id == project._id;
      });
      console.log("Project Deleted");
    }, function() {
      console.log("Delete Project ERROR");
    });
  };

  function errorCallback(err) {
    console.log(err);
  }

  $scope.createProject = function() {
    $scope.projects.push({});
  };

  NavigationService.findProjects({}, successCallback, errorCallback);
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('APICtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams) {

  console.log($stateParams);

  var data = {
    "_id": $stateParams.id
  };

  function successCallback(data, status) {
    if (status == 200) {
      $scope.menutitle = data.data.name + " - API";
      TemplateService.title = $scope.menutitle;
      console.log($scope.menutitle);
      $scope.apis = data.data.Api;
    } else {
      errorCallback(status);
    }
  }

  function errorCallback(err) {
    console.log(err);
  }

  NavigationService.findOneProject(data, successCallback, errorCallback);

  //Used to name the .html file
  $scope.template = TemplateService.changecontent("api");
  $scope.menutitle = NavigationService.makeactive("API");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('HeaderCtrl', function($scope, TemplateService) {
  $scope.template = TemplateService;
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $(window).scrollTop(0);
  });
});
