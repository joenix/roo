(function( global, factory ){

	'use strict';

	// Environment Detect
	global.document ? factory( global || this ) : console.log('Roo must run in Document !');

})
(

// As Window
this,

// Factory
function( window, undefined ){

	var

	// Window
	w = window,

	// Document
	d = w.document,

	// Body
	b = d.body,

	// Head
	h = d.querySelector ? d.querySelector('head') : d.getElementByTagName('head')[0],

	// Noop
	noop = function(){},

	// Location
	location = w.location,

	// Store Cache
	store = [],

	// Roo
	r = {

		// Version
		version: '1.0.2015.0409',

		// Console Log
		log: function( obj, mode ){

			return obj ?

				// Console Object
				function( info, i ){

					if( r.detect( obj, String ) ){

						info = obj;

					}
					else{

						for( i in obj ){

							info += i + ': ' + obj[i] + '\n';

						}

					}

					mode ?

						function( info, pre ){

							pre.innerHTML = info,

							pre.style.cssText = 'box-sizing: border-box; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 2147483584; padding: 1rem; background: rgba(255, 255, 255, .88);',

							b.appendChild( pre );

						}( info, d.createElement('pre') ):

						console.debug( info );

				}(''):

				// Console Error
				w.onerror = function(){

					return r.log( arguments, true ), true;

				};

		},

		// Manifest
		config: function( config ){

			return {

				// Base Url
				base: config.base || ( location.protocol + '//' + location.host + '/' )

			}

		}
		( this.config || {} ),

		// Each List
		each: function( arr, callback, type ){

			return function( len, i, rate ){

				rate = type ? ( r.detect( type, Number ) ? type : 2 ) : 1;

				if( len ){

					if( !~type ){ // -1

						for( i = len; i--; ){

							callback( i, arr[i] );

						}

					}
					else{

						for( i = 0; i < len; i++ ){

							if( type == 'odd' ){

								if( i % rate == 1 ){

									callback( i, arr[i] );

								}

							}
							else{

								if( !(i % rate) ){

									callback( i, arr[i] );

								}

							}

						}

					}

				}
				else{

					for( i in arr ){

						callback( i, arr[i] );

					}

				}

			}( arr.length );

		},

		// Detect Type
		detect: function( obj, type ){

			return type ? obj.constructor === type :

				function( class2type, obj )
				{
					return w
					[
						/[A-Z]\w+/
							.exec(
								class2type.call( obj )
							)
							.toString()
					]
				}
				( {}.toString, obj );

		},

		// Recursive Array
		recursive: function( arr, callback ){

			return function( fn ){

				if( arr.length ){

					callback( arr.shift(), function(){ return fn( arr, callback ) });

				}

			}( arguments.callee );

		},

		// Tolerance AMD
		tolerance: function( store ){

			r.each( store, function( index, item ){

				switch( item ){

					case 'jquery':

						store[ index ] = w['jQuery'];

						break;

				}

			});

			return store;

		},

		// Support
		support: function( fn, argument ){

			return fn.apply( this, r.tolerance( argument ) );

		},

		// Read Resource
		read: function( url, callback ){

			callback = callback || noop;

			return function( type, item ){

				switch( type ){

					// Json
					case 'json':

						item = w.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

						item.onreadystatechange = function(){

							if( item.readyState == 4 && item.status == 200 ){
								callback( eval('(' + item.responseText + ')') );
							}
						};

						item.open('GET', url, true);
						item.send();

						break;

					// Image
					case 'img':

						item = new Image();
						item.src = url;

						item.complete ? callback( item ) : ( item.onload = function(){
							callback( item ), item.onload = null;
						});

						break;

					// Javascript
					case 'js':

						item = d.createElement('script');
						item.type = 'text/javascript',
						item.language = 'javascript',
						item.defer = false,
						item.src = url;

						item.onload = item.onreadystatechange = function(){
							if( item.ready ){
								return false;
							}
							if( !item.readyState || item.readyState == 'loaded' || item.readyState == 'complete' ){
								item.ready = true, callback( item );
							}
						}

						b.appendChild( item );

						break;

					// Stylesheet
					case 'css':

						item = d.createElement('link');
						item.type = 'text/css',
						item.rel = 'stylesheet',
						item.href = url;

						h.appendChild( item );

						callback( item );

						break;

					default: r.log('unknow type: ' + type);
				}

			}( function( type ){

				return ~['jpg','jpeg','gif','png','bmp'].join(' ').indexOf(type) ? 'img' : type;

			}( /\w+$/.exec( url ).toString().toLowerCase() ) );

		},

		// Preload
		preload: function( resource, callback ){

			callback = callback || noop;

			// Clear Store
			store = [];

			return function( index ){

				switch( r.detect( resource ) ){

					case String:

						r.read( r.config.base + resource, function( item ){

							callback( item, index );

						});

						break;

					case Array:

						// Recursive Resource
						r.recursive( resource, function( url, recursive ){

							r.read( r.config.base + url, function( item ){

								callback( item, index ), index++, recursive();

							});

						});

						break;

					default: r.log('unknow resource: ' + resource);
				}

			}( 0 );

		},

		// Use Javascript Library
		use: function( library, holder, callback ){

			library = library || [], holder = holder || '', callback = callback || noop;

			// Quick Running
			if( r.detect( library, Function ) ){

				return callback();

			}

			// Library + Callback
			if( r.detect( holder, Function ) ){

				callback = holder, holder = undefined;

			}

			// Preload Support
			r.preload( library, function( item, index ){

				if( !library.length ){

					// Holder Global Use
					switch( r.detect( holder ) ){

						case Array:

							r.each( store, function( index, hand ){

								return function( hold ){

									if( hold ){

										w[ hold ] = hand;

									}

								}( holder[ index ] );

							});

							break;

						case String:

							w[ holder ] = store[0];

							break;

					}

					// Run Support
					r.support( callback, store );

				}

			});

		}

	};

	// Define
	w.define = function( callback ){

		store.push( r.detect( callback, Function ) ? r.support( callback, store ) : callback );

	};

	// For AMD
	w.define.amd = {

		// jQuery
		jQuery: true

	};

	return w.roo = w.r = r;

});