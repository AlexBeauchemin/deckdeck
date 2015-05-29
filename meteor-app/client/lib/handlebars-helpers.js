if (Meteor.isClient) {
    Template.registerHelper('debug', function(data) {
        console.log(data);
    });

    Template.registerHelper('getSession',function(index){
        return Session.get(index);
    });

    Template.registerHelper('conditionalClass',function(condition, trueClass, falseClass){
        if (condition) return trueClass;
        return falseClass;
    });
}