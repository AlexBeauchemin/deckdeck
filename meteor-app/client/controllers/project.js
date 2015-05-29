ProjectController = RouteController.extend({
    action: function () {
        this.state.set('projectId', this.params._id);
        this.render();
    },
    data: function() {
        var sections = Sections.find({project: this.params._id}),
            data = [];

        sections.fetch().forEach(function(section) {
            data.push({
                name: section.name,
                copy: null
            });
        });

        return {
            sections: data,
            project: Projects.findOne(this.params._id),
            projects: Projects.find()
        };
    },
    waitOn: function () {
        return [
            Meteor.subscribe('projects'),
            Meteor.subscribe('sections', this.params._id)
        ];
    }
});