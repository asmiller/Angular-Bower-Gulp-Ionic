var flo = require('fb-flo'),
    fs = require('fs'),

    server = flo('build/',
        {
            port: 8888,
            host: 'localhost',
            verbose: false,
            glob: ['**/*']
        },
        function (filepath, callback) {
            console.log(filepath);
            callback({
                contents: fs.readFileSync('build/' + filepath),
                reload: true
            });
        });

server.once('ready', function () {
    console.log('Ready for fb-flo.');
});