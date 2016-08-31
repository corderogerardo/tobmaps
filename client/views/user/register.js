'use strict';

Template.register.rendered = function(){
  // Initialize i-check plugin
  $('.i-checks').iCheck({
      checkboxClass: 'icheckbox_square-green',
      radioClass: 'iradio_square-green'
  });

  // Move modal to body
  // Fix Bootstrap backdrop issu with animation.css
  $('.modal').appendTo("body");
};

Template.register.events({
  "submit .js-register-form":function(event){
    event.preventDefault();
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    var account = {
      email:email,
      password:password,
    };
      /**
       * @param {Meteor.call} - This meteor method call the server side method insertAccount that receive the email and an password to validate the insert in collection.
       */
    Meteor.call('addUserAccount',account);
    $('.js-register-form').trigger("reset");
  }
});

/**
 * Template.register.onRendered(function(){
    var validator = $('.register').validate({
        submitHandler: function(event){
            var email = $('[name=email]').val();
            var password = $('[name=password]').val();
            Accounts.createUser({
                email: email,
                password: password
            }, function(error){
                if(error){
                    if(error.reason == "Email already exists."){
                        validator.showErrors({
                            email: "That email already belongs to a registered user."   
                        });
                    }
                } else {
                    $('.register').trigger('reset');
                }
            });
        }    
    });
});
 */




