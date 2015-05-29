Meteor.startup(function () {
    Sections._ensureIndex({ "project": 1});
});

Accounts.validateNewUser(function (user) {
    var data = {
        email: user.emails[0].address
    };

    var res = Helpers.validateAccountCreation(data);

    if (res.errors.length) {
        throw new Meteor.Error(403, "Account validation failed.");
    }

    return true;
});

Accounts.onCreateUser(function(options, user) {
    if (options.profile) user.profile = options.profile;
    else user.profile = {};

    if (!user.profile.name) {
        user.profile.name = user.emails[0].address
    }

    return user;
});