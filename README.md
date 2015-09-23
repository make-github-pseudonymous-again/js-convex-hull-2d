[js-convex-hull-2d](http://aureooms.github.io/js-convex-hull-2d)
==

Computational geometry code bricks for JavaScript. Parents are
[aureooms/js-algo](https://github.com/aureooms/js-algo)
and
[aureooms/js-data-structures](https://github.com/aureooms/js-data-structures).

```js
vcross( vsub( b , a ) , vsub( c , a ) ) ;
```

[![NPM license](http://img.shields.io/npm/l/aureooms-js-convex-hull-2d.svg?style=flat)](https://raw.githubusercontent.com/aureooms/js-convex-hull-2d/master/LICENSE)
[![NPM version](http://img.shields.io/npm/v/aureooms-js-convex-hull-2d.svg?style=flat)](https://www.npmjs.org/package/aureooms-js-convex-hull-2d)
[![Bower version](http://img.shields.io/bower/v/aureooms-js-convex-hull-2d.svg?style=flat)](http://bower.io/search/?q=aureooms-js-convex-hull-2d)
[![Build Status](http://img.shields.io/travis/aureooms/js-convex-hull-2d.svg?style=flat)](https://travis-ci.org/aureooms/js-convex-hull-2d)
[![Coverage Status](http://img.shields.io/coveralls/aureooms/js-convex-hull-2d.svg?style=flat)](https://coveralls.io/r/aureooms/js-convex-hull-2d)
[![Dependencies Status](http://img.shields.io/david/aureooms/js-convex-hull-2d.svg?style=flat)](https://david-dm.org/aureooms/js-convex-hull-2d#info=dependencies)
[![devDependencies Status](http://img.shields.io/david/dev/aureooms/js-convex-hull-2d.svg?style=flat)](https://david-dm.org/aureooms/js-convex-hull-2d#info=devDependencies)
[![Code Climate](http://img.shields.io/codeclimate/github/aureooms/js-convex-hull-2d.svg?style=flat)](https://codeclimate.com/github/aureooms/js-convex-hull-2d)
[![NPM downloads per month](http://img.shields.io/npm/dm/aureooms-js-convex-hull-2d.svg?style=flat)](https://www.npmjs.org/package/aureooms-js-convex-hull-2d)
[![GitHub issues](http://img.shields.io/github/issues/aureooms/js-convex-hull-2d.svg?style=flat)](https://github.com/aureooms/js-convex-hull-2d/issues)
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
jspm install npm:aureooms-js-convex-hull-2d
```
### duo
No install step needed for duo!

### component
```terminal
component install aureooms/js-convex-hull-2d
```

### bower
```terminal
bower install aureooms-js-convex-hull-2d
```

### ender
```terminal
ender add aureooms-js-convex-hull-2d
```

### jam
```terminal
jam install aureooms-js-convex-hull-2d
```

### spm
```terminal
spm install aureooms-js-convex-hull-2d --save
```

### npm
```terminal
npm install aureooms-js-convex-hull-2d --save
```

## Require
### jspm
```js
let cg = require( "github:aureooms/js-convex-hull-2d" ) ;
// or
import cg from 'aureooms-js-convex-hull-2d' ;
```
### duo
```js
let cg = require( "aureooms/js-convex-hull-2d" ) ;
```

### component, ender, spm, npm
```js
let cg = require( "aureooms-js-convex-hull-2d" ) ;
```

### bower
The script tag exposes the global variable `cg`.
```html
<script src="bower_components/aureooms-js-convex-hull-2d/js/dist/cg.min.js"></script>
```
Alternatively, you can use any tool mentioned [here](http://bower.io/docs/tools/).

### jam
```js
require( [ "aureooms-js-convex-hull-2d" ] , function ( cg ) { ... } ) ;
```

## Reference

### Information
  - http://homepages.ulb.ac.be/~slanger/cg/
  - http://homepages.ulb.ac.be/~slanger/cg/lenertz/
  - http://homepages.ulb.ac.be/~slanger/cg/P/PopsAndPopturns/projetGeom.html
  - http://homepages.ulb.ac.be/~slanger/cg/P/WSPD/index.html
  - http://homepages.ulb.ac.be/~slanger/cg/Swimmer/one_swimmer.html
  - http://homepages.ulb.ac.be/~slanger/cg/hsaureooms/def.html
  - http://fremycompany.com/compugem
  - http://www-cgrl.cs.mcgill.ca/~godfried/teaching/cg-projects/97/Ian/cutting_ears.html
  - http://www.cs.tufts.edu/comp/260/lectures.html
  - http://www.toptal.com/python/computational-geometry-in-python-from-theory-to-implementation

### Code
  - https://github.com/crm416/point-location
  - https://github.com/ironwallaby/delaunay
  - https://github.com/gorhill/Javascript-Voronoi
  - https://github.com/mikolalysenko/convex-hull
  - https://github.com/mourner/rbush
  - https://github.com/mikolalysenko/delaunay-triangulate
  - https://github.com/mikolalysenko/incremental-delaunay
  - https://github.com/mikolalysenko/box-intersect-benchmark

***( forked from [js-cg](https://github.com/aureooms/js-cg) )***
