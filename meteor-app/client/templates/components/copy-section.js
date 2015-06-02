Template.copySection.rendered = function() {
    $('select').material_select();
};

Template.copySection.helpers({
    getCopy: function(copy, lang) {
        if (copy[lang] && copy[lang].val) return copy[lang].val;
        return "";
    },
    getPreviousCopy: function(copy, lang) {
        if (copy[lang] && copy[lang].previousVal) return copy[lang].previousVal;
        return "";
    },
    getTextareaState: function(copy, lang) {
        if (!copy[lang]) return "empty";
    },
    getDiffText: function(copy, lang) {
        if (!copy[lang]) return "";

        var previousVal = copy[lang].previousVal,
            val = copy[lang].val,
            diff = null,
            diffText = [];

        if (previousVal.localeCompare(val) === 0) return val;

        diff = JsDiff.diffChars(previousVal, val);

        diff.forEach(function(part){
            var diffClass = "";

            if (part.added) diffClass = "blue lighten-4 added";
            if (part.removed) diffClass = "red lighten-4 removed";
            diffText.push("<span class=" + diffClass + ">" + part.value + "</span>");
        });

        return diffText.join('');
    }
});

Template.copySection.events({
    'click [data-action="toggleInput"]': function(e) {
        $(e.currentTarget).parent()
            .addClass('edit')
            .find('label')
            .trigger('click')
            .trigger('focus');
        //Can replace trigger click + trigger focus by adding "active" class on label (see materializecss doc)
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
    }
});