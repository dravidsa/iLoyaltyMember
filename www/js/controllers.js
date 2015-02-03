angular.module('app.controllers', [])

    .controller('AppCtrl', function ($scope, $state, $rootScope, Config, $ionicLoading, $localstorage) {
        $scope.serverBaseUrl = Config.serverBaseUrl;
        $scope.logout = function () {
            $rootScope.userModel.isLogIn = false;
            $localstorage.setObject('loginData', {});
            $localstorage.setObject('userModel', {});
            $state.go('app.featured');
        };

        $scope.showLoading = function () {
            $scope.loading = $ionicLoading.show({
                content: 'Loading...'
            });
        };
        $scope.showProcessing = function () {
            $scope.loading = $ionicLoading.show({
                content: 'Processing...'
            });
        };
        $scope.hide = function () {
            $scope.loading.hide();
        };

    })

      .controller('FeaturedCtrl', function ($scope, $stateParams, $ionicLoading, Deals, $rootScope, $localstorage,$timeout) {
          //$scope.$parent.showLoading();

          $rootScope.featuredDeals = $localstorage.getObject('featuredDeals');

              var userData = { id: 0 };
              if ($rootScope.featuredDeals.loadmore == false) {
                  $scope.$parent.showLoading();
                  Deals.all(userData).then(function (data) {
                      $rootScope.featuredDeals.data = [];
                      $rootScope.featuredDeals.data = data;
                      $rootScope.featuredDeals.loadmore = true;
                      $localstorage.setObject('featuredDeals', $rootScope.featuredDeals);
                      $scope.$parent.hide();
                  }, function (error, status) {
                      $scope.$parent.hide();
                  })

                  //Deals.pageWise($rootScope.featuredDeals.pageNo).then(function (data) {
                  //    $rootScope.featuredDeals.data = [];
                  //    $rootScope.featuredDeals.data = data;
                  //    $rootScope.featuredDeals.pageLength = data.length;
                  //    //$localstorage.setObject('featuredDeals', $rootScope.featuredDeals);
                  //}, function (error, status) {

                  //})

              }
                
          //Deals.pageWise(2).then(function (data) {
          //    console.log("pageWise", data);
          //}, function (error, status) {

          //})

              $scope.searchdeals = function(searchText)
              {
                 // var userData = { id: 0 };
                  Deals.search(searchText).then(function (data) {
                      $rootScope.searchDeals.data = [];
                      $rootScope.searchDeals.data = data;

                  }, function (error, status) {

                  })
              }

              function getsearchdeals(searchText)
              {
                
              }
      })

    .controller('FeaturedDealDetailCtrl', function ($scope, $stateParams, $ionicLoading, Deals, $rootScope) {
        $scope.deal = Deals.get($stateParams.dealId)
    })

    .controller('LoginCtrl', function ($scope, $state, $location, Login, $rootScope, $localstorage) {

        $scope.username = "";
        $scope.loginAlerts = [];
        var formdata = new FormData();
        formdata.append("username", "ritesh@gmail.com");
        formdata.append("password", "iloyal@123");
        //$scope.loginData = {
         //   username: "ritesh@gmail.com",
         //   password: "iloyal@123"
        //}
        $scope.loginData = {
            username: "",
            password: ""
        }
        $scope.doLogin = function (loginData) {
           
            $scope.loginAlerts = [];
            if (validate(loginData) == false) return;

            $scope.$parent.showProcessing();
            Login.execute(loginData).then(function (data) {
                console.log(data);
                data = data[0];
                if (data.id != 0) {
                    $rootScope.userModel.isLogIn = true;
                    $rootScope.userModel.userid = data.id;
                    $rootScope.userModel.firstname = data.name;
                    $rootScope.userModel.lastname = data.lastname;
                    $rootScope.userModel.mobileno = data.mobile;
                    $rootScope.userModel.emailid = data.email;
                    $rootScope.userModel.birthdate = data.dob;
                    $rootScope.userModel.address1 = data.address1;
                    $rootScope.userModel.address2 = data.address2;
                    $rootScope.userModel.city = data.city;
                    $rootScope.userModel.pincode = data.pincode;
                    $rootScope.userModel.state = data.state;
                    $rootScope.userModel.country = data.country;
                    $rootScope.userModel.cardno = data.cardno;
                    $rootScope.userModel.memberpin = data.pinnumber;
                    $rootScope.userModel.points = data.points;
                    $rootScope.userModel.pointsexpirydate = data.pointsexpirydate;
                    $rootScope.userModel.points_inprocess = data.points_inprocess;
                    $rootScope.userModel.points_redeemable = data.points_redeemable;
                    console.log($rootScope.userModel);

                    $localstorage.setObject('loginData', loginData);
                    $localstorage.setObject('userModel', $rootScope.userModel);
                    $location.path('#/app/featured');
                    // $route.routes[null];
                    $scope.$parent.hide();
                }
                else {
                    var _alert = { type: "danger", message: "The email or password you entered is incorrect. " }
                    $scope.loginAlerts.push(_alert);
                    $scope.$parent.hide();
                }

            }, function (error, status) {
                console.log(error);
                $rootScope.userModel.isLogIn = false;
                $scope.$parent.hide();
            });
        }

        function validate(loginData) {
            if (loginData.username == null || loginData.username == "") {
                var _alert = { type: "danger", message: "Enter user name. " }
                $scope.loginAlerts.push(_alert);
                return false;
            }
            else if (loginData.password == null || loginData.password == "") {
                var _alert = { type: "danger", message: "Enter password. " }
                $scope.loginAlerts.push(_alert);
                return false;
            }
        }

        $scope.showRegister = function()
        {
            $state.go('app.register');
        }
    })

    .controller('RegisterCtrl', function ($scope, $stateParams, $ionicLoading, Registration, $ionicPopup, $state, $ionicModal, $timeout) {
        $scope.user = {
            firstname: "", lastname: "", mobileno: "", emailid: "", birthdate: "", password: "", repassword: "", memberpin: "", rememberpin: "",
            address1: "", address2: "", city: "", pincode: "", state: "", country: ""
        };

        $scope.doRegister = function(user)
        {
            $scope.showProcessing();
            Registration.post(user).then(function (data) {
                console.log(data);
                if (data.id != "0")
                {
                    $scope.loading = $ionicLoading.show({
                        content: 'Thank you for Registering at iLoyalty.'
                    });
                    $timeout(function () {
                        $scope.loading.hide();
                        $state.go('app.login');
                    }, 2000);
                }
                $scope.$parent.hide();
            }, function (error, status) {
                $scope.$parent.hide();
            })
        }
    })

    .controller('LocationCtrl', function ($scope, $stateParams, Locations, $rootScope, $localstorage) {
        
        $rootScope.locations = $localstorage.getObject('locations');

        if ($rootScope.locations.loadmore == false)
        {
            $scope.$parent.showLoading();
            Locations.all().then(function (data) {
                $rootScope.locations.data = data;
                $rootScope.locations.loadmore = true;
                $localstorage.setObject('locations', $rootScope.locations);
                $scope.$parent.hide();
            }, function (error, status) {
                $scope.$parent.hide();
            })
        }

    })

     .controller('LocationDealsCtrl', function ($scope, $stateParams, Locations) {
         
         $scope.$parent.showLoading();
         $scope.location = Locations.get($stateParams.locationId);
         var userData = { location: $scope.location.city };
         Locations.getDeals(userData).then(function (data) {
             $scope.locationDeals = data;
             $scope.$parent.hide();
         }, function (error, status) {
             $scope.$parent.hide();
         })
        
     })

    .controller('CategoryCtrl', function ($scope, $stateParams, Categories, $rootScope, $localstorage) {

        $rootScope.categories = $localstorage.getObject('categories');

        if ($rootScope.categories.loadmore == false)
        {
            $scope.$parent.showLoading();
            Categories.all().then(function (data) {
                $rootScope.categories.data = [];
                $rootScope.categories.data = data;
                $rootScope.categories.loadmore = true;
                $localstorage.setObject('categories', $rootScope.categories);
                $scope.$parent.hide();
            }, function (error, status) {
                $scope.$parent.hide();
            })
        }
    })

    .controller('CategoryDealsCtrl', function ($scope, $stateParams, Categories) {

        $scope.$parent.showLoading();
        $scope.category = Categories.get($stateParams.categoryId);
        console.log("cate", $scope.category);
        var userData = { category: $scope.category.id };
        Categories.getDeals(userData).then(function (data) {
            $scope.categoryDeals = data;
            console.log("deals",$scope.categoryDeals);
            $scope.$parent.hide();
        }, function (error, status) {
            $scope.$parent.hide();
        })

    })

    .controller('ProfileCtrl', function ($scope, $rootScope, $localstorage) {
        $scope.profile = angular.copy($rootScope.userModel);
        var userModel = $localstorage.getObject('userModel');
        if ($rootScope.isEmptyObject(userModel) == false) {
            $scope.profile = userModel;
        }
    })

    .controller('ScanCtrl', function ($scope, $rootScope, $localstorage) {
        $scope.profile = angular.copy($rootScope.userModel);
        var userModel = $localstorage.getObject('userModel');
        if ($rootScope.isEmptyObject(userModel) == false) {
            $scope.profile = userModel;

            $scope.qrcodeString = $scope.profile.cardno;
            $scope.size = 250;
            $scope.correctionLevel = '';
            $scope.typeNumber = 0;
            $scope.inputMode = '';
            $scope.image = true;
        }


    })

    

    

  ;
