
function* _filter ( take , set ) {

	const n = take.length ;

	for ( let i = 0 ; i < n ; ++i ) if ( take[i] ) yield set[i] ;

}
