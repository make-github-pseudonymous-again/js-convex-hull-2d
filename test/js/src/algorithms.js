
var ch = convexhull2d ;
var cg = require( '@aureooms/js-cg' ) ;
var compare = require( "@aureooms/js-compare" ) ;
var functools = require( "@aureooms/js-functools" ) ;
var itertools = require( "@aureooms/js-itertools" ) ;

var lex = cg.bottomleft( compare.increasing ) ;
var colex = cg.rightbottom( compare.increasing ) ;
var col = cg.__colinear__( cg.sinsign );
var ccwc = cg.__ccwc__( cg.sinsign );
var pit = cg.__pit__( ccwc );

var space = {
	crs : cg.sinsign ,
	dot : cg.cossign ,
	lex : lex ,
	colex : colex ,
	col : col ,
	pit : pit ,
	ccw : cg.__counterclockwise__
} ;

function dataset ( name ) {

	var points ;

	points = require( "../data/" + name + ".js" ) ;

	return [
		name ,
		points.data.slice( ) ,
		points.ch.slice( )
	] ;

}

function one ( algoname , algo , dataname , data , expected ) {

	test( algoname + " > " + dataname , function ( ) {
		var out = itertools.list( algo( space , data ) ) ;
		deepEqual( out , expected , JSON.stringify( ) ) ;
	} ) ;

}

itertools.exhaust( itertools.starmap(
	one , itertools.map(
		functools.compose( [ itertools.list , itertools.chain ] ) ,
		itertools.product( [
[
	[ "n4" , ch.n4 ] ,
	[ "n3" , ch.n3 ] ,
	[ "n2" , ch.n2 ] ,
	[ "graham scan" , ch.grahamscan ] ,
	[ "monotonic graham scan" , ch.grahamscanmono ] ,
	[ "jarvis march" , ch.jarvismarch ] ,
	[ "quickhull" , ch.quickhull ]
] ,

[
	dataset( "rectangular-grid" ) ,
	dataset( "octagon" )
]

] , 1 )
		)
	)
) ;
