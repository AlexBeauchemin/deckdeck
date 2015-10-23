EditController = RouteController.extend({
    data: function() {
        var project = Projects.findOne(this.params._id),
            users = [];

        if (project) {
            project.users.forEach(function(user) {
               users.push(Meteor.users.findOne(user));
            });
        }

        return {
            project: project,
            projects: Projects.find(),
            projectId: this.params._id,
            users: users
        };
    },
    onBeforeAction: function() {
        if (!Meteor.user() && this.ready()) {
            return this.redirect('/');
        }
        else {
            this.next();
        }
    },
    waitOn: function () {
        return [
            Meteor.subscribe('projects')
        ];
    }
});