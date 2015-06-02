Projects = new Mongo.Collection("projects");

if(Meteor.isClient) {
    //Stub methods for faster auto-corrected results
    Meteor.methods({
        //...
    });
}

if(Meteor.isServer) {
    Meteor.publish("projects", function () {
        return Projects.find({users: this.userId });
    });

    Meteor.methods({
        addProject: function(name, languages) {
            if(!Meteor.user()) return;

            name = name.trim().substr(0,50);

            //TODO Secure languages entries (like the name above)

            return Projects.insert({
                dateCreated: new Date(),
                dateLastAccess: new Date(),
                languages: languages || ['en'],
                name: name || 'New project',
                users: [Meteor.user()._id]
            });
        },
        removeProject: function(id) {
            if(!Meteor.user()) return;

            id = id.trim().substr(0,100);

            var project = Projects.findOne({_id: id, users: Meteor.user()._id});
            if (!project) return;

            Projects.remove(id);
            Sections.remove({project: id});
            Copy.remove({project: id});
        }
    });
}