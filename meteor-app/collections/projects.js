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
        }
    });
}