var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function() {
  var navigation = [{
    name: "Home",
    classis: "active",
    link: "#/home",
    subnav: []
  },
  {
    name: "Login",
    classis: "active",
    link: "#/login",
    subnav: []
  },
  {
    name: "Team",
    classis: "active",
    link: "#/team",
    subnav: []
  },
  {
    name: "Projects",
    classis: "active",
    link: "#/projects",
    subnav: []
  },
  {
    name: "Test Cases",
    classis: "active",
    link: "#/testcases",
    subnav: []
  }
];

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
