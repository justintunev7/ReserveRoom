angular.module('adminApp', [])
    .controller("MainCtrl", [
        '$scope', '$http',
        function($scope, $http) {

            $http.get('/user/profile')
                .success(function(data, status, headers, config) {
                    $scope.user = data;
                    $scope.error = "";
                }).
            error(function(data, status, headers, config) {
                $scope.user = {};
                $scope.error = data;
            });
            console.log("In AngularJS");
            $scope.rooms = [];

            $scope.getAll = function() {
                console.log("Getting rooms...");
                return $http.get('/rooms').success(function(data) {
                    angular.copy(data, $scope.rooms);
                    console.log(data);
                });
            };

            $scope.delete = function(room) {
                console.log('in delete');
                console.log(room);
                $http.delete('/rooms/' + room._id)
                    .success(function(data) {
                        console.log("delete worked");
                    });
                $scope.getAll();
            };
            $scope.addRoom = function() {
                console.log('Adding room');

                var newRoom = {
                    institutionName: $scope.user.institution, // name of organization/school
                    roomName: $scope.roomname, // ex: Room 211, Production Studio, etc.
                    openTime: $scope.opentime,
                    closeTime: $scope.closetime,
                    roomCapacity: $scope.capacity,

                    monday: $scope.monday,
                    tuesday: $scope.tuesday,
                    wednesday: $scope.wednesday,
                    thursday: $scope.thursday,
                    friday: $scope.friday,
                    saturday: $scope.saturday,
                    sunday: $scope.sunday,
                };
                console.log(newRoom);
                $http.post('/rooms', newRoom).success(function(data) {
                    $scope.rooms.push(data);
                });
                //$scope.roominfo = JSON.stringify(newRoom, null, 2);
                $scope.roominfo = "Room submitted";
                $scope.roomname = '';
                $scope.opentime = null;
                $scope.closetime = null;
                $scope.capacity = null;
                $scope.monday = null;
                $scope.tuesday = null;
                $scope.wednesday = null;
                $scope.thursday = null;
                $scope.friday = null;
                $scope.saturday = null;
                $scope.sunday = null;
            };
            $scope.openReservationModal = function(room) {
                $scope.opentime = room.openTime;
                $scope.closetime = room.closeTime;
                $("#reservationModal").modal({
                    fadeDuration: 300
                });
            };
            $scope.getAll();
        }
    ]);
