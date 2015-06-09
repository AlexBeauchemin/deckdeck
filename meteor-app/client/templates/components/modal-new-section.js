Template.modalNewSection.events({
    "submit form": function (event) {
        event.preventDefault();

        var name = event.target["section-name"].value.trim(),
            project = event.target["project-id"].value;

        if (name) {
            Meteor.call('addSection', project, name, function (error, res) {
                if (error) Materialize.toast(error.reason, 5000);
                else {
                    event.target["section-name"].value = "";
                    $('#modal-new-section').closeModal();
                }
            });
        }
    }
});