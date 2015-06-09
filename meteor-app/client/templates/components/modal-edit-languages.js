Template.modalEditLanguages.events({
    "submit form": function (event) {
        event.preventDefault();

        var name = event.target["language-name"].value.trim(),
            project = event.target["project-id"].value;

        if (name) {
            Meteor.call('addLanguage', project, name, function (error, res) {
                if (error) Materialize.toast(error.reason, 5000);
                else {
                    event.target["language-name"].value = "";
                    $('#modal-edit-languages').closeModal();
                }
            });
        }
    },
    'click [data-action="remove-language"]': function (event) {
        event.preventDefault();

        var $el = $(event.currentTarget),
            project = $el.data('project'),
            language = $el.text();

        Meteor.call('removeLanguage', project, language, function (error, res) {
            if (error) Materialize.toast(error.reason, 5000);
            //else $el.remove();
        });
    }
});