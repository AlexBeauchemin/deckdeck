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
                lastEdited: Meteor.user().profile.name,
                data: {}
            });
        },
        updateCopy: function(id, lang, val) {
            if(!Meteor.user()) return;

            var copy = Copy.findOne(id);
            if (!copy) return;

            var project = Projects.findOne({_id: copy.project, users: Meteor.user()._id});
            if (!project) return;

            val = val.trim().substr(0,1000);

            if (!copy.data[lang]) {
                copy.data[lang] = {
                    val: val,
                    previousVal: val
                };
            }else {
                copy.data[lang].val = val;
            }

            if (copy.state === "done") copy.state = "modified";

            return Copy.update({_id: id}, {$set: { data: copy.data, state: copy.state }});
        },
        updateCopyState: function(id, state) {
            if(!Meteor.user()) return;

            var copy = Copy.findOne(id);
            if (!copy) return;

            var project = Projects.findOne({_id: copy.project, users: Meteor.user()._id});
            if (!project) return;

            if (state === "done") {
                project.languages.forEach(function(lang) {
                    copy.data[lang].previousVal = copy.data[lang].val
                });
                return Copy.update({_id: id}, {$set: { data: copy.data, state: 'done' }});
            }
        },
        removeCopy: function(id) {
            if(!Meteor.user()) return;

            var copy = Copy.findOne(id);
            if (!copy) return;

            var project = Projects.findOne({_id: copy.project, users: Meteor.user()._id});
            if (!project) return;

            return Copy.remove(id);
        }
    });
}