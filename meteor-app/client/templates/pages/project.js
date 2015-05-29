Template.Project.rendered = function() {
    $('ul.tabs').tabs();
};

Template.Project.events({
    'click [data-action="toggle-diff"]': function(e) {
        //TODO: Use dynamic vars instead
        $(e.currentTarget).find('i').toggleClass('mdi-action-visibility').toggleClass('mdi-action-visibility-off');
        return false;
    }
});