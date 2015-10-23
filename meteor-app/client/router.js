Router.configure({
    layoutTemplate: 'Layout',
    loadingTemplate: 'Loading',
    data: function() {
        return {
            projects: Projects.find()
        };
    },
    waitOn: function () {
        return Meteor.subscribe('projects');
    }
});

Router.route('/', {name: 'home'});
Router.route('/project/:_id', {name: 'project'});
Router.route('/edit/:_id', {name: 'edit'});

