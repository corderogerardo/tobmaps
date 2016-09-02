/*
 * library dependencies:
 *      jquery
 */

// plugin 1.0
Template.multiselectComponent.rendered = function(){

(function($){
  $.fn.multiselect = function() {

    var selector = this;
    var options = $.extend({
          onChange: function() {}
      }, arguments[0] || {});

    activate();

    /////////

    function activate() {

      //events
      $(selector).find('.title').on('click', function(e) {
        $(this).parent().find('.select-options').toggle();
      });

      $(selector).find('input[type="checkbox"]').change(function(e){
        options.onChange.call(this);
      });

    }
  };

}(jQuery));

$(document).ready(function() {
  $('.select-list').multiselect({
    onChange: updateTable
  });
});

function updateTable() {
  var checkboxValue = $(this).val();
  var isChecked = $(this).is(':checked');

};

};
Template.hourSchedule.onRendered(function () {

var multiselect = document.querySelector('#scheduleHours');
	multiselect.addEventListener('change', function() {
  console.log('Selected items:', this.selectedItems());
});

});

Template.hourSchedule.helpers({
	hours: function(){
		var arr = [];
		for(var i =0;i<24;i++){
			arr.push(i);
		}
		return arr;
	}
});
Template.minutesSchedule.helpers({
	minutes: function(){
		var arr = [];
		for(var i=0;i<60;i++){
			arr.push(i);
			i+=10;
		}
		return arr;
	}
});