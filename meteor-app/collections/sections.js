Sections = new Mongo.Collection("sections");

if(Meteor.isClient) {
    //Stub methods for faster auto-corrected results
    Meteor.methods({
        //...
    });
}

if(Meteor.isServer) {
    Meteor.publish("sections", function (projectId) {
        if (!projectId) return null;
        return Sections.find({project: projectId});
    });

    Meteor.methods({
        addSection: function(projectId, name) {
            if(!Meteor.user()) return;

            var project = Projects.findOne({_id: projectId, users: Meteor.user()._id});
            if (!project) return;

            name = name.trim().substr(0,50);

            return Sections.insert({
                name: name || 'Default',
                project: projectId,
                dateCreated: new Date()
            });
        },
        removeSection: function(id) {
            if(!Meteor.user()) return;

            id = id.trim().substr(0,100);

            var section = Sections.findOne(id);
            if (!section) return;

            var project = Projects.findOne({_id: section.project, users: Meteor.user()._id});
            if (!project) return;

            Sections.remove(id);
            Copy.remove({section: id});
        }
    });
}