/*var hooksObjects = {
	onSuccess: function(formType, result) {
		var values = [];
		$('.search-choice > a').each(function(index,value){
			values.push($(value).attr('data-option-array-index'));
		});
		console.log(values);
		toastr.success('Hi '+values+' '+Meteor.user().emails[0].address+'. You have saved an action.','Action saved!');
	},
	// Called when any submit operation fail
	onError: function(formType, error) {
		toastr.error('Hi '+Meteor.user().emails[0].address+'. '+err,'Action could not be saved!');
	}
};*/
var hooksObjects = {
	onSubmit:function(insertDoc){
		var values = [];
		$('.search-choice > a').each(function(index,value){
			values.push($(value).attr('data-option-array-index'));
		});
		console.log(values);
		Meteor.call('addAction',insertDoc, function(error,result){
			if(error){
				toastr.error('Hi '+Meteor.user().emails[0].address+'. '+err,'Action could not be saved!');
			}
			if(result){
				toastr.success('Hi '+values+' '+Meteor.user().emails[0].address+'. You have saved an action.','Action saved!');

			}
		});
		$('#actionForm').trigger('reset');
		return false;
	},

};

AutoForm.hooks({
	actionForm:hooksObjects
});
