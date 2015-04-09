# Roo - Version 1.0.2015.0409
( A Javascript Library For Require And Preload - Code By Joenix )

# API DESCRIPTION

## roo.config

```
roo.config = {
	base: 'http://localhost/'
};
```

## roo.use

```
roo.use( ['jQuery.js', 'action.js'], function( $, act ){
	console.log( $, act.plus( 45, 54 ) );
});
```

```
// action.js
define(function(){
	return {
		plus: function( a, b ){
			return a + b;
		}
	}
});
```

## roo.preload

```
roo.preload( ['picture.jpg', 'stylesheet.css', 'database.json'], function( item, index ){
	console.log( index );
});
```