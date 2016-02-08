/**
 * Created by alex.petryshyn on 2016-01-29.
 */
var app = angular.module('myApp', [])
app.controller('editCtrl',function($scope,$http){

    var textToSearch = this;
    var myUser = this;
    var firstname = this;
    var lastname = this;
    var data = this;
    var tweet = this;
    var tags = this;
    var header = this;
    var tweets = this;
    var tweetdata = this;
    var username = this;
    var post = this;
    var allUsers = this;
    var message = this;
    var anotherUser = this;
    var replyTweet = this;
    var replyMessage = this;
    var tweetsMore = this;
    var searchResult = this;
    var tweetsAnotherUser = this;
    var emailAddress,country,street,city,aboutMe = this;



    //SHOW INFO
    $scope.showdata = function(){

            $http.post("/home").then(function(response) {
                $scope.myUser = response.data;

            });
    }
    //$scope.skipStep = function(){
    //
    //    $http.get("/home").then(function (response) {
    //        alert("SUCCESS!")
    //    });
    //    location.reload();
    //}

    //SAVE INFO
    $scope.save = function () {
        $http.post("/home/edit", {user: {
            'firstname': $scope.firstName,
            'lastname': $scope.lastName,
            'emailAddress':$scope.emailAddress,
            'country':$scope.country,
            'aboutMe':$scope.aboutMe
        }})
            .then(function (response) {
                alert("SUCCESS!")
            });
        //location.reload();


    }
    //SEND TWEET
    $scope.sendTweet = function () {

        $http.post("/home").then(function(response) {
            $scope.myUser = response.data;
            $scope.username = $scope.myUser.user.username;



            $http.post("/home/sendTweet", {
                    'header': $scope.header,
                    'message': $scope.message,
                    'tags': $scope.tags,
                    'username':$scope.username,
                    'date': new Date()


                })
                .then(function (response) {

                    location.reload();

                })


        });

    }






    //LOAD MY TWEETS
    $scope.loadMoreTweets = function() {
        $http.post("/home").then(function (response) {
            $scope.myUser = response.data;

        $http.post("/home/loadMoreTweets", {username: $scope.myUser.user.username}).then(function (response) {

            $scope.tweets = response.data;

        })})
    };


    //LOAD USERS LIST
    $scope.loadMoreUsers = function() {
        $http.post("/timeline/loadMoreUsers").then(function (response) {
            $scope.allUsers = response.data;
        })
    };


    //LOAD MY TIMELINE
    $scope.loadTimeline = function() {
        $http.post("/home").then(function (response) {
            $scope.myUser = response.data;

            $http.get("/timeline/loadTimeline", {user: $scope.myUser.user}).then(function (response) {
                $scope.tweets = response.data;
            })

        });
    };


    // MARK TWEET AS FAVOURITE
    $scope.markAsFavourite = function(post){

        $http.post("/home/markAsFavourite", {
            username :  $scope.myUser.user.username,
            favourite: post})
            .then(function (response) {
            });
        location.reload();

    };
    //LIST ALL FAVOURITES
    $scope.favouritesTweets = function(){

        $http.post("/home").then(function(response) {
            $scope.myUser = response.data;
        });

    }
    // ACTION ON TWEET

    $scope.removeTweet = function (post) {

        $http.post("/home/removeTweet",
            {_id: post._id})
            .then(function (response) {
                alert("SUCCESS!")
            });

        location.reload();
    }

    $scope.followMe = function(user){

        $http.post("/home").then(function(response) {
            $scope.myUser = response.data;



        $http.post("/timeline/followMe", {
                _id: myUser._id,
                following :  user.username})
            .then(function (response) {
                location.reload();
            })});

    }

    $scope.unfollowMe = function(user){

        $http.post("/home").then(function(response) {
            $scope.myUser = response.data;



            $http.post("/timeline/unfollowMe", {
                    _id: myUser._id,
                    following :  user.username})
                .then(function (response) {
                    alert("SUCCESS!")


                })});

    }

    $scope.retwit = function(post){

        $http.post("/home").then(function(response) {
            $scope.myUser = response.data;
            $scope.username = $scope.myUser.user.username;

            $http.post("/timeline/retwit", {
                    'header': post.header,
                    'username':$scope.username,
                    'author':post.username,
                    'tweet': post.tweet,
                    'tags': post.tags,
                    'reply':post.reply,
                    'date': new Date()



                })
                .then(function (response) {
                    alert("Retwit!!")

                })
        })}

    $scope.replyTweet = function(post,replyMessage){
        $http.post("/home/replyTweet", {
                _id : post._id,
                reply: replyMessage})
            .then(function (response) {

                location.reload();

            });


    }
// ACTION ON TWEET

// ANOTHER USER
    $scope.loadUserTweets = function(user){

        $http.post("/home/loadUserTweets", {

                username: user.username})
            .then(function (response) {
                $scope.tweetsAnotherUser = response.data;

            });


    }


    // ANOTHER USER
//    SEARCHING

    $scope.searchByUser = function(){

        $http.post("/timeline/searchByUser",
            {username: $scope.textToSearch})
            .then(function (response) {
                $scope.searchResult = response.data;
            });


    }
    $scope.searchByTweet = function(){

        $http.post("/timeline/searchByTweet",
            {tweet: $scope.textToSearch})
            .then(function (response) {
                $scope.searchResult = response.data;
            });

    }
    $scope.searchByTag = function(){
        $http.post("/timeline/searchByTweet",
            {tag : $scope.textToSearch})
            .then(function (response) {
                $scope.searchResult = response.data;
            });


    }



})

