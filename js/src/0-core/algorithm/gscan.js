
/**
 * O(n)
 * Set must be prealably clocksorted.
 * @param {vertex set} set input set is set[i:j]
 * @param {offset} i inner left bound of interval to work with
 * @param {offset} j outer right bound of interval to work with
 */
const gscan = function ( crs , points , i , j , hull ) {

	hull.push( points[i] ) ;
	hull.push( points[i + 1] ) ;

	let p = 0 ;

	for ( let k = i + 2 ; k < j ; ++k ) {

		const u = points[k] ;

		while ( p >= 0 && crs( hull[p] , hull[p + 1] , u ) <= 0 ) {
			hull.pop( ) ;
			--p ;
		}

		hull.push( u ) ;
		++p ;

	}

} ;

exports.gscan = gscan ;
