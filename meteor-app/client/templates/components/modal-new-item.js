Template.modalNewItem.rendered = function() {
    $('select').material_select();
};

Template.modalNewItem.events({
    "submit form": function (event) {
        event.preventDefault();

        var name = event.target["item-name"].value.trim(),
            section =  event.target["item-section"].value,
            project = event.target["project-id"].value;

        Meteor.call('addCopy', project, section, name, function(error, res) {
            if (error) Materialize.toast(error.reason, 5000);
        });

        event.target["item-name"].value = "";
    }
});