/*
 * abbeyload.js
 * A music asset loader by Stuart Memo 
 */

(function (window, undefined) {
    var AbbeyLoad = (function () {

        var AbbeyLoad = function (files, callback) {
            this.context = new webkitAudioContext();
            this.files = files || {}; 
            this.filesLoaded = 0;
            this.numberOfFiles = 0;
            this.loadFiles(this.files, callback);
            this.returnObj = {};
        };

        AbbeyLoad.prototype.loadFile = function (fileKey, file, callback) {
            var request = new XMLHttpRequest();

            request.open('GET', file[fileKey], true);
            request.responseType = 'arraybuffer';

            var that = this;

            request.onload = function () {
                that.filesLoaded = that.filesLoaded + 1;
                that.context.decodeAudioData(request.response, function (decodedBuffer) {
                    that.returnObj[fileKey] = decodedBuffer;
                    if (that.filesLoaded === that.numberOfFiles) {
                        that.filesLoaded = 0;
                        that.numberOfFiles = 0;
                        callback(that.returnObj);
                    }
                });
            };

            request.send();
        };

        AbbeyLoad.prototype.loadFiles = function (files, callback) {
            var that = this;

            files.forEach(function (file, index) {
                for (var key in file) {
                    if (file.hasOwnProperty(key)) {
                        that.numberOfFiles++;
                        that.loadFile(key, file, callback);
                    }
                }
            });
        };

        return function (files, callback) {
            return new AbbeyLoad(files, callback);
        }
    })();
    window.AbbeyLoad = AbbeyLoad;
})(window);