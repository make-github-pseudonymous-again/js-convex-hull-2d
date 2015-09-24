
/**
 * Find the convex hull in O(n^3) by keeping any point that
 * is not the vertex of an obtuse angle of the set of points.
 */

const _n3 = function ( { crs , dot } , points , take ) {

	const n = points.length ;

	for ( let i = 0 ; i < n ; ++i ) {

		const a = points[i];

		loopj : for ( let j = 0 ; j < n ; ++j ) {

			if ( j === i ) continue ;

			const b = points[j];

			for ( let k = 0 ; k < n ; ++k ){

				if ( k === i || k === j ) continue ;

				const c = points[k];

				const sin = crs( a, b, c ) ;

				if ( sin < 0 || ( sin === 0 && dot( a, b, c ) < 0 ) ) continue loopj ;

			}

			take[j] = true;

		}

	}

} ;

exports._n3 = _n3 ;
