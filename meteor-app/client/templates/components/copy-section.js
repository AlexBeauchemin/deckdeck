Template.copySection.rendered = function() {
    $('select').material_select();
};

Template.copySection.events({
    'click [data-action="toggleInput"]': function(e) {
        var $parent = $(e.currentTarget).parent();

        //Can replace trigger click + trigger focus by adding "active" class on label (see materializecss doc)
        $parent.addClass('edit');
        $parent.find('textarea').trigger('focus').trigger('click');
        //$parent.find('label').addClass('active');
    },
    'blur textarea': function(e) {
        var $input = $(e.currentTarget),
            $parent = $input.parent().parent(),
            id = $input.attr('id').split('-')[0],
            lang = $input.attr('id').split('-')[1];

        if ($parent.hasClass('edit')) $parent.removeClass('edit');

        Meteor.call('updateCopy', id, lang, $input.val(), function(error, res) {
            if (error) Materialize.toast(error.reason, 5000);
        });
    },
    'click [data-action="copy-done"]': function(e) {
        Meteor.call('updateCopyState', $(e.currentTarget).data('id'), 'done', function(error, res) {
            if (error) Materialize.toast(error.reason, 5000);
        });
    },
    'click [data-action="copy-remove"]': function(e) {
        Meteor.call('removeCopy', $(e.currentTarget).data('id'), function(error, res) {
            if (error) Materialize.toast(error.reason, 5000);
        });
    },
    'click [data-action="delete-section"]': function(e) {
        Meteor.call('removeSection', $(e.currentTarget).data('id'), function(error, res) {
            if (error) Materialize.toast(error.reason, 5000);
        });
    },
    'click [data-action="expand-section"]': function(e) {
        var $list = $(e.currentTarget).parents('.section-data-table');
        $list.toggleClass('contract');
    }
});