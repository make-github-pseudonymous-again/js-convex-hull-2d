
const origin = function ( { lex } , points ) {

	const bottomleft = argmin( lex , points , 0 , points.length ) ;
	const a = points[bottomleft] ;
	points[bottomleft] = points[0] ;
	points[0] = a ;

	//                -----
	//         -----
	//       ----  -- - -- - -- -
	//      -----  --- -- --
	//     ------
	//     a ---      ----
	//        --- - -- - -
	//          -- - -- -

	return a ;

} ;

exports.origin = origin ;
