var myPromise = new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();

    request.open('GET', 'http://jsonplaceholder.typicode.com/comments/1');

    request.onload = function () {
        if (request.status === 200) {
            resolve(request.response);
        } else {
            reject('Aww, didn\'t work.');
        }
    };

    request.onerror = function () {
        reject('Aww, didn\'t work.');
    }

    request.send();
});

var sendEmail = function (emailAddress) {
    return new Promise(function (resolve, reject) {
        // Fake email sending.
        setTimeout(function () {
            resolve('Email sent to ' + emailAddress);
        }, 3000);
    });
};

myPromise
    .then(function (result) {
        return JSON.parse(result);
    })
    .then(function (parsedJSON) {
        return parsedJSON.email.toLowerCase();
    })
    .then(function (emailAddress) {
        return sendEmail(emailAddress)
    })
    .then(function (result) {
        console.log(result);
    }, function (err) {
        console.error(err);
    });

