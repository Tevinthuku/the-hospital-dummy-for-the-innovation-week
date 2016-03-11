Messages = new Mongo.Collection('Messages');

// the allow and deny

Messages.allow({
    insert: function(userId, doc){
        return !!userId;
    },update: function(userId, doc){
        return !!userId;
    }
    
});

Schema = {};

// array of characteristics
MessagesSchema = new SimpleSchema({
    

    
    message: {
        type: String,
        
        autoform: {
            placeholder: "Type Message",
            icon: "chat_bubble",
            type:"textarea"
            
        }
    },
    
    // the email address
    email: {
        type: String,
        
        
    },
    
    day: {
        type: Date,

    },
        
    time: {
        type: String,

    } ,
    
    
    userIntel: {
        type: String,
        label: "Type your Name",
        autoform: {
            class: "disabled"
        }
    },
    
});

// post hook for user intel
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

// post hook for date
var postHooksForDate = {
  before: {
    insert: function(doc) {
      if(Meteor.userId()){
        doc.day = new Date();
      }
      
      return doc;
    }
  }
}

// post hook for time
var postHooksForTime = {
  before: {
    insert: function(doc) {
      if(Meteor.userId()){
          
          var a_p = "";
            var d = new Date();
            var curr_hour = d.getHours();
            if (curr_hour < 12)
               {
               a_p = "AM";
               }
            else
               {
               a_p = "PM";
               }
            if (curr_hour == 0)
               {
               curr_hour = 12;
               }
            if (curr_hour > 12)
               {
               curr_hour = curr_hour - 12;
               }
            
            var curr_min = d.getMinutes();
            
            curr_min = curr_min + "";
            
            if (curr_min.length == 1)
               {
               curr_min = "0" + curr_min;
               }
            
            var timenow = curr_hour + " : " + curr_min + " " + a_p;
                    doc.time = timenow;
                  }
      
      return doc;
    }
  }
}

// post hook for email address

var postHookForEmail = {
  before: {
    insert: function(doc) {
      if(Meteor.userId()){
      
      var user = Meteor.user();
      var emailAddress = user && user.emails && user.emails[0].address;
        doc.email = emailAddress;
      }
      
      return doc;
    }
  }
}


// post hook atachment schema
if(Meteor.isClient){
    // the post hooks for user intel
  AutoForm.addHooks('add-message-form',postHooks );   
  
  // the post hook for hte date
  AutoForm.addHooks('add-message-form',postHooksForDate );  
  
  // the post hook for th time
  AutoForm.addHooks('add-message-form',postHooksForTime ); 
  
  // post hook for email
   AutoForm.addHooks('add-message-form',postHookForEmail );  
   
      

  
}

// attach schema

Messages.attachSchema( MessagesSchema );