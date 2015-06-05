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
            if (error) Materialize.toast(error.reason, 5000);
            else Router.go('home');
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
    },
    'click [data-action="toggle-diff"]': function(e) {
        //TODO: Use dynamic vars instead
        $(e.currentTarget).find('i').toggleClass('mdi-action-visibility').toggleClass('mdi-action-visibility-off');

        if (Session.get('showDiff')) Session.set('showDiff', null);
        else Session.set('showDiff', 'show-diff');

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