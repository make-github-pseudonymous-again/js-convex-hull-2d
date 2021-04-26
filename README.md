[js-convex-hull-2d](http://make-github-pseudonymous-again.github.io/js-convex-hull-2d)
==

Convex hull algorithms in two dimensions. Parent is
[aureooms/js-cg](https://github.com/aureooms/js-cg).

```js
//                 * - < - * - < - *
//                /                 \
// hi[0] = lo[0] *                   * hi[p + 1] = lo[q + 1]
//                \                 /
//                 * - > - * - > - *
```

[![License](https://img.shields.io/github/license/aureooms/js-convex-hull-2d.svg?style=flat)](https://raw.githubusercontent.com/aureooms/js-convex-hull-2d/master/LICENSE)
[![NPM version](https://img.shields.io/npm/v/@aureooms/js-convex-hull-2d.svg?style=flat)](https://www.npmjs.org/package/@aureooms/js-convex-hull-2d)
[![Bower version](https://img.shields.io/bower/v/@aureooms/js-convex-hull-2d.svg?style=flat)](http://bower.io/search/?q=@aureooms/js-convex-hull-2d)
[![Build Status](https://img.shields.io/travis/aureooms/js-convex-hull-2d.svg?style=flat)](https://travis-ci.org/aureooms/js-convex-hull-2d)
[![Coverage Status](https://img.shields.io/coveralls/aureooms/js-convex-hull-2d.svg?style=flat)](https://coveralls.io/r/aureooms/js-convex-hull-2d)
[![Dependencies Status](https://img.shields.io/david/aureooms/js-convex-hull-2d.svg?style=flat)](https://david-dm.org/aureooms/js-convex-hull-2d#info=dependencies)
[![devDependencies Status](https://img.shields.io/david/dev/aureooms/js-convex-hull-2d.svg?style=flat)](https://david-dm.org/aureooms/js-convex-hull-2d#info=devDependencies)
[![Code Climate](https://img.shields.io/codeclimate/github/aureooms/js-convex-hull-2d.svg?style=flat)](https://codeclimate.com/github/aureooms/js-convex-hull-2d)
[![NPM downloads per month](https://img.shields.io/npm/dm/@aureooms/js-convex-hull-2d.svg?style=flat)](https://www.npmjs.org/package/@aureooms/js-convex-hull-2d)
[![GitHub issues](https://img.shields.io/github/issues/aureooms/js-convex-hull-2d.svg?style=flat)](https://github.com/aureooms/js-convex-hull-2d/issues)
[![Inline docs](http://inch-ci.org/github/aureooms/js-convex-hull-2d.svg?branch=master&style=shields)](http://inch-ci.org/github/aureooms/js-convex-hull-2d)

Can be managed through [jspm](https://github.com/jspm/jspm-cli),
[duo](https://github.com/duojs/duo),
[component](https://github.com/componentjs/component),
[bower](https://github.com/bower/bower),
[ender](https://github.com/ender-js/Ender),
[jam](https://github.com/caolan/jam),
[spm](https://github.com/spmjs/spm),
and [npm](https://github.com/npm/npm).

## Install

### jspm
```terminal
jspm install github:aureooms/js-convex-hull-2d
# or
jspm install npm:@aureooms/js-convex-hull-2d
```
### duo
No install step needed for duo!

### component
```terminal
component install aureooms/js-convex-hull-2d
```

### bower
```terminal
bower install @aureooms/js-convex-hull-2d
```

### ender
```terminal
ender add @aureooms/js-convex-hull-2d
```

### jam
```terminal
jam install @aureooms/js-convex-hull-2d
```

### spm
```terminal
spm install @aureooms/js-convex-hull-2d --save
```

### npm
```terminal
npm install @aureooms/js-convex-hull-2d --save
```

## Require
### jspm
```js
let convexhull2d = require( "github:aureooms/js-convex-hull-2d" ) ;
// or
import convexhull2d from '@aureooms/js-convex-hull-2d' ;
```
### duo
```js
let convexhull2d = require( "aureooms/js-convex-hull-2d" ) ;
```

### component, ender, spm, npm
```js
let convexhull2d = require( "@aureooms/js-convex-hull-2d" ) ;
```

### bower
The script tag exposes the global variable `convexhull2d`.
```html
<script src="bower_components/@aureooms/js-convex-hull-2d/js/dist/convex-hull-2d.min.js"></script>
```
Alternatively, you can use any tool mentioned [here](http://bower.io/docs/tools/).

### jam
```js
require( [ "@aureooms/js-convex-hull-2d" ] , function ( convexhull2d ) { ... } ) ;
```

## Space

The 2^d space system object must have the following static methods:

```js
space.crs( a , b , c ) ; // compute the cross product of ab and bc
space.dot( a , b , c ) ; // compute the dot product of ab and bc
space.col( a , b , c ) ; // test whether 3 points are colinear
space.pit( x , a , b , c ) ; // test whether x is in triangle abc
space.lex( a , b ) ; // > 0 if a comes before b in lex order
space.colex( a , b ) ; // > 0 if a comes before b in colex order
space.ccw( crs , dot , x ) ; // defines a counter clockwise ordering around x
```

## Reference

  - https://github.com/mikolalysenko/convex-hull
