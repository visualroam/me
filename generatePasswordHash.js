var readline = require('readline');
var Writable = require('stream').Writable;
const bcrypt = require('bcrypt');
const saltRounds = 10;

var mutableStdout = new Writable({
    write: function(chunk, encoding, callback) {
        if (!this.muted)
            process.stdout.write(chunk, encoding);
        callback();
    }
});

mutableStdout.muted = false;

var rl = readline.createInterface({
    input: process.stdin,
    output: mutableStdout,
    terminal: true
});

rl.question('Password: ', function(password) {
    bcrypt.hash(password, saltRounds, (err, hash) => {
        console.log('\nPassword is "' + hash + '"');
        console.log("\nRandom Secret '" + require('crypto').randomBytes(64).toString('hex') + '"')
        rl.close();
    });
});

mutableStdout.muted = true;