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

/**
 * onRendered functions to execute a function when the “register” template is first created and then when the “register” template is rendered.
 * @param  {[class='js-register-form']} )
 * @param  {[name='emaio']} )
 * @param  {[name='password']} )
 * @return {[Meteor.call(function(error))]}
 */
Template.register.onRendered(function(){
  var validator = $('.js-register-form').validate({
    submitHandler: function(){
      var email = $('[name=email]').val();
      var password = $('[name=password]').val();
      var account = {
        email:email,
        password:password,
      };
      Meteor.call('addUserAccount',account, function(error){
        if(error){
            if(error.reason == "Email already exists."){
                validator.showErrors({
                    email: "That email already belongs to a registered user."   
                });
            }
        } else {
            toastr.success('You have create a new account.','User added!');
            $('.js-register-form').trigger('reset');
        }
      });
    }    
  });
});

/**
 * setDefaults function define a default set of rules and error messages validate functions
 * @type {Object}
 */
$.validator.setDefaults({
    rules: {
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minlength: 6
        }
    },
    messages: {
        email: {
            required: "You must enter an email address.",
            email: "You've entered an invalid email address."
        },
        password: {
            required: "You must enter a password.",
            minlength: "Your password must be at least {0} characters."
        }
    }
});




