Copy = new Mongo.Collection("copy");

if(Meteor.isClient) {
    //Stub methods for faster auto-corrected results
    Meteor.methods({
        //...
    });
}

if(Meteor.isServer) {
    Meteor.publish("copy", function (projectId) {
        if (!projectId) return null;
        return Copy.find({project: projectId});
    });

    Meteor.methods({
        addCopy: function(projectId, sectionId, name) {
            if(!Meteor.user()) return;

            var project = Projects.findOne({_id: projectId, users: Meteor.user()._id});
            if (!project) return;

            name = name.trim().substr(0,50);

            return Copy.insert({
                name: name || 'Unnamed',
                project: projectId,
                section: sectionId,
                state: "new",
                info: "",
                copy: {}
            });
        }
    });
}