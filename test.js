var spawn = require('child_process').spawn;

async function alma() {
const p = new Promise((resolve, reject) => {
var child = spawn('eval', ["ls"], {
    env: process.env,
    shell: true
  });
  child.stdout.on("data", (data) => {
    var s = String( data );
    buffer = buffer.concat( s.split( "\n" ) );

    process.stdout.write( "BUFFERPACK: [" + buffer.length + "]\n" );
    buffer.forEach( function( s ) {
        process.stdout.write( "BUFFER PACK: [" + s + "]\n" );
    } );

    var match = buffer[buffer.length - 1].match( /^Protect/ ); // last line
    if ( match ) {

        buffer.pop();                       // remove last line we dont need
        buffer = buffer.filter( n => n );   // clean empty lines

        buffer.forEach( function( s ) { process.stdout.write( "INSIDE: [" + s + "]\n" ); } );
        
        bufferReady = true;

    }
  })
  child.stderr.on("data", (data) => {
    console.log("data: " + data);
    var s = String( data );
    buffer = buffer.concat( s.split( "\n" ) );

    process.stdout.write( "BUFFERPACK: [" + buffer.length + "]\n" );
    buffer.forEach( function( s ) {
        process.stdout.write( "BUFFER PACK: [" + s + "]\n" );
    } );

    var match = buffer[buffer.length - 1].match( /^Protect/ ); // last line
    if ( match ) {

        buffer.pop();                       // remove last line we dont need
        buffer = buffer.filter( n => n );   // clean empty lines

        buffer.forEach( function( s ) { process.stdout.write( "INSIDE: [" + s + "]\n" ); } );
        
        bufferReady = true;

    }
  })
  child.on("exit", () => {
    resolve()
  });
})
await p;
}

alma();