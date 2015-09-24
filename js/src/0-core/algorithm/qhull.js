/**
 * From Wikipedia :
 *
 * QuickHull
 * Discovered independently in 1977 by W. Eddy and in 1978 by A. Bykat.
 * Just like the quicksort algorithm, it has the expected time complexity
 * of O(n log n), but may degenerate to Θ(nh) = O(n²) in the worst case.
 *
 * -> https://en.wikipedia.org/wiki/QuickHull
 *
 */
const qhull = function* ( crs , lex , set , i , j , u , v , w ) {

	let l = i - 1 ;
	let r = j - 1 ;
	let e = r ;

	let minL = 0 ; let minR = 0 ;
	let L = -1 ; let R = -1 ;

	// Triangle ( u , v , w ) partioning

	while ( l <= r ) {

		const x = set[l] ;

		const sin1 = crs( u , v , x ) ;

		if ( sin1 < 0 ) {

			// Note that if we allow (3 or more)-colinear vertices then we
			// have to make sure that we take only extreme points of these
			// as pivot. The only way this kind of scenario can occur is
			// when uv (vw) is parallel to these colinear points. Note that
			// we only need to compare the points lexicographically to
			// ensure we take only extreme points. Note also that if sin1 <
			// 0 and thus if sin1 === minL (minR) then L !== -1.
			//
			//     v
			//     |  \
			//     | .  x
			//     |    |
			//     |  . y <-- y should never be used as pivot
			//     |..  |
			//     |    z
			//     | ./
			//     u
			//
			//

			if ( sin1 < minL || ( sin1 === minL && lex( x , set[L] ) < 0 ) ) {
				L = l ;
				minL = sin1 ;
			}

			++l ;
			continue ;

		}

		const sin2 = crs( v , w , x ) ;

		if ( sin2 < 0 ) {

			const tmp = set[l] ;
			set[l] = set[r] ;
			set[r] = tmp ;

			// Same remark as above.

			if ( sin2 < minR || ( sin2 === minR && lex( x , set[R] ) < 0 ) ) {
				R = r;
				minR = sin2 ;
			}

			--r ;
			continue ;

		}

		// since all poins are above uw
		// all other points are inside triangle uvw

		// don't forget to update R
		// in case we move it to r
		if ( R === e ) R = r ;

		if ( l !== r ) {
			const tmp = set[e] ;
			set[e] = set[r] ;
			set[r] = tmp ;
		}

		const tmp = set[l] ;
		set[l] = set[e] ;
		set[e] = tmp ;

		--e ;
		--r ;

	}

	if ( L !== -1 ) {

		const tmp = set[L] ;
		set[L] = set[i] ;
		set[i] = tmp ;

		yield* qhull( crs , lex , set , i + 1 , l , u , tmp , v ) ;

	}

	yield v ;

	if ( R !== -1 ) {

		const tmp = set[R] ;
		set[R] = set[l] ;
		set[l] = tmp ;

		yield* qhull( crs , lex , set , l + 1 , e , v , tmp , w ) ;

	}

} ;

exports.qhull = qhull;
