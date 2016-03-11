// publishing the messages
Meteor.publish('messages', function(){
    return Messages.find();
});

// the patients publish list

// the patients publish method
Meteor.publish('patients', function(){
    return Newpatient.find();
});