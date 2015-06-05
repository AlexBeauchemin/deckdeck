ProjectController = RouteController.extend({
    action: function () {
        this.state.set('projectId', this.params._id);
        this.render();
    },
    data: function() {
        var projectId = this.params._id,
            sections = Sections.find({project: projectId}, {sort: {dateCreated: 1}}),
            data = [],
            conditions = {project: projectId};

        var state = Session.get('showState');
        if (state && state!="all") conditions.state = state;

        sections.fetch().forEach(function(section) {
            conditions.section = section._id;

            data.push({
                _id: section._id,
                name: section.name,
                copy: Copy.find(conditions)
            });
        });

        return {
            sections: data,
            project: Projects.findOne(this.params._id),
            projects: Projects.find(),
            projectId: this.params._id
        };
    },
    onBeforeAction: function() {
        if (!Meteor.user() && this.ready()) {
            return this.redirect('/');
        }
        else {
            Session.setDefault('showState', 'all');
            this.next();
        }
    },
    waitOn: function () {
        return [
            Meteor.subscribe('projects'),
            Meteor.subscribe('sections', this.params._id),
            Meteor.subscribe('copy', this.params._id)
        ];
    }
});