var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function() {
  var navigation = [{
    name: "Login",
    classis: "active",
    link: "#/login",
    subnav: []
  }, {
    name: "Users",
    classis: "active",
    link: "#/users",
    subnav: []
  }, {
    name: "Projects",
    classis: "active",
    link: "#/projects",
    subnav: []
  }, {
    name: "API",
    classis: "active",
    link: "#/api",
    subnav: []
  }];

  return {
    getnav: function() {
      return navigation;
    },
    makeactive: function(menuname) {
      for (var i = 0; i < navigation.length; i++) {
        if (navigation[i].name == menuname) {
          navigation[i].classis = "active";
        } else {
          navigation[i].classis = "";
        }
      }
      return menuname;
    },

  }
});
