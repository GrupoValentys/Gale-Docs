angular.module('app.controllers')
    .controller('2ColumnsController', function(
        $rootScope,
        $scope,
        $mdSidenav,
        $state,
        $log,
        $Configuration,
        $mdDialog,
        $mdToast,
        $stateParams,
        $timeout,
        $galeLoading
    ) {
        //------------------------------------------------------------------------------------
        // Model
        $scope.config = {
            application: $Configuration.get("application"),
            selected_menu: "Gale  > Introducción",
            menu: [{
                "label": "Servicios",
                "name": "services",
                "open": false,
                "items": [
                    "$Configuration",
                    "$Localization",
                    "$Api",
                    "$LocalStorage",
                    "$Timer",
                    "ODataBuilder",
                    "Identity"
                ]
            }, {
                "label": "Componentes",
                "name": "components",
                "open": false,
                "items": [
                    "gale-content",
                    "gale-finder",
                    "gale-loading",
                    "gale-pad",
                    "gale-page",
                    "gale-table"
                ]
            }, {
                "label": "Filtros",
                "name": "filters",
                "open": false,
                "items": [
                    "capitalize",
                    "localize",
                    "template"
                ]
            }, {
                "label": "Directivas",
                "name": "directives",
                "open": false,
                "items": [
                    "range",
                    "rut",
                    "select-text-on-click",
                    "to-number-on-blur"
                ]
            }]
        };
        //------------------------------------------------------------------------------------
        // Gale Communication - Change Page Title
        $scope.$on("gale-page:title:changed", function(event, data) {
            document.title = data.title;
        });
        //------------------------------------------------------------------------------------
        // Global Exception Handling
        $rootScope.$on("$log.unhandledException", function(event, args) {
            var handle = function(content) {
                $mdToast.show(
                    $mdToast.simple()
                    .content(content)
                    .position("bottom left")
                    .theme('exception')
                    .hideDelay(4500)
                );
            };
            //HTTP Error??
            if (args.length > 3 && args[3].url) {
                var err = args[0];
                var status = args[1];
                var headers = args[2];
                var config = args[3];
                var message = null;
                //Has Default Error Format??
                if (err.error && err.error_description) {
                    message = "{0} {1}: {2}".format([
                        moment().format('HH:mm:ss'),
                        err.error,
                        err.error_description
                    ]);
                }
                else {
                    switch (status) {
                        case 404:
                        case 405:
                        case 500:
                            message = "{2}: {0} {1}".format([
                                config.method,
                                config.url,
                                status
                            ]);
                            break;
                        case 401:
                            //Custom Handled
                            break;
                    }
                }
                if (message) {
                    handle(message);
                }
            }
            event.preventDefault();
        });
        //------------------------------------------------------------------------------------
        // Layout Actions
        $scope.link = function(url) {
            $timeout(function() {
                $state.go(url);
            }, 300);
            $mdSidenav('left').close();
        }
        $scope.toggleLeft = function() {
            $mdSidenav('left').toggle();
        };
        $scope.toggleMenu = function(section) {
            section.open = !section.open;
        };
        $scope.navigateTo = function(section, item) {
            $scope.config.selected_menu = "{0} > {1}".format([
                section.label,
                item
            ]);
            $state.go("app.{0}-{1}".format([
                section.name,
                item.toLowerCase()
            ]));
        };
        $scope.navigate = function(state, item) {
            $scope.config.selected_menu = item;
            $state.go(state);
        };
        //------------------------------------------------------------------------------------
        // CONTENT - LOADING (Show Loadig Circular While Loading Child View's)
        $scope.$on('$viewContentLoading', function(event) {
            $galeLoading.show();
        });
        // CONTENT - LOADED (Hie Loadig Circular)
        $scope.$on('$viewContentLoaded', function(event) {
            //$timeout(function() {
            $galeLoading.hide();
            //}, 300);
        });
        //------------------------------------------------------------------------------------
    });
