angular.module('app.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Config', function () {
    return {
        serverBaseUrl:'http://iloyalty.in/'
    }
})

.factory('$localstorage', ['$window', function ($window) {
    return {
        set: function (key, value) {
            $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key) {
            return JSON.parse($window.localStorage[key] || '{}');
        }
    }
}])

.factory('Deals', function ($http, $q, Config, $rootScope) {

    return {
        all: function (userData) {
            var url = Config.serverBaseUrl + "api/displaydeals/";
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: url,
                data: { id: userData.id }
            }).success(function (data, status, headers, cfg) {
                deferred.resolve(data);
            }).error(function(error, status) {
                deferred.reject(error);
            })

            return deferred.promise;
        },
        get: function (dealId) {
            // Simple index lookup
            return $rootScope.featuredDeals.data[dealId];
        },
        search: function (searchText) {
            var url = Config.serverBaseUrl + "api/displaystringwisedeals/";
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: url,
                data: { txtdealstring: searchText }
            }).success(function (data, status, headers, cfg) {
                deferred.resolve(data);
            }).error(function (error, status) {
                deferred.reject(error);
            })

            return deferred.promise;
        },
        pageWise:function(page)
        {
            var url = Config.serverBaseUrl + "api/displaypagewisedeals/";
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: url,
                data: { page: page }
            }).success(function (data, status, headers, cfg) {
                deferred.resolve(data);
            }).error(function (error, status) {
                deferred.reject(error);
            })

            return deferred.promise;
        }
    }
})

.factory('Categories', function ($http, $q, Config, $rootScope) {

    return {
        all: function () {
            var url = Config.serverBaseUrl + "api/displaycategory/";
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: url,
                data: {}
            }).success(function (data, status, headers, cfg) {
                deferred.resolve(data);
            }).error(function (error, status) {
                deferred.reject(error);
            })

            return deferred.promise;
        },
        get: function (categoryId) {
            // Simple index lookup
            return $rootScope.categories.data[categoryId];
        },
        getDeals: function (userData) {
            console.log(userData);
            var url = Config.serverBaseUrl + "api/displaycategoryalldeals/";
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: url,
                data: { category: userData.category }
            }).success(function (data, status, headers, cfg) {
                deferred.resolve(data);
            }).error(function (error, status) {
                deferred.reject(error);
            })

            return deferred.promise;
        }
    }
})

.factory('Locations', function ($http, $q, Config, $rootScope) {

    return {
        all: function () {
            var url = Config.serverBaseUrl + "api/getCities/";
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: url,
                data: {}
            }).success(function (data, status, headers, cfg) {
                deferred.resolve(data);
            }).error(function (error, status) {
                deferred.reject(error);
            })

            return deferred.promise;
        },
        get: function (locationId) {
            // Simple index lookup
            return $rootScope.locations.data[locationId];
        },
        getDeals: function (userData) {
            console.log(userData);
            var url = Config.serverBaseUrl + "api/displaylocationwisedeals/";
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: url,
                data: { location: userData.location }
            }).success(function (data, status, headers, cfg) {
                deferred.resolve(data);
            }).error(function (error, status) {
                deferred.reject(error);
            })

            return deferred.promise;
        }
    }
})

.factory('Registration', function ($http, $q, Config) {
    return {
        post: function (userData) {
                    var _data ={firstname:userData.firstname, lastname:userData.lastname, mobileno:userData.mobileno,
                        password:userData.password, address1:userData.address1, address2:userData.address2, city:userData.city,
                        pin:userData.pincode, cardno:0, memberpin : userData.memberpin, merchantid :0,
                        dob: userData.birthdate, state: userData.state, country: userData.country,emailid:userData.emailid
                    };
                    console.log(_data);
                    var url = Config.serverBaseUrl + "api/addmember/";
                    var deferred = $q.defer();
                    $http({
                        method: 'POST',
                            url: url,
                            data: _data
                    }).success(function (data, status, headers, cfg) {
                        console.log(data);
                        deferred.resolve(data);
                    }).error(function (error, status) {
                        console.log(error);
                        deferred.reject(error);
                    });
                    return deferred.promise;
    }
}

})

.factory('Login', function ($http, $q, Config) {

    return {
        execute: function (userData) {
            var url = Config.serverBaseUrl + "api/login2?callback=1";
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: url,
                data: userData
            }).success(function (data, status, headers, cfg) {
                console.log(data);
                deferred.resolve(data);
            }).error(function (err, status) {
                console.log(err);
                deferred.reject(err);
            });
            return deferred.promise;
        },

        get: function () {
            // Simple index lookup
            return;
        }
    }
});

