ProjectController = RouteController.extend({
    action: function () {
        this.state.set('projectId', this.params._id);
        this.render();
    },
    data: function() {
        var projectId = this.params._id,
            sections = Sections.find({project: projectId}),
            data = [];

        sections.fetch().forEach(function(section) {
            data.push({
                _id: section._id,
                name: section.name,
                copy: Copy.find({project: projectId, section: section._id})
            });
        });

        return {
            sections: data,
            project: Projects.findOne(this.params._id),
            projects: Projects.find(),
            projectId: this.params._id
        };
    },
    waitOn: function () {
        return [
            Meteor.subscribe('projects'),
            Meteor.subscribe('sections', this.params._id),
            Meteor.subscribe('copy', this.params._id)
        ];
    }
});