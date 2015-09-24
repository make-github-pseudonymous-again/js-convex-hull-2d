
const _from = function ( findhull , alloc ) {

	return function ( space , points ) {

		const take = alloc( points.length ) ;

		findhull( space , points , take ) ;

		return sort( space , [ ..._filter( take , points ) ] ) ;

	} ;

} ;

exports._from = _from ;
