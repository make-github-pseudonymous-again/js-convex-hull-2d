const _alloc = function ( value ) {

	return function ( n ) {

		const a = new Array( n ) ;

		for ( let i = 0 ; i < n ; ++i ) a[i] = value ;

		return a ;

	} ;

} ;

exports._alloc = _alloc ;
