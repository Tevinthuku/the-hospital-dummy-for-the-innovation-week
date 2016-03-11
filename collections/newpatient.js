Newpatient = new Mongo.Collection('Newpatient');

// the allow and deny

Newpatient.allow({
    insert: function(userId, doc){
        return !!userId;
    },update: function(userId, doc){
        return !!userId;
    }
    
});

Schema = {};

// array of characteristics
RevisitSchema = new SimpleSchema({
    
    remark: {
      type: String,
      
      autoform: {
          icon: "create",
      }
    },
    remarkday: {
        type: Date,
        optional: true,
        autoform: {
            icon: "date_range",
            type: "pickadate",

        }
    },
        
    time: {
        type: String,
        
        autoform: {
            class: "inputentry_time",
            type:"text",
            icon: "access_time",
            
            
        }
    }    
    
});

// the nurse details

// array of characteristics
DoctorSchema = new SimpleSchema({
    
    weight: {
      type: Number,
      
      
      autoform: {
          icon: "directions_walk",
      }
    },
    temp: {
        type: Number,
        optional: true,
        autoform: {
            icon: "opacity",
            

        }
    },
    doctoremarks: {
        type: String,
        
        autoform: {
            type: 'textarea',
            icon: "content_copy",
            
            
        }
    },
    
    date: {
        type: Date,
        
        autoform: {
            type: 'pickadate',
            icon: 'date_range',
        }
    }
    
});

NewPatientSchema = new SimpleSchema({
// the name    
    name: {
        type: String,
        label: "Name",
        autoform: {
            icon: "person",
            class: "newpatient_name"
        },
    },

// the phone number    
    tel: {
        type: Number,
        label: "Phone Number",
        autoform: {
            icon: "call",
            class: "newpatient_tel"
        }
    },
// the email
   email: {
       type: String,
       label: "Email Address",
       autoform: {
           icon: "mail",
           class: "newpatient_email"
       }
   },
   
   // the location
   location: {
       type: String,
       label: "Location",
       autoform: {
           icon: "edit_location",
           class: "newpatient_location"
       }
   },
   
   // revists
   
    remarks: {
        
        type: [RevisitSchema]
    },
   
   // the gender
    gender: {
        type: String,
        label: "Gender",
        allowedValues: ['Male', 'Female','Other'],
        autoform: {
          options: [
            {label: "Male", value: "Male"},
            {label: "Female", value: "Female"},
            {label: "Other", value: "Other"},
          ]
        }
  },
   
// user id    
    userIntel: {
        type: String,
        label: "Type your Name",
        autoform: {
            class: "disabled"
        }
    },
    
    
    postsDate: {
        type: Date,
        label: "Publication Date"
    },
    // the number oof visits
    
    visits: {
        type: Number,
        label: "Number of visits"
    },
    // in nurse list
    inDoctorList: {
        type: Boolean,
        defaultValue: false,
        optional: true,
    },
    /*
    * the doctor in the details
    
    */
    doctor: {
        optional: true,
        type: [DoctorSchema],
      
    }
     
});

// hook for the id
var postHooks = {
  before: {
    insert: function(doc) {
      if(Meteor.userId()){
        doc.userIntel = Meteor.userId();
      }
      
      return doc;
    }
  }
}

// post hook for the number ofd visits which is noe

var postHookForVisits = {
    before: {
        insert: function(doc){
            if(Meteor.userId()){
                doc.visits = 1;
            }
            
            return doc;
        }
    }
}

// hook for the date published
var postHooksForDate = {
    before: {
        insert: function(doc) {
            if(Meteor.userId()){
                doc.postsDate = new Date();
            }
            return doc
        }
    }
}



if (Meteor.isClient) {
    // post hooks foor the current user
    AutoForm.addHooks('add-details-form',postHooks );
    
    //post hooks for date
    AutoForm.addHooks('add-details-form',postHooksForDate );
    // post hook for visits
    AutoForm.addHooks('add-details-form',postHookForVisits );
   
    // redirect to the details page

AutoForm.addHooks(['add-details-form'],{
    onSuccess: function(formType, result) {
        Router.go('patientdetails',{_id: this.docId});
    }
});

}


Newpatient.attachSchema( NewPatientSchema );