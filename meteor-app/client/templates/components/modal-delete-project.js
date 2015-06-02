Template.modalDeleteProject.events({
    "submit form": function (event) {
        var id = event.target.id.value.trim();

        Meteor.call('removeProject', id, function(error, res) {
            if (error) Materialize.toast(error.reason, 5000);
            else Router.go('home');
        });

        return false;
    }
});