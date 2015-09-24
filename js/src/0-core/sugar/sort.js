
const sort = function ( space , points ) {

	const a = origin( space , points ) ;

	return [ a ].concat( points.slice( 1 ).sort( space.ccw( space.crs , space.dot , a ) ) ) ;

} ;

exports.sort = sort ;
