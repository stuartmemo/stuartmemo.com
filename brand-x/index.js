// Load in dependencies
var fs = require('fs');
var rimraf = require('rimraf');
var Spritesmith = require('spritesmith');
var imagemin = require('imagemin');
var imageminPngquant = require('imagemin-pngquant');
var gm = require('gm');

const pad = (n, width, z) => {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

const cropImages = (imagesToCrop, callback) => {
    rimraf.sync(__dirname + '/cropped/*');

    const totalImagesToCrop = imagesToCrop.length;
    var totalCropped = 0;

    imagesToCrop.forEach((imageToCrop, index) => {
        gm(imageToCrop)
            .crop(1030, 590, 400, 290)
            .scale(515, 295)
            .write(__dirname + '/cropped/cropped' + pad(index, 3) + '.png', err => {
                if (err) {
                    console.log(err);
                }

                totalCropped++;

                if (totalCropped === totalImagesToCrop) {
                    callback();
                }
            });
    })
};

const readFiles = (directory) => {
    let imageArray = [];

    fs.readdirSync(__dirname + directory).forEach(fileName => {
        if (fileName.substr(-4) === '.png') {
            imageArray.push(__dirname + directory + fileName);
        }
    });

    return imageArray;
};

const squishImages = (imageToSquish) => {
    imagemin([], __dirname, {
        plugins: [
            imageminPngquant({quality: '65-80'})
        ]
    }).then(files => {
        console.log(files);
    })

    return imagesToSquish;
};

const spriteImages = (imagesToSprite) => {
    rimraf.sync(__dirname + '/output/*');

    console.log('Spriting', imagesToSprite.length, 'images.');

    Spritesmith.run({
        src: imagesToSprite,
        algorithm: 'top-down',
        algorithmOpts: {
            sort: false
        }
    }, (err, result) => {
        if (err) {
            throw err;
        }

        const spriteLocation = __dirname + '/output/logo-sprite.png';

        console.log('Writing to', spriteLocation);
        fs.writeFileSync(spriteLocation, result.image);

        result.coordinates, result.properties; // Coordinates and properties
    });
};

// let filesToSprite;
// cropImages(readFiles('/primary-logo/'), () => {
//     console.log('All images cropped');
//     spriteImages(readFiles('/cropped/'));
// });

 spriteImages(readFiles('/frames/'));
