const grahamscanmono = function ( space , _points ) {

	const points = [ ..._points ].sort( space.lex ) ;

	const hull = [ ] ;

	gscanmono( space.crs , points , 0 , points.length , hull ) ;

	return hull ;

} ;

exports.grahamscanmono = grahamscanmono ;
