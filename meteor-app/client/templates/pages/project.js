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
    'click [data-action="toggle-state"]': function(e) {
        Session.set('showState', $(e.currentTarget).data('state'));
    }
});