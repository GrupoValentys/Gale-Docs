angular.module('core.components.karma')

.factory('$karmaFinder', function($q, $rootScope) {
    var self        = this;
    var _component  = {};

    var _get = function(){
        if(!_component){
            throw { message: 'no finder has found' }
        }
        return _component;
    }

    //Entry Point to register
    self.$$register = function(component, uniqueID){
        _component = component;
    };

    //Entry Point to register
    self.$$unregister = function(component, uniqueID){
        delete _component;
    };

    //Manual Bootstrapp
    self.show = function(){
        return _get().show();
    }

    self.hide = function(){
        return _get().hide();
    }

    return self;
});
