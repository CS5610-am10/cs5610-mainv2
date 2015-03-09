var app = angular.module("NoteApp", []);
app.controller("NoteAppController", function ($scope, $http) {
    //cs5610-am10.rhcloud.com
    $http.jsonp("http://cs5610-am10.rhcloud.com/note?callback=JSON_CALLBACK").
        success(function (notes) {
            $scope.notes = notes;
        });

    $scope.removeNote = function (id) {
        $http.delete("http://cs5610-am10.rhcloud.com/note/" + id).
        success(function (notes) {
            $scope.notes = notes;
        });
    }

    $scope.addNote = function (note) {
        $http.post("http://cs5610-am10.rhcloud.com/note", note).
        success(function (notes) {
            $scope.notes = notes;
            $scope.note = {}
        });
    }
    $scope.editable = {}
    $scope.editNote = function (note) {
        $scope.editable[note._id] = {name: note.name, text: note.text};

    }

    $scope.saveNote = function (id, note) {
        $http.put("http://cs5610-am10.rhcloud.com/note/" + id, note).
        success(function (notes) {
            $scope.notes = notes;
            $scope.editable[id] = false;
        });
    }
})