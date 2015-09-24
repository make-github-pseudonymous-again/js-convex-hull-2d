

/**
 * Find the convex hull in O(n^4) by removing any point lying inside
 * a triangle of the set of points.
 */

const _n4 = function ( { col , pit } , points , take ) {

	const n = points.length;

	for ( let i = 0 ; i < n ; ++i ) {

		if ( !take[i] ) continue ;

		const a = points[i] ;

		for ( let j = 0 ; j < n ; ++j ) {

			if ( j === i || !take[j] ) continue ;

			const b = points[j];

			for ( let k = 0 ; k < n ; ++k ) {

				if ( k === i || k === j || !take[k] ) continue ;

				const c = points[k];

				if ( col( a, b, c ) ) continue ;

				for ( let x = 0 ; x < n ; ++x ) {

					if ( x === i || x === j || x === k || !take[x] ) continue ;

					if ( pit( points[x], a, b, c ) ) take[x] = false ;

				}

			}

		}

	}

} ;

exports._n4 = _n4 ;
