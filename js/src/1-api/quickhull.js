const quickhull = function* ( space , _points ) {

	const points = [ ..._points ] ;
	const n = points.length ;

	const [ a , b , c , d ] = corners( space , points ) ;

	const { crs , lex } = space ;

	yield a ;
	yield* qhull( crs , lex , points , 4 , n , a , b , c ) ;
	yield c ;
	yield* qhull( crs , lex , points , 4 , n , c , d , a ) ;

} ;

exports.quickhull = quickhull ;
