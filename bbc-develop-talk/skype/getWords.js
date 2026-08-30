var fs = require('fs');

fs.readFile('words.txt', function (err, data) {
    if (err) {
        throw err;
    }

    function eliminateDuplicates(arr) {
      var i, len = arr.length, out = [], obj = {};

      for (i = 0; i < len; i++) {
        obj[arr[i]] = 0;
      }

      for (i in obj) {
        out.push(i);
      }

      return out;
    }

    var array = eliminateDuplicates(data.split('\n').sort());
    var stream = fs.createWriteStream('words-removed.txt');

    stream.once('open', function (fd) {
        for (i in array) {
            if ((array[i] !== '') || (array[i] === '\n')) {
                stream.write(array[i]);
            }
        }
    });
});
