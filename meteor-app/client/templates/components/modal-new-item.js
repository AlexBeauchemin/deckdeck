Template.modalNewItem.events({
    "submit form": function (event) {
        event.preventDefault();

        var name = event.target["item-name"].value.trim(),
            section =  event.target["item-section"].value,
            project = event.target["project-id"].value;

        if (name) {
            Meteor.call('addCopy', project, section, name, function (error, res) {
                if (error) Materialize.toast(error.reason, 5000);
                else {
                    event.target["item-name"].value = "";
                    $('#modal-new-item').closeModal();
                }
            });
        }
    }
});