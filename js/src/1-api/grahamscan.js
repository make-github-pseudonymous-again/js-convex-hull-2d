const grahamscan = function ( space , _points ) {

	const points = sort( space , [ ..._points ] ) ;

	const hull = [ ] ;

	gscan( space.crs , points , 0 , points.length , hull ) ;

	return hull ;

} ;

exports.grahamscan = grahamscan ;
