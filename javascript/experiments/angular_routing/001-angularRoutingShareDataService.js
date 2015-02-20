app.factory('FakebookService', function fakebookService() {
    var people = ['Abhimanyu', 'Tejas', 'Shreyas', 'Rishi'];
    var friends = [];

    var getPeople = function () {
        return people;
    }

    var addFriend = function (person) {
        friends.push(person);
        people.splice(people.indexOf(person), 1);
    }

    var removeFriend = function (person) {
        people.push(person);
        friends.splice(friends.indexOf(person), 1);
    }

    var getFriends = function () {
        return friends;
    }

    return {
        getPeople: getPeople,
        addFriend: addFriend,
        removeFriend: removeFriend,
        getFriends: getFriends
    }
});