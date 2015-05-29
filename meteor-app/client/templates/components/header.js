Template.Header.events({
    'click [data-action="open-signup-modal"]': function() {
        Session.set('signup-error', null);
        $('#modal-signup').openModal();
        return false;
    },
    'click [data-action="open-login-modal"]': function() {
        Session.set('login-error', null);
        $('#modal-login').openModal();
        return false;
    },
    'click [data-action="logout"]': function() {
        Meteor.logout(function(error) {
            if (error) {
                Session.set('signup-error', 'error shake');
                Materialize.toast(error.reason, 5000);
            }
        });
    },
    'click [data-action="open-create-modal"]': function() {
        Session.set('create-project-error', null);
        $('#modal-new-project').openModal();
        return false;
    },
    'click [data-action="open-delete-modal"]': function() {
        $('#modal-delete-project').openModal();
        return false;
    }
});

Template.Header.helpers({
    isActive: function(id) {
        var controller = Iron.controller();

        if (id === controller.state.get('projectId')) return "active";
        return "";
    }
});