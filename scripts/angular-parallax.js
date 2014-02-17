'use strict';

angular.module('angular-parallax', [
]).directive('parallax', ['$window', function($window) {
  return {
    restrict: 'A',
    scope: {
      parallaxRatio: '@',
      parallaxVerticalOffset: '@',
      parallaxHorizontalOffset: '@',
    },
    link: function($scope, elem, $attrs) {
      var setPosition = function () {
        elem.css('left', $scope.parallaxHorizontalOffset + "px");

        var calcValY = $window.pageYOffset * $scope.parallaxRatio;
        if (calcValY <= $window.innerHeight) {
          var top = (calcValY < $scope.parallaxVerticalOffset ? $scope.parallaxVerticalOffset : calcValY);
          elem.css('top', top + "px");
        }
      };

      setPosition();

      if($scope.parallaxRatio) {
        angular.element($window).bind("scroll", setPosition);
      }
    }  // link function
  };
}]).directive('parallaxBackground', ['$window', function($window) {
  return {
    restrict: 'A',
    transclude: true,
    template: '<div ng-transclude></div>',
    scope: {
      parallaxRatio: '=',
    },
    link: function($scope, elem, attrs) {
      var setPosition = function () {
        elem.css('background-position-x', "50%");
        elem.css('background-position-y', (elem.prop('offsetTop') - $window.pageYOffset) * $scope.parallaxRatio + "px");
      }

      if($scope.parallaxRatio) {
        setPosition();
        angular.element($window).bind("scroll", setPosition);
      }
    }  // link function
  };
}]);
