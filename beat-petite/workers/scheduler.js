self.addEventListener('message', function (e) {
    'use strict';

    (function looper () {
        self.postMessage('go');
        setTimeout(looper, 100);
    })();
}, false);