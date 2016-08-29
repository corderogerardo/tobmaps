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
    var validator = $('.register').validate({
        submitHandler: function(event){
            var email = $('[name=email]').val();
            var password = $('[name=password]').val();
            Accounts.createUser({
            		username: email,
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



