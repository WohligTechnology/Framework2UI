angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ngSanitize', 'ngMaterial', 'ngMdIcons','ui.sortable'])

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

.controller('ProjectsCtrl', function($scope, $mdDialog, $mdToast, TemplateService, NavigationService, $timeout) {

  function showToast(text) {
    $mdToast.show(
      $mdToast.simple()
      .textContent(text)
      .position("bottom left")
      .hideDelay(3000)
    );
  }

  //Used to name the .html file
  $scope.template = TemplateService.changecontent("projects");
  $scope.menutitle = NavigationService.makeactive("Projects");

  function successCallback(data, status) {
    if (status == 200) {
      $scope.projects = data.data;
      if (_.isEmpty(data.data)) {
        $scope.createProject();
      }
    } else {
      errorCallback(status);
    }
  }

  $scope.saveProject = function(project) {
    NavigationService.saveProject(project, function(data) {
      project._id = data.data._id;
      showToast("Project Saved Successfully");
    }, function() {
      showToast("Error saving the Project");
    });
  };
  $scope.deleteProject = function(project) {
    var confirm = $mdDialog.confirm()
      .title('Would you like to delete your Project?')
      .textContent('The data for the Project will also be deleted')
      .ok('Confirm')
      .cancel('Cancel');
    $mdDialog.show(confirm).then(function() {
      NavigationService.deleteProject(project, function(data) {
        _.remove($scope.projects, function(n) {
          return n._id == project._id;
        });
        showToast("Project Deleted Successfully");
      }, function() {
        showToast("Error Deleting Project");
      });

    }, function() {

    });

  };

  $scope.expandProject = function(project) {
    if (!project.expand) {
      _.each($scope.projects, function(n) {
        n.expand = false;
      });
    }
    project.expand = !project.expand;
  };

  function errorCallback(err) {
  }

  $scope.createProject = function() {
    $scope.projects.push({
      expand: true,
      name:"",
      alias:"",
      url:""
    });
  };

  NavigationService.findProjects({}, successCallback, errorCallback);
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('APICtrl', function($scope, $mdDialog,$mdToast, TemplateService, NavigationService, $timeout, $stateParams) {

  $scope.isSearch = true;
  $scope.searchForm = {name:""};
  function showToast(text) {
    $mdToast.show(
      $mdToast.simple()
      .textContent(text)
      .position("bottom left")
      .hideDelay(3000)
    );
  }

  $scope.sortableOptions = {
    update: function(e, ui) {

      setTimeout(function() {
        var newOrder = _.cloneDeep($scope.apis);
        newOrder  = _.pluck($scope.apis,"_id");
        console.log(_.pluck($scope.apis,"name"));
        console.log(newOrder);
        var newProject = _.cloneDeep($scope.project);
        newProject.Api = newOrder;
        NavigationService.saveProject(newProject,function(){
          showToast("API Ordered");
        },function() {
          showToast("Error Ordering API");
        });
      },100);




    },
    axis: 'y'
  };

  var data = {
    "_id": $stateParams.id
  };

  function successCallback(data, status) {
    if (status == 200) {
      $scope.menutitle = data.data.name + " - API";
      TemplateService.title = $scope.menutitle;
      $scope.project = data.data;

      $scope.apis = data.data.Api;
      _.each($scope.apis, function(n) {
        n.project = $scope.project._id;
      });
      if (_.isEmpty(data.data.Api)) {
        $scope.createApi();
      }

    } else {
      errorCallback(status);
    }
  }

  function errorCallback(err) {
  }

  NavigationService.findOneProject(data, successCallback, errorCallback);

  $scope.expandApi = function(api) {
    if (!api.expand) {
      _.each($scope.apis, function(n) {
        n.expand = false;
      });
    }
    api.expand = !api.expand;
  };

  $scope.createApi = function() {
    $scope.apis.push({
      Response: {
        request: "",
        response: ""
      },
      project: $scope.project._id,
      expand: true
    });
  };
  $scope.copyApi = function(api,index) {
    console.log(api);
    console.log(index);
    var newApi  = _.cloneDeep(api);
    delete newApi._id;
    delete newApi.$$hashKey;
    $scope.apis.splice(index+1, 0, newApi);
    $scope.expandApi(newApi);
  };
  $scope.saveApi = function(api) {
    NavigationService.saveApi(api, function(data) {
      api._id = data.data._id;
      showToast("API saved Successfully");
    }, function(err) {
      showToast("Error saving API");
    });
  };
  $scope.deleteApi = function(api) {

    var confirm = $mdDialog.confirm()
      .title('Would you like to delete the API?')
      .textContent('The data for the API will also be deleted')
      .ok('Confirm')
      .cancel('Cancel');
    $mdDialog.show(confirm).then(function() {

      NavigationService.deleteApi(api, function(data) {
        _.remove($scope.apis, function(n) {
          return api._id == n._id;
        });
        showToast("API Deleted Successfully");
      }, function(err) {
        showToast("Error Deleting API");
      });

    }, function() {

    });



  };

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
