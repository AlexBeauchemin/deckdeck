Template.Project.rendered = function() {
    $('ul.tabs').tabs();
    $('.modal-trigger').leanModal();
};

Template.Project.helpers({
    isActive: function (state) {
        if (Session.get('showState') === state) return "active";
        return "";
    }
});

Template.Project.events({
    'click [data-action="toggle-diff"]': function(e) {
        //TODO: Use dynamic vars instead
        $(e.currentTarget).find('i').toggleClass('mdi-action-visibility').toggleClass('mdi-action-visibility-off');

        if (Session.get('showDiff')) Session.set('showDiff', null);
        else Session.set('showDiff', 'show-diff');

        return false;
    },
    'click [data-action="toggle-state"]': function(e) {
        Session.set('showState', $(e.currentTarget).data('state'));
    }
});