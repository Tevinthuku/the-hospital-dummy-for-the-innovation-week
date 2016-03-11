if(Meteor.isClient) {
    
    // login page
    Accounts.onLogin(function() {
        Router.go('main')
    });   
    
    // logout page
    Accounts.onLogout(function() {
        Router.go('login')
    });   
    
}


// the layout template
Router.configure({
    layoutTemplate: 'layout',
    fastRender: true
});


// login route

Router.route('/login');


// the main layout
Router.route('/',{
    name: "main",
    template:"main",
    fastRender: true
});

// new patient
Router.route('/newpatient');


// the patients lists

Router.route('/patients');

// the search template

Router.route('/search');


// the patient details route

// the frontdeskpatientdetails route

Router.route('/patientdetails/:_id',{
    
    name: 'patientdetails',
    template: 'patientdetails',
    
    subscriptions: function() {
    // returning a subscription handle or an array of subscription handles
    // adds them to the wait list.
    var currentPatient = this.params._id;
    return Meteor.subscribe('patients', currentPatient);
  },
    data: function(){
        var currentPatient = this.params._id;
        return Newpatient.findOne({ _id: currentPatient});
    }
});
