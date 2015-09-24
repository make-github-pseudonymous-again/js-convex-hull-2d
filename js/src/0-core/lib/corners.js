
const corners = function ( { lex , colex } , points ) {

	const n = points.length ;

	const bottomleft = argmin( lex , points , 0 , n ) ;
	const a = points[bottomleft] ;
	points[bottomleft] = points[0] ;
	points[0] = a ;

	const rightbottom = argmin( colex , points , 1 , n ) ;
	const b = points[rightbottom] ;
	points[rightbottom] = points[1] ;
	points[1] = b ;

	const topright = argmax( lex , points , 2 , n ) ;
	const c = points[topright] ;
	points[topright] = points[2] ;
	points[2] = c ;

	const lefttop = argmax( colex , points , 3 , n ) ;
	const d = points[lefttop] ;
	points[lefttop] = points[3] ;
	points[3] = d ;

	//          d          c
	//                -----
	//           -----
	//      -----
	//     a
	//
	//                               b

	return [ a , b , c , d ] ;

} ;

exports.corners = corners ;
