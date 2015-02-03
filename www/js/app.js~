angular.module('app', ['ionic', 'app.controllers', 'app.services', 'ja.qr'])

    .run(function ($rootScope, $state, $ionicPlatform, $window, $localstorage, Login) {
    FastClick.attach(document.body);
        var userModel = {
            isLogIn: false, userid:"", firstname: "", lastname: "", mobileno: "", emailid: "", birthdate: "",
            address1: "", address2: "", city: "", pincode: "", state: "", country: "", cardno: "", memberpin: "", points: "",
            pointsexpirydate:"",points_inprocess:"",points_redeemable:""
        }
        $rootScope.userModel = userModel;
        $rootScope.authtemplate = "templates/authTemplate.html";

        $rootScope.isEmptyObject= function(ob)
        {
            var obj = Object.getOwnPropertyNames(ob);
            if (obj.length == 0)
                return true;
            else
                return false;
        }

        var fd = $localstorage.getObject('featuredDeals');
        if ($rootScope.isEmptyObject(fd) == true)
        {
            $rootScope.featuredDeals = { data: [], loadmore: false,pageNo:2, pageLength:1 };
            $localstorage.setObject('featuredDeals', $rootScope.featuredDeals);
        }

        var category = $localstorage.getObject('categories');
        if ($rootScope.isEmptyObject(category) == true) {
            $rootScope.categories = { data: [], loadmore: false };
            $localstorage.setObject('categories', $rootScope.categories);
        }

        var locations = $localstorage.getObject('locations');
        if ($rootScope.isEmptyObject(locations) == true) {
            $rootScope.locations = { data: [], loadmore: false };
            $localstorage.setObject('locations', $rootScope.locations);
        }

        $rootScope.searchDeals = { data: [], loadmore: false };

        $ionicPlatform.ready(function () {
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });

        //$rootScope.$on('$stateChangeStart', function(event, toState) {
        //    if (toState.name !== "app.login" && toState.name !== "app.logout" && !$window.sessionStorage['fbtoken']) {
        //        $state.go('app.login');
        //        event.preventDefault();
        //    }
        //});

        //$rootScope.$on('OAuthException', function() {
        //    $state.go('app.login');
        //});
        
        var loginData = $localstorage.getObject('loginData');
        var userModelData = $localstorage.getObject('userModel');
        if ($rootScope.isEmptyObject(loginData) == true)
        {
            $rootScope.userModel.isLogIn = false;
        }
        else
        {
            $rootScope.userModel = userModelData;
        }

    })

    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        $httpProvider.defaults.transformRequest = [function (data) {
            /**
             * The workhorse; converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
            var param = function (obj) {
                var query = '';
                var name, value, fullSubName, subName, subValue, innerObj, i;

                for (name in obj) {
                    value = obj[name];

                    if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    }
                    else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    }
                    else if (value !== undefined && value !== null) {
                        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                    }
                }

                return query.length ? query.substr(0, query.length - 1) : query;
            };
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];


        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: "AppCtrl"
            })
            .state('app.featured', {
                url: "/featured",
                views: {
                    'menuContent': {
                        templateUrl: "templates/featured-deals.html",
                        controller: "FeaturedCtrl"
                    }
                }
            })
            .state('app.featured-deals-details', {
                url: "/featured/:dealId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/featured-deals-detail.html",
                        controller: "FeaturedDealDetailCtrl"
                    }
                }
            })
            .state('app.location', {
                url: "/location",
                views: {
                    'menuContent': {
                        templateUrl: "templates/location.html",
                        controller: "LocationCtrl"
                    }
                }
            })

            .state('app.location-deals', {
                url: '/location/:locationId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/location-deals.html',
                        controller: 'LocationDealsCtrl'
                    }
                }
            })

            .state('app.category', {
                url: "/category",
                views: {
                    'menuContent': {
                        templateUrl: "templates/category.html",
                        controller: "CategoryCtrl"
                    }
                }
            })

            .state('app.category-deals', {
                url: '/category/:categoryId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/category-deals.html',
                        controller: 'CategoryDealsCtrl'
                    }
                }
            })

            .state('app.login', {
                url: "/login",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login.html",
                        controller: "LoginCtrl"
                    }
                }
            })

            .state('app.logout', {
                url: "/logout",
                views: {
                    'menuContent': {
                        templateUrl: "templates/logout.html",
                        controller: "LogoutCtrl"
                    }
                }
            })

            .state('app.profile', {
                url: "/profile",
                views: {
                    'menuContent': {
                        templateUrl: "templates/profile.html",
                        controller: "ProfileCtrl"
                    }
                }
            })

            .state('app.register', {
                url: "/register",
                views: {
                    'menuContent': {
                        templateUrl: "templates/register.html",
                        controller: "RegisterCtrl"
                    }
                }
            })
            .state('app.terms', {
                url: "/terms",
                views: {
                    'menuContent': {
                        templateUrl: "templates/terms.html",
                        controller: "RegisterCtrl"
                    }
                }
            })
             .state('app.scan', {
                 url: "/scan",
                 views: {
                     'menuContent': {
                         templateUrl: "templates/scan.html",
                         controller: "ScanCtrl"
                     }
                 }
             })
            ;

        // fallback route
        $urlRouterProvider.otherwise('/app/featured');

    });

