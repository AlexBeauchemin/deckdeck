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
    },
    'click .fixed-action-btn a': function(e) {
        var $button = $(e.currentTarget),
            $modal = $($button.attr('href'));

        if (!$modal) return;
        $modal.openModal();
        $modal.find('input[type="text"]').not('.select-dropdown').first().trigger('focus');
    }
});