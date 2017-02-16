"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

(function () {

	'use strict';

	var definition = function definition(exports, undefined) {
		var marked2$0 = [_filter].map(regeneratorRuntime.mark);

		/* js/src/0-core */
		/* js/src/0-core/algorithm */
		/* js/src/0-core/algorithm/_akltoussaint.js */

		/**
   * Implement Akl–Toussaint heuristic
   * -> https://en.wikipedia.org/wiki/Convex_hull_algorithms#Akl.E2.80.93Toussaint_heuristic
   */

		/* js/src/0-core/algorithm/_chan.js */

		/**
   * -> https://en.wikipedia.org/wiki/Chan%27s_algorithm
   */

		var _chan = function _chan(grahamscan) {

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

		exports._chan = _chan;

		/* js/src/0-core/algorithm/_dynamic.js */

		/**
   * -> https://en.wikipedia.org/wiki/Dynamic_convex_hull
   */

		/* js/src/0-core/algorithm/_incremental.js */

		/**
   * Incremental convex hull algorithm -- O(n log n)
   * Published in 1984 by Michael Kallay.
   */

		/* js/src/0-core/algorithm/_kirkpatrickseidel.js */

		/**
   * -> https://en.wikipedia.org/wiki/Kirkpatrick%E2%80%93Seidel_algorithm
   */

		/* js/src/0-core/algorithm/_n2.js */

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
   *
   * hypothesis : |set| >= 2
   * @param  {points} points   array of vertices
   * @param  {take} take inclusion array representation of the convex hull
   * initialized to true
   */

		var _n2 = function _n2(_ref, points, take) {
			var crs = _ref.crs;
			var dot = _ref.dot;

			var n = points.length;

			each: for (var j = 0; j < n; ++j) {

				// we need i to be different from j
				// to have a different from b
				// i is 1 if j is 0, i is 0 otherwise

				var i = +(j === 0);

				var a = points[i];
				var b = points[j];

				// we initiate u and v to a and
				// we will update them in a loop
				// over vertices of the vertex set
				// in the case we find a better candidate

				var u = a;
				var v = a;

				// upon completion of the loop
				// we will have u and v such that
				// there is no c in the vertex set such that sin ( a , b , c ) > 0
				// lying strictly on the right of the line through bu
				// there is no c in the vertex set such that sin ( a , b , c ) < 0
				// lying strictly on the left of the line through bv

				for (var k = 1; k < n; ++k) {

					// we can always skip k = 0 since i is 0 when j is not
					// we also skip the cases where c = b or c = a

					if (k === i || k === j) continue;

					var c = points[k];

					var sin1 = crs(a, b, c);

					// if c is on the left of ab

					//     |
					//     |
					// c   b
					//     |
					//     a

					if (sin1 > 0) {

						var sin2 = crs(b, u, c);

						// if c is on the right of bu

						// u  c|             u   |
						//   \ |               \ |
						//     b  otherwise      b
						//     |              c  |
						//     a                 a

						if (sin2 < 0) u = c;
					}

					// if c is on the right of ab

					//     |
					//     |
					//     b   c
					//     |
					//     a

					else if (sin1 < 0) {

							var sin2 = crs(b, v, c);

							// if c is on the left of bv

							// |c  v             |   v
							// | /               | /
							// b      otherwise  b
							// |                 |  c
							// a                 a

							if (sin2 > 0) v = c;
						}

						// when sin = 0 then we need to check if b
						// lies on a segment from a to c

						else {

								var cos = dot(a, b, c);

								// |                     |    |
								// c                     |    |
								// |                     |    |
								// b      otherwise      b or b
								// |                     c    |
								// a                     a    a
								// |                     |    c

								if (cos < 0) {
									take[j] = false;
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

				if (u !== a && v !== a && crs(u, v, b) <= 0) take[j] = false;
			}
		};

		exports._n2 = _n2;

		/* js/src/0-core/algorithm/_n3.js */

		/**
   * Find the convex hull in O(n^3) by keeping any point that
   * is not the vertex of an obtuse angle of the set of points.
   */

		var _n3 = function _n3(_ref2, points, take) {
			var crs = _ref2.crs;
			var dot = _ref2.dot;

			var n = points.length;

			for (var i = 0; i < n; ++i) {

				var a = points[i];

				loopj: for (var j = 0; j < n; ++j) {

					if (j === i) continue;

					var b = points[j];

					for (var k = 0; k < n; ++k) {

						if (k === i || k === j) continue;

						var c = points[k];

						var sin = crs(a, b, c);

						if (sin < 0 || sin === 0 && dot(a, b, c) < 0) continue loopj;
					}

					take[j] = true;
				}
			}
		};

		exports._n3 = _n3;

		/* js/src/0-core/algorithm/_n4.js */

		/**
   * Find the convex hull in O(n^4) by removing any point lying inside
   * a triangle of the set of points.
   */

		var _n4 = function _n4(_ref3, points, take) {
			var col = _ref3.col;
			var pit = _ref3.pit;

			var n = points.length;

			for (var i = 0; i < n; ++i) {

				if (!take[i]) continue;

				var a = points[i];

				for (var j = 0; j < n; ++j) {

					if (j === i || !take[j]) continue;

					var b = points[j];

					for (var k = 0; k < n; ++k) {

						if (k === i || k === j || !take[k]) continue;

						var c = points[k];

						if (col(a, b, c)) continue;

						for (var x = 0; x < n; ++x) {

							if (x === i || x === j || x === k || !take[x]) continue;

							if (pit(points[x], a, b, c)) take[x] = false;
						}
					}
				}
			}
		};

		exports._n4 = _n4;

		/* js/src/0-core/algorithm/_online.js */

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

		/* js/src/0-core/algorithm/gscan.js */

		/**
   * O(n)
   * Set must be prealably clocksorted.
   * @param {vertex set} set input set is set[i:j]
   * @param {offset} i inner left bound of interval to work with
   * @param {offset} j outer right bound of interval to work with
   */
		var gscan = function gscan(crs, points, i, j, hull) {

			hull.push(points[i]);
			hull.push(points[i + 1]);

			var p = 0;

			for (var k = i + 2; k < j; ++k) {

				var u = points[k];

				while (p >= 0 && crs(hull[p], hull[p + 1], u) <= 0) {
					hull.pop();
					--p;
				}

				hull.push(u);
				++p;
			}
		};

		exports.gscan = gscan;

		/* js/src/0-core/algorithm/gscanmono.js */

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
   * hypothesis : set is lexicographically ordered
   * ( in 2D : sorted according to x then y or y then x )
   */

		var gscanmono = function gscanmono(crs, points, i, j, lo) {

			var hi = [];

			hi.push(points[i]);
			hi.push(points[i + 1]);
			lo.push(points[i]);
			lo.push(points[i + 1]);

			var p = 0;
			var q = 0;

			for (var k = i + 2; k < j; ++k) {

				var u = points[k];

				while (p >= 0 && crs(hi[p], hi[p + 1], u) >= 0) {
					hi.pop();
					--p;
				}

				hi.push(u);
				++p;

				while (q >= 0 && crs(lo[q], lo[q + 1], u) <= 0) {
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

			for (var k = p; k > 0; --k) {
				lo.push(hi[k]);
			}
		};

		exports.gscanmono = gscanmono;

		/* js/src/0-core/algorithm/jmarch.js */

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
   */

		var jmarch = regeneratorRuntime.mark(function jmarch(crs, dot, points) {
			var n, origin, u, j, v, w, sin;
			return regeneratorRuntime.wrap(function jmarch$(context$3$0) {
				while (1) switch (context$3$0.prev = context$3$0.next) {
					case 0:
						n = points.length;
						origin = points[0];
						u = origin;
						j = 1;

					case 4:
						if (!true) {
							context$3$0.next = 15;
							break;
						}

						v = points[j];

						for (++j; j < n; ++j) {
							w = points[j];
							sin = crs(u, v, w);

							if (sin < 0 || sin === 0 && dot(u, v, w) < 0) v = w;
						}

						if (!(v === origin)) {
							context$3$0.next = 9;
							break;
						}

						return context$3$0.abrupt("break", 15);

					case 9:
						context$3$0.next = 11;
						return v;

					case 11:

						u = v;
						j = 0;

						context$3$0.next = 4;
						break;

					case 15:
					case "end":
						return context$3$0.stop();
				}
			}, jmarch, this);
		});

		exports.jmarch = jmarch;

		/* js/src/0-core/algorithm/qhull.js */
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
		var qhull = regeneratorRuntime.mark(function qhull(crs, lex, set, i, j, u, v, w) {
			var l, r, e, minL, minR, L, R, x, sin1, sin2, _tmp, _tmp2, tmp;

			return regeneratorRuntime.wrap(function qhull$(context$3$0) {
				while (1) switch (context$3$0.prev = context$3$0.next) {
					case 0:
						l = i - 1;
						r = j - 1;
						e = r;
						minL = 0;
						minR = 0;
						L = -1;
						R = -1;

					case 7:
						if (!(l <= r)) {
							context$3$0.next = 31;
							break;
						}

						x = set[l];
						sin1 = crs(u, v, x);

						if (!(sin1 < 0)) {
							context$3$0.next = 14;
							break;
						}

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

						if (sin1 < minL || sin1 === minL && lex(x, set[L]) < 0) {
							L = l;
							minL = sin1;
						}

						++l;
						return context$3$0.abrupt("continue", 7);

					case 14:
						sin2 = crs(v, w, x);

						if (!(sin2 < 0)) {
							context$3$0.next = 22;
							break;
						}

						_tmp = set[l];

						set[l] = set[r];
						set[r] = _tmp;

						// Same remark as above.

						if (sin2 < minR || sin2 === minR && lex(x, set[R]) < 0) {
							R = r;
							minR = sin2;
						}

						--r;
						return context$3$0.abrupt("continue", 7);

					case 22:

						// since all poins are above uw
						// all other points are inside triangle uvw

						// don't forget to update R
						// in case we move it to r
						if (R === e) R = r;

						if (l !== r) {
							_tmp2 = set[e];

							set[e] = set[r];
							set[r] = _tmp2;
						}

						tmp = set[l];

						set[l] = set[e];
						set[e] = tmp;

						--e;
						--r;

						context$3$0.next = 7;
						break;

					case 31:
						if (!(L !== -1)) {
							context$3$0.next = 36;
							break;
						}

						tmp = set[L];

						set[L] = set[i];
						set[i] = tmp;

						return context$3$0.delegateYield(qhull(crs, lex, set, i + 1, l, u, tmp, v), "t0", 36);

					case 36:
						context$3$0.next = 38;
						return v;

					case 38:
						if (!(R !== -1)) {
							context$3$0.next = 43;
							break;
						}

						tmp = set[R];

						set[R] = set[l];
						set[l] = tmp;

						return context$3$0.delegateYield(qhull(crs, lex, set, l + 1, e, v, tmp, w), "t1", 43);

					case 43:
					case "end":
						return context$3$0.stop();
				}
			}, qhull, this);
		});

		exports.qhull = qhull;

		/* js/src/0-core/lib */
		/* js/src/0-core/lib/_alloc.js */
		var _alloc = function _alloc(value) {

			return function (n) {

				var a = new Array(n);

				for (var i = 0; i < n; ++i) {
					a[i] = value;
				}return a;
			};
		};

		exports._alloc = _alloc;

		/* js/src/0-core/lib/_filter.js */

		function _filter(take, set) {
			var n, i;
			return regeneratorRuntime.wrap(function _filter$(context$3$0) {
				while (1) switch (context$3$0.prev = context$3$0.next) {
					case 0:
						n = take.length;
						i = 0;

					case 2:
						if (!(i < n)) {
							context$3$0.next = 9;
							break;
						}

						if (!take[i]) {
							context$3$0.next = 6;
							break;
						}

						context$3$0.next = 6;
						return set[i];

					case 6:
						++i;
						context$3$0.next = 2;
						break;

					case 9:
					case "end":
						return context$3$0.stop();
				}
			}, marked2$0[0], this);
		}

		/* js/src/0-core/lib/_from.js */

		var _from = function _from(findhull, alloc) {

			return function (space, points) {

				var take = alloc(points.length);

				findhull(space, points, take);

				return sort(space, [].concat(_toConsumableArray(_filter(take, points))));
			};
		};

		exports._from = _from;

		/* js/src/0-core/lib/array */
		/* js/src/0-core/lib/array/argmax.js */
		var argmax = function argmax(compare, a, i, j) {

			var k, key, tmp;

			if (i >= j) return undefined;

			k = i;
			key = a[k];

			for (++i; i < j; ++i) {

				tmp = a[i];

				if (compare(tmp, key) > 0) {
					k = i;
					key = tmp;
				}
			}

			return k;
		};

		/* js/src/0-core/lib/array/argmin.js */
		var argmin = function argmin(compare, a, i, j) {

			var k, key, tmp;

			if (i >= j) return undefined;

			k = i;
			key = a[k];

			for (++i; i < j; ++i) {

				tmp = a[i];

				if (compare(tmp, key) < 0) {
					k = i;
					key = tmp;
				}
			}

			return k;
		};

		/* js/src/0-core/lib/corners.js */

		var corners = function corners(_ref4, points) {
			var lex = _ref4.lex;
			var colex = _ref4.colex;

			var n = points.length;

			var bottomleft = argmin(lex, points, 0, n);
			var a = points[bottomleft];
			points[bottomleft] = points[0];
			points[0] = a;

			var rightbottom = argmin(colex, points, 1, n);
			var b = points[rightbottom];
			points[rightbottom] = points[1];
			points[1] = b;

			var topright = argmax(lex, points, 2, n);
			var c = points[topright];
			points[topright] = points[2];
			points[2] = c;

			var lefttop = argmax(colex, points, 3, n);
			var d = points[lefttop];
			points[lefttop] = points[3];
			points[3] = d;

			//          d          c
			//                -----
			//           -----
			//      -----
			//     a
			//
			//                               b

			return [a, b, c, d];
		};

		exports.corners = corners;

		/* js/src/0-core/lib/origin.js */

		var origin = function origin(_ref5, points) {
			var lex = _ref5.lex;

			var bottomleft = argmin(lex, points, 0, points.length);
			var a = points[bottomleft];
			points[bottomleft] = points[0];
			points[0] = a;

			//                -----
			//         -----
			//       ----  -- - -- - -- -
			//      -----  --- -- --
			//     ------
			//     a ---      ----
			//        --- - -- - -
			//          -- - -- -

			return a;
		};

		exports.origin = origin;

		/* js/src/0-core/lib/sort.js */

		var sort = function sort(space, points) {

			var a = origin(space, points);

			return [a].concat(points.slice(1).sort(space.ccw(space.crs, space.dot, a)));
		};

		exports.sort = sort;

		/* js/src/1-api */
		/* js/src/1-api/grahamscan.js */
		var grahamscan = function grahamscan(space, _points) {

			var points = sort(space, [].concat(_toConsumableArray(_points)));

			var hull = [];

			gscan(space.crs, points, 0, points.length, hull);

			return hull;
		};

		exports.grahamscan = grahamscan;

		/* js/src/1-api/grahamscanmono.js */
		var grahamscanmono = function grahamscanmono(space, _points) {

			var points = [].concat(_toConsumableArray(_points)).sort(space.lex);

			var hull = [];

			gscanmono(space.crs, points, 0, points.length, hull);

			return hull;
		};

		exports.grahamscanmono = grahamscanmono;

		/* js/src/1-api/jarvismarch.js */
		var jarvismarch = regeneratorRuntime.mark(function jarvismarch(space, _points) {
			var points;
			return regeneratorRuntime.wrap(function jarvismarch$(context$3$0) {
				while (1) switch (context$3$0.prev = context$3$0.next) {
					case 0:
						points = [].concat(_toConsumableArray(_points));
						context$3$0.next = 3;
						return origin(space, points);

					case 3:
						return context$3$0.delegateYield(jmarch(space.crs, space.dot, points), "t0", 4);

					case 4:
					case "end":
						return context$3$0.stop();
				}
			}, jarvismarch, this);
		});

		exports.jarvismarch = jarvismarch;

		/* js/src/1-api/n2.js */
		var n2 = _from(_n2, _alloc(true));
		exports.n2 = n2;

		/* js/src/1-api/n3.js */
		var n3 = _from(_n3, _alloc(false));
		exports.n3 = n3;

		/* js/src/1-api/n4.js */
		var n4 = _from(_n4, _alloc(true));
		exports.n4 = n4;

		/* js/src/1-api/quickhull.js */
		var quickhull = regeneratorRuntime.mark(function quickhull(space, _points) {
			var points, n, _corners, _corners2, a, b, c, d, crs, lex;

			return regeneratorRuntime.wrap(function quickhull$(context$3$0) {
				while (1) switch (context$3$0.prev = context$3$0.next) {
					case 0:
						points = [].concat(_toConsumableArray(_points));
						n = points.length;
						_corners = corners(space, points);
						_corners2 = _slicedToArray(_corners, 4);
						a = _corners2[0];
						b = _corners2[1];
						c = _corners2[2];
						d = _corners2[3];
						crs = space.crs;
						lex = space.lex;
						context$3$0.next = 12;
						return a;

					case 12:
						return context$3$0.delegateYield(qhull(crs, lex, points, 4, n, a, b, c), "t0", 13);

					case 13:
						context$3$0.next = 15;
						return c;

					case 15:
						return context$3$0.delegateYield(qhull(crs, lex, points, 4, n, c, d, a), "t1", 16);

					case 16:
					case "end":
						return context$3$0.stop();
				}
			}, quickhull, this);
		});

		exports.quickhull = quickhull;

		return exports;
	};
	if (typeof exports === "object") {
		definition(exports);
	} else if (typeof define === "function" && define.amd) {
		define("@aureooms/js-convex-hull-2d", [], function () {
			return definition({});
		});
	} else if (typeof window === "object" && typeof window.document === "object") {
		definition(window["convexhull2d"] = {});
	} else console.error("unable to detect type of module to define for @aureooms/js-convex-hull-2d");
})();

// Triangle ( u , v , w ) partioning