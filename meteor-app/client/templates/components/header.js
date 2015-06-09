Template.Header.events({
    'click [data-action="open-signup-modal"]': function() {
        var $modal = $('#modal-signup');

        Session.set('signup-error', null);
        $modal.openModal();
        $modal.find('input').first().trigger('click').trigger('focus');
        return false;
    },
    'click [data-action="open-login-modal"]': function() {
        var $modal = $('#modal-login');

        Session.set('login-error', null);
        $modal.openModal();
        $modal.find('input').first().trigger('click').trigger('focus');
        return false;
    },
    'click [data-action="logout"]': function() {
        Meteor.logout(function(error) {
            if (error) Materialize.toast(error.reason, 5000);
            else Router.go('home');
        });
    },
    'click [data-action="open-create-modal"]': function() {
        var $modal = $('#modal-new-project');
        Session.set('create-project-error', null);
        $modal.openModal();
        $modal.find('input').first().trigger('click').trigger('focus');
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