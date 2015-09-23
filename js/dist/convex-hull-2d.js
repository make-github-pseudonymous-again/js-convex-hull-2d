"use strict";

(function () {

	'use strict';

	var definition = function definition(exports, undefined) {

		/* js/src/akltoussaint.js */

		/**
   * Implement Akl–Toussaint heuristic
   * -> https://en.wikipedia.org/wiki/Convex_hull_algorithms#Akl.E2.80.93Toussaint_heuristic
   */

		/* js/src/chan.js */

		/**
   * -> https://en.wikipedia.org/wiki/Chan%27s_algorithm
   */

		var __chan__ = function __chan__(grahamscan) {

			var chan = function chan(m, set, i, j, hull) {

				var n, hulls, h, k;

				// Partition the input set in groups of size at most m. For each group
				// compute the convex hull with a O(n log n) algorithm.

				for (k = i; k + m <= j; k += m) {

					h = [];
					grahamscan(set, k, k + m, h);
					hulls.push(h);
				}

				if (k < j) {

					h = [];
					grahamscan(set, k, j, h);
					hulls.push(h);
				}

				// TODO ...
			};

			return chan;
		};

		exports.__chan__ = __chan__;

		/* js/src/chdynamic.js */

		/**
   * -> https://en.wikipedia.org/wiki/Dynamic_convex_hull
   */

		/* js/src/chincremental.js */

		/**
   * Incremental convex hull algorithm -- O(n log n)
   * Published in 1984 by Michael Kallay.
   */

		/* js/src/chn2.js */

		/**
   * Find the convex hull in O(n^2) by checking for every vertex b that there is
   * no triangle ( a , u , v ) that contains this point.
   *
   * Vertex a is an arbitraty vertex in the vertex set. Note that it must be
   * different from b. If b is not part of the convex hull of the vertex set then
   * there must exist a segment going from u to v of the vertex set such that we
   * can project b on this segment along direction ab. For this segment to exist
   * u and v cannot be on the same side of the line going through a and b. Thus
   * s( sin( a , b , u ) ) === - s( sin( a , b , v ) ). Also at least one of u
   * and v must be on the other side of the orthogonal to line ab, otherwise b
   * would be necessarily a vertex of the convex hull.
   *
   * Note that cossign is only required to break ties consistently in the case
   * where the data contains (3 or more)-colinear vertices.
   */

		var __chn2__ = function __chn2__(sinsign, cossign) {

			/**
    * hypothesis : |set| >= 2
    * @param  {set} set   array of vertices
    * @param  {hull} hull inclusion array representation of the convex hull
    * initialized to true
    */

			var chn2 = function chn2(set, hull) {

				var i, j, k, a, b, c, n, u, v, sin, cos;

				n = set.length;

				each: for (j = 0; j < n; ++j) {

					// we need i to be different from j
					// to have a different from b
					// i is 1 if j is 0, i is 0 otherwise

					i = +(j === 0);

					a = set[i];
					b = set[j];

					// we initiate u and v to a and
					// we will update them in a loop
					// over vertices of the vertex set
					// in the case we find a better candidate

					u = v = a;

					// upon completion of the loop
					// we will have u and v such that
					// there is no c in the vertex set such that sin ( a , b , c ) > 0
					// lying strictly on the right of the line through bu
					// there is no c in the vertex set such that sin ( a , b , c ) < 0
					// lying strictly on the left of the line through bv

					for (k = 1; k < n; ++k) {

						// we can always skip k = 0 since i is 0 when j is not
						// we also skip the cases where c = b or c = a

						if (k === i || k === j) continue;

						c = set[k];

						sin = sinsign(a, b, c);

						// if c is on the left of ab

						//     |
						//     |
						// c   b
						//     |
						//     a

						if (sin > 0) {

							sin = sinsign(b, u, c);

							// if c is on the right of bu

							// u  c|             u   |
							//   \ |               \ |
							//     b  otherwise      b
							//     |              c  |
							//     a                 a

							if (sin < 0) u = c;
						}

						// if c is on the right of ab

						//     |
						//     |
						//     b   c
						//     |
						//     a

						else if (sin < 0) {

								sin = sinsign(b, v, c);

								// if c is on the left of bv

								// |c  v             |   v
								// | /               | /
								// b      otherwise  b
								// |                 |  c
								// a                 a

								if (sin > 0) v = c;
							}

							// when sin = 0 then we need to check if b
							// lies on a segment from a to c

							else {

									cos = cossign(a, b, c);

									// |                     |    |
									// c                     |    |
									// |                     |    |
									// b      otherwise      b or b
									// |                     c    |
									// a                     a    a
									// |                     |    c

									if (cos < 0) {
										hull[j] = false;
										continue each;
									}
								}
					}

					// if we found candidates for both sides of line ab
					// and b is on the other side of uv relative to a
					// then b is part of the convex hull

					// u---|---v                 |   v
					//   \ | /                   b /
					//     b      otherwise      |
					//     |                   / |
					//     a                 u   a

					if (u !== a && v !== a && sinsign(u, v, b) <= 0) {
						hull[j] = false;
					}
				}
			};

			return chn2;
		};

		exports.__chn2__ = __chn2__;

		/* js/src/chn3.js */

		/**
   * Find the convex hull in O(n^3) by keeping any point that
   * is not the vertex of an obtuse angle of the set of points.
   */

		var __chn3__ = function __chn3__(sinsign, cossign) {

			var chn3 = function chn3(set, hull) {

				var i, j, k, a, b, c, len, sin;

				len = set.length;

				for (i = 0; i < len; ++i) {

					a = set[i];

					loopj: for (j = 0; j < len; ++j) {

						if (j === i) {
							continue;
						}

						b = set[j];

						for (k = 0; k < len; ++k) {

							if (k === i || k === j) {
								continue;
							}

							c = set[k];

							sin = sinsign(a, b, c);

							if (sin < 0 || sin === 0 && cossign(a, b, c) < 0) {
								continue loopj;
							}
						}

						hull[j] = true;
					}
				}
			};

			return chn3;
		};

		exports.__chn3__ = __chn3__;

		/* js/src/chn4.js */

		/**
   * Find the convex hull in O(n^4) by removing any point lying inside
   * a triangle of the set of points.
   */

		var __chn4__ = function __chn4__(colinear, pit) {

			var chn4 = function chn4(set, hull) {

				var i, j, k, a, b, c, x, len;

				len = set.length;

				for (i = 0; i < len; ++i) {

					if (!hull[i]) {
						continue;
					}

					a = set[i];

					for (j = 0; j < len; ++j) {

						if (j === i || !hull[j]) {
							continue;
						}

						b = set[j];

						for (k = 0; k < len; ++k) {

							if (k === i || k === j || !hull[k]) {
								continue;
							}

							c = set[k];

							if (colinear(a, b, c)) {
								continue;
							}

							for (x = 0; x < len; ++x) {

								if (x === i || x === j || x === k || !hull[x]) {
									continue;
								}

								if (pit(set[x], a, b, c)) {
									hull[x] = false;
								}
							}
						}
					}
				}
			};

			return chn4;
		};

		exports.__chn4__ = __chn4__;

		/* js/src/chonline.js */

		var binary_ext_sin_search = function binary_ext_sin_search(ch, l, r, o, p) {
			var i = o;
			while (l < r) {
				i = Math.floor((r - l) / 2) + l;
				var p_i = i - 1 < 0 ? ch.length - 1 : i - 1;
				var n_i = (i + 1) % ch.length;
				var cos_m = geo.cos(ch[o], p, ch[i]);
				var cos_l = geo.cos(ch[o], p, ch[p_i]);
				var cos_r = geo.cos(ch[o], p, ch[n_i]);

				if (cos_m < cos_l) {
					if (cos_m < cos_r) return i;else if (cos_m == cos_r && dist(p, ch[i]) < dist(p, ch[n_i])) return i;else l = i + 1;
				} else if (cos_m == cos_l && cos_m < cos_r && dist(p, ch[i]) < dist(p, ch[p_i])) return i;else r = i;
			}

			return i;
		};

		var ch_online_add = function ch_online_add(ch, p) {
			if (ch.length == 0) {
				ch.push(p);
				return;
			}
			if (ch.length == 1) {
				if (p.x < ch[0] || p.x == ch[0] && p.y < ch[0].y) ch.splice(0, 0, p);else ch.push(p);
				return;
			}
			if (ch.length == 2) {
				if (p.x < ch[0] || p.x == ch[0] && p.y < ch[0].y) ch.splice(0, 0, p);else if (sin_sign(ch[0], ch[1], p) > 0) ch.splice(1, 0, p);else ch.push(p);
				return;
			}

			var l = 1,
			    r = ch.length;
			var i = Math.floor((r - l) / 2) + l;
			var which = sin_sign(ch[0], ch[1], p) < 0 ? 1 : -1;
			while (l < r) {
				if (which * sin_sign(ch[0], p, ch[i]) > 0) {
					if (which * sin_sign(ch[0], p, ch[(i + 1) % ch.length]) < 0) {
						++i;
						break;
					} else l = i + 1;
				} else {
					if (which * sin_sign(ch[0], p, ch[i - 1]) > 0) break;else r = i;
				}
				i = Math.floor((r - l) / 2) + l;
			}

			var j = binary_ext_sin_search(ch, 0, i, 0, p);
			var k = binary_ext_sin_search(ch, i, ch.length, 0, p);

			if (k == 0) k = [j, j = k][0];

			if (sin_sign(ch[j], ch[k], p) >= 0) ch.splice(j + 1, k - j - 1, p);else {
				ch.splice(k + 1, ch.length - k - 1, p);
				ch.splice(0, j);
			}
		};

		var ch_online_rm = function ch_online_rm(set, p, ch) {};

		exports.ch_online_add = ch_online_add;
		exports.ch_online_rm = ch_online_rm;

		/* js/src/grahamscan.js */

		var __grahamscan__ = function __grahamscan__(sinsign) {

			/**
    * O(n)
    * Set must be prealably clocksorted.
    * @param {vertex set} set input set is set[i:j]
    * @param {offset} i inner left bound of interval to work with
    * @param {offset} j outer right bound of interval to work with
    */
			var grahamscan = function grahamscan(set, i, j, hull) {

				var p, k, u;

				hull.push(set[i]);
				hull.push(set[i + 1]);

				p = 0;

				for (k = i + 2; k < j; ++k) {

					u = set[k];

					while (p >= 0 && sinsign(hull[p], hull[p + 1], u) <= 0) {
						hull.pop();
						--p;
					}

					hull.push(u);
					++p;
				}
			};

			return grahamscan;
		};

		exports.__grahamscan__ = __grahamscan__;

		/* js/src/grahamscanmono.js */

		/**
   * This method is O(n), the only requirement is that the
   * set of vertices should be prealably sorted.
   *
   *
   * From Wikipedia :
   *
   * Monotone chain aka Andrew's algorithm — O(n log n)
   * Published in 1979 by A. M. Andrew. The algorithm can be seen as a variant of
   * Graham scan which sorts the points lexicographically by their coordinates.
   * When the input is already sorted, the algorithm takes O(n) time.
   *
   * -> https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain
   *
   */

		var __grahamscanmono__ = function __grahamscanmono__(sinsign) {

			/**
    * hypothesis : set is lexicographically ordered
    * ( in 2D : sorted according to x then y or y then x )
    * @param  {[type]} set  [description]
    * @param  {[type]} hull [description]
    * @return {[type]}      [description]
    */

			var grahamscanmono = function grahamscanmono(set, i, j, lo) {

				var k, n, hi, u, p, q;

				n = set.length;
				hi = [];

				hi.push(set[i]);
				hi.push(set[i + 1]);
				lo.push(set[i]);
				lo.push(set[i + 1]);

				p = 0;
				q = 0;

				for (k = i + 2; k < j; ++k) {

					u = set[k];

					while (p >= 0 && sinsign(hi[p], hi[p + 1], u) >= 0) {
						hi.pop();
						--p;
					}

					hi.push(u);
					++p;

					while (q >= 0 && sinsign(lo[q], lo[q + 1], u) <= 0) {
						lo.pop();
						--q;
					}

					lo.push(u);
					++q;
				}

				// enumerate hull vertices
				// counter clock wise, in fact ccw if set is monotone *increasing*,
				// cw otherwise
				//
				//                 * - < - * - < - *
				//                /                 \
				// hi[0] = lo[0] *                   * hi[p + 1] = lo[q + 1]
				//                \                 /
				//                 * - > - * - > - *
				//
				// Note that the first and last elements of hi are droped since
				// they are already in lo

				for (i = p; i > 0; --i) {
					lo.push(hi[i]);
				}
			};

			return grahamscanmono;
		};

		exports.__grahamscanmono__ = __grahamscanmono__;

		/* js/src/jarvismarch.js */

		/**
   * From Wikipedia :
   *
   * Gift wrapping aka Jarvis march — O(nh)
   * One of the simplest (although not the most time efficient in the worst case)
   * planar algorithms. Discovered independently by Chand & Kapur in 1970 and
   * R. A. Jarvis in 1973. It has O(nh) time complexity, where n is the number of
   * points in the set, and h is the number of points in the hull. In the worst
   * case the complexity is Θ(n^2).
   *
   * -> https://en.wikipedia.org/wiki/Gift_wrapping_algorithm
   *
   */
		var __jarvismarch__ = function __jarvismarch__(sinsign, cossign) {

			/**
    * The idea is to wrap the set of points. The technique is the following.
    *
    * You first select a vertex for which you are sure that it is part of the
    * convex hull. For example you can choose the vertex that is first in
    * lexicographical order over the coordinates in two dimensions, i.e. find
    * all vertices that have the smallest x coordinate and if there is more
    * than one then keep only the one with the smallest y coordinate.
    *
    * From this selected vertex you compute the next one. The next one is
    * defined as the one that comes after in clockwise order.
    *
    *    |
    *    |     In this example u is the selected vertex and v the next one.
    *    |     v is such that there is no vertex w with sin( u , v , w ) < 0
    *    u     i.e. lying on the right of uv because otherwise u was not
    *     \    part of the hull in the first place.
    *      v
    *
    * To solve the problem completely we simply iterate over all successive uv
    * pairs ( we replace u with v after each iteration ). We stop when we made
    * the complete loop around the set of vertices, i.e when the next v is the
    * very first u.
    *
    *
    * Hypotheses:
    *   - |set| >= 2
    *   - set[0] must be part of the hull ( if |set| = 2 this is the
    *   only thing you have to do )
    *
    * @param {array} set is the input vertex set
    * @param {array} hull is the ouput hull, we omit to add set[0] voluntarily
    */

			var jarvismarch = function jarvismarch(set, hull) {

				var n, j, u, v, w, origin, sin;

				n = set.length;

				origin = u = set[0];

				j = 1;

				while (true) {

					v = set[j];

					for (++j; j < n; ++j) {

						w = set[j];

						sin = sinsign(u, v, w);

						if (sin < 0 || sin === 0 && cossign(u, v, w) < 0) v = w;
					}

					if (v === origin) break;

					hull.push(v);

					u = v;
					j = 0;
				}
			};

			return jarvismarch;
		};

		exports.__jarvismarch__ = __jarvismarch__;

		/* js/src/kirkpatrickseidel.js */

		/**
   * -> https://en.wikipedia.org/wiki/Kirkpatrick%E2%80%93Seidel_algorithm
   */

		/* js/src/quickhull.js */
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
		var __quickhull__ = function __quickhull__(sinsign, compare) {

			var quickhull = function quickhull(set, i, j, u, v, w, hull) {

				var c, sin, minL, minR, L, R, tmp, l, r, e, x;

				l = i - 1;
				r = j - 1;
				e = r;

				minL = minR = 0;
				L = R = -1;

				// Triangle ( u , v , w ) partioning

				while (l <= r) {

					x = set[l];

					sin = sinsign(u, v, x);

					if (sin < 0) {

						// Note that if we allow (3 or more)-colinear vertices then we
						// have to make sure that we take only extreme points of these
						// as pivot. The only way this kind of scenario can occur is
						// when uv (vw) is parallel to these colinear points. Note that
						// we only need to compare the points lexicographically to
						// ensure we take only extreme points. Note also that if sin <
						// 0 and thus if sin === minL (minR) then L !== -1.
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

						if (sin < minL || sin === minL && compare(x, set[L]) < 0) {
							L = l;
							minL = sin;
						}

						++l;
						continue;
					}

					sin = sinsign(v, w, x);

					if (sin < 0) {

						tmp = set[l];
						set[l] = set[r];
						set[r] = tmp;

						// Same remark as above.

						if (sin < minR || sin === minR && compare(x, set[R]) < 0) {
							R = r;
							minR = sin;
						}

						--r;
						continue;
					}

					// since all poins are above uw
					// all other points are inside triangle uvw

					// don't forget to update R
					// in case we move it to r
					if (R === e) R = r;

					if (l !== r) {
						tmp = set[e];
						set[e] = set[r];
						set[r] = tmp;
					}

					tmp = set[l];
					set[l] = set[e];
					set[e] = tmp;

					--e;
					--r;
				}

				if (L !== -1) {

					tmp = set[L];
					set[L] = set[i];
					set[i] = tmp;

					quickhull(set, i + 1, l, u, tmp, v, hull);
				}

				hull.push(v);

				if (R !== -1) {

					tmp = set[R];
					set[R] = set[l];
					set[l] = tmp;

					quickhull(set, l + 1, e, v, tmp, w, hull);
				}
			};

			return quickhull;
		};

		exports.__quickhull__ = __quickhull__;

		return exports;
	};
	if (typeof exports === "object") {
		definition(exports);
	} else if (typeof define === "function" && define.amd) {
		define("aureooms-js-convex-hull-2d", [], function () {
			return definition({});
		});
	} else if (typeof window === "object" && typeof window.document === "object") {
		definition(window["convexhull2d"] = {});
	} else console.error("unable to detect type of module to define for aureooms-js-convex-hull-2d");
})();