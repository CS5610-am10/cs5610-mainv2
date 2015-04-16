var app = angular.module("BeingChefApp", []);

app.controller("BeingChefCtrl", function ($scope) {
    var testReview = { comment: "It's awesome", rating: 5, timeSpan: "5 hours ago", username: "ankit" }

    $scope.reviews = [testReview];
    $scope.addReview = function (review) {
        review.username = "test";
        review.timeSpan = humanized_time_span(new Date());
        review.rating = $scope.currentRating;
        $scope.reviews.push(review);
    }
    $(function () {
        $('#rating').on('change', function () {
            $scope.currentRating = $(this).val();
        });
    });
})

app.filter('range', function () {
    return function (val, range) {
        range = parseInt(range);
        for (var i = 0; i < range; i++)
            val.push(i);
        return val;
    };
});

