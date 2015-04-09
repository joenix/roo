define(function(){

return {
	// 0
	getDay: function( index ){

		return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][ index ] || 'error';

	},
	// 1
	mon: 'Monday',
	// 2
	tues: 'Tuesday',
	// 3
	wed: 'Wednesday',
	// 4
	thur: 'Thursday',
	// 5
	fri: 'Friday',
	// 6
	sat: 'Saturday',
	// 7
	sun: 'Sunday'
}

});