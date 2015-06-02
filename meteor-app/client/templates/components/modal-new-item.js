Template.modalNewItem.rendered = function() {
    $('select').material_select();
};

Template.modalNewItem.events({
    "submit form": function (event) {
        event.preventDefault();

        var name = event.target["item-name"].value.trim(),
            sectionName = event.target["section-name"].value.trim(),
            section =  event.target["item-section"].value,
            project = event.target["project-id"].value;

        if (name) {
            Meteor.call('addCopy', project, section, name, function (error, res) {
                if (error) Materialize.toast(error.reason, 5000);
                else event.target["item-name"].value = "";
            });
        }

        if (sectionName) {
            Meteor.call('addSection', project, sectionName, function (error, res) {
                if (error) Materialize.toast(error.reason, 5000);
                else event.target["section-name"].value = "";
            });
        }


    },
    'click [data-action="tab-item"]': function() {
        $('#section-name').val('');
        $('#item-name').trigger('click').focus();
    },
    'click [data-action="tab-section"]': function() {
        $('#item-name').val('');
        $('#section-name').trigger('click').focus();
    }
});