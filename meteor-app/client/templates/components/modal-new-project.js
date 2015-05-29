Template.modalNewProject.events({
    "submit form": function (event) {
        var name = event.target.name.value.trim();

        Meteor.call('addProject', name, function(error, res) {
            if (error) Materialize.toast(error.reason, 5000);
            if (res) Meteor.call('addSection', res, 'All');
        });

        event.target.name.value = "";
        return false;
    }
});