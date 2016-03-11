// run at Meteor app startup
Meteor.startup(function() {
  // if users database is empty, seed these values
  if(Meteor.users.find().count() < 1) {
    // users array
    var users = [
        // the front desk roles
      { name: 'Daenerys Targaryen', email: 'frontdesk1@gmail.com', password: 'frontdesk1', roles: ['frontdesk'] },
      { name: 'Khal Drogo', email: 'frontdesk2@gmail.com', password: 'frontdesk2', roles: ['frontdesk'] },
      
      // the nurse roles
      { name: 'Arya Stack', email: 'nurse1@gmail.com', password: 'nurse1', roles: ['nurse'] },
      { name: 'Tyrion Lannister', email: 'nurse2@gmail.com', password: 'nurse2', roles: ['nurse'] },
      
      // the doctors roles
      { name: 'Cersei Lannister', email: 'doctor1@gmail.com', password: 'doctor1', roles: ['doctor'] },
      { name: 'Sansa Stack', email: 'doctor2@gmail.com', password: 'doctor2', roles: ['doctor'] },




      
    ];
    // user creation
    _.each(users, function(d) {
      // return id for use in roles assignment below
      var userId = Accounts.createUser({
        email: d.email,
        password: d.password,
        username: d.email,
        profile: {
          name: d.name
        }
      });
      // verify user email
      Meteor.users.update({ _id: userId }, { $set: { 'emails.0.verified': true } });
      // add roles to user
      Roles.addUsersToRoles(userId, d.roles);
    });
  }
});