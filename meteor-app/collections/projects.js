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
        addProject: function(name) {
            if(!Meteor.user()) return;

            name = name.trim().substr(0,50);

            return Projects.insert({
                dateCreated: new Date(),
                dateLastAccess: new Date(),
                languages: ['value'],
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
        },
        addLanguage: function(projectId, language) {
            if(!Meteor.user()) return;

            language = language.trim().substr(0,20);

            var project = Projects.findOne({_id: projectId, users: Meteor.user()._id});
            if (!project || !language) return;

            var languages = project.languages;

            //Rename default language to the language entered
            if (languages.length === 1 && languages[0] == "value") {
                languages = [];
                var copydeck = Copy.find({project: projectId});

                if (copydeck.count()) {
                    copydeck.forEach(function (copy) {
                        var data = copy.data;

                        data[language] = data.value;
                        delete data.value;

                        Copy.update({_id: copy._id}, {$set: { data: data }});
                    });
                }
            }

            if (languages.indexOf(language) > -1) return;

            languages.push(language);

            return Projects.update({_id: projectId}, {$set: { languages: languages }});
        },
        removeLanguage: function(projectId, language) {
            if(!Meteor.user()) return;

            language = language.trim().substr(0,20);

            var project = Projects.findOne({_id: projectId, users: Meteor.user()._id});
            if (!project) return;

            var languages = project.languages;
            if (languages.indexOf(language) === -1) throw new Meteor.Error( 500, 'Language not found' );
            if (languages.length === 1) throw new Meteor.Error( 500, 'You need to keep at least 1 language in your project' );

            languages.splice(languages.indexOf(language),1);

            return Projects.update({_id: projectId}, {$set: { languages: languages }});
        }
    });
}