angular.module('starter.controllers', [])

.controller('FormsCtrl', function ($scope, Forms) {
    $scope.state = "WA";
    $scope.county = "King";
    //$scope.forms = Forms.all();

    $scope.states = Forms.states();
    $scope.counties = Forms.counties;
    $scope.byJurisdiction = Forms.byJurisdiction;
})

.controller('FormIntroCtrl', function ($scope, $stateParams, Forms) {
    $scope.id = $stateParams.id;
    $scope.form = Forms.get($stateParams.id);
})


.controller('FormItemCtrl', function ($scope, $stateParams, $state, Forms) {
    $scope.id = $stateParams.id;
    $scope.index = parseInt($stateParams.index);
    $scope.form = Forms.get($scope.id);
    $scope.item = Forms.fields($scope.id)[$scope.index];
    $scope.completePct = Math.round(100.0 * $scope.index / $scope.form.itemCount);

    $scope.skipQuestion = function () {
        $state.go("form-item", { "id": $scope.id, "index": $scope.index + 1 });
    };

    $scope.nextQuestion = function () {
        if ($scope.item.onChange) {
            $scope.item.onChange(Forms, $scope.id, $scope.item.response);
        }
        $state.go("form-item", { "id": $scope.id, "index": $scope.index + 1 });
    };

    $scope.previousQuestion = function () {
        $state.go("form-item", { "id": $scope.id, "index": $scope.index - 1 });
    };

    $scope.finish = function () {
        $state.go("finish", { "id": $scope.id });
    }
})

/*.controller('EditCtrl', function ($scope, $stateParams, Forms) {
    $scope.form = Forms.get($stateParams.id);
    $scope.fields = Forms.fields($stateParams.id);

})*/

;