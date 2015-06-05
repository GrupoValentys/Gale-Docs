angular.module('core.components.karma')

.directive('karmaPage', function() {
    return {
        restrict: 'E',

        scope: {
            title: '@',
            onKeydown: '='
        },

        controller: function($scope, $element, $attrs) {
            var $window = angular.element(window);

            //-------------------------------------------
            var onKeyDown = $scope.onKeydown;
            if(onKeyDown){
                $window.on('keydown', function( event ) {
                    onKeyDown(event, event.keyCode);
                });
            }
            //-------------------------------------------
            
            //-------------------------------------------
            //Garbage Collector Destroy
            $scope.$on('$destroy', function() {
                $window.off('keydown');
            });
            //-------------------------------------------
        },

        link: function (scope, element, attrs) {
            scope.$emit("karma-page:title:changed", {
                title: (scope.title||" ")
            });
        }
    };
});