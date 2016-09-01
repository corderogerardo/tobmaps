'use strict';

/**
 * Refers to when the template is inserted into the DOM
 * @param  {[#login-email]} )} 
 * @return {[type]}             
 */

Template.loginForm.onRendered(function(){
    var validator = $('.js-form-login').validate({
        submitHandler: function(event){
            var email = $('[name=email]').val();
            var password = $('[name=password]').val();
            Meteor.loginWithPassword(email, password, function(error){
                if(error){
                  if(error.reason == "User not found"){
                      validator.showErrors({
                          email: "That email doesn't belong to a registered user."   
                      });
                  }
                  if(error.reason == "Incorrect password"){
                      validator.showErrors({
                          password: "You entered an incorrect password."    
                      });
                  }
                } else {
                      Router.go("user.show", {_id: Meteor.userId()});
                }
            });
        }
    });
});
