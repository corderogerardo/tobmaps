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
            $('.js-register-form').trigger('reset');
        }
      });
    }    
  });
});




