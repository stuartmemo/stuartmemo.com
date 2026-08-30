/**
 * Web Audio Mellotron by Stuart Memo
 */
var bufferBoxes = {},
    volume = tsw.gain(0.5),
    booster = tsw.gain(5),
    usingChoir = true,
    loadingEl = document.querySelector('.loading'),
    dolbySupported = Dolby.checkDDPlus(),
    gains = {},
    loadedFiles,
    sillyScope;

sillyScope = new WavyJones(tsw.context(), 'waves');
sillyScope.lineColor = '#E40487';

var mellotron = new QwertyHancock({
    octaves: 2,
    startNote: 'C3',
    activeColour: '#FF97CB'
});

mellotron.keyDown = function (note) {

    if (loadedFiles) {
        bufferBoxes[note] = tsw.bufferBox();
        bufferBoxes[note].buffer(loadedFiles[note]);
        gains[note] = tsw.gain();

        tsw.connect(bufferBoxes[note], gains[note], volume, tsw.speakers);

        // Boost dolby files for oscilloscope, not volume.
        if (dolbySupported) {
            tsw.connect(volume, booster, sillyScope);
        } else {
            tsw.connect(volume, sillyScope);
        }

        bufferBoxes[note].play(tsw.now());
    }
};

mellotron.keyUp = function (note) {
    if (loadedFiles) {
        bufferBoxes[note].stop(tsw.now() + 0.1);
        gains[note].gain(0);
    }
};

var loadVoice = function (voice, callback) {
    var audioPath = 'audio/' + voice + '/',
        extension = '.mp3';

    if (dolbySupported) {
        audioPath += 'dolby/';
        extension = '_Dolby.mp4';
    }

    loadingEl.style.display = 'block';

    tsw.load(
        {
            'A#3': audioPath + 'A%233' + extension,
            'A#4': audioPath + 'A%234' + extension,
            'A3': audioPath + 'A3' + extension,
            'A4': audioPath + 'A4' + extension,
            'B3': audioPath + 'B3' + extension,
            'B4': audioPath + 'B4' + extension,
            'C#3': audioPath + 'C%233' + extension,
            'C#4': audioPath + 'C%234' + extension,
            'C3': audioPath + 'C3' + extension,
            'C4': audioPath + 'C4' + extension,
            'D#3': audioPath + 'D%233' + extension,
            'D#4': audioPath + 'D%234' + extension,
            'D3': audioPath + 'D3' + extension,
            'D4': audioPath + 'D4' + extension,
            'E3': audioPath + 'E3' + extension,
            'E4': audioPath + 'E4' + extension,
            'F#3': audioPath + 'F%233' + extension,
            'F#4': audioPath + 'F%234' + extension,
            'F3': audioPath + 'F3' + extension,
            'F4': audioPath + 'F4' + extension,
            'G#3': audioPath + 'G%233' + extension,
            'G#4': audioPath + 'G%234' + extension,
            'G3': audioPath + 'G3' + extension,
            'G4': audioPath + 'G4' + extension
        },
        function (files) {
            loadedFiles = files;
            loadingEl.style.display = 'none';
        }
    );
};

new Knob(document.querySelector('.preset1'), new Ui['P1']());

document.querySelector('.preset1').addEventListener('change', function () {
    volume.gain(this.value / 10);
});

document.querySelector('#cb1').addEventListener('change', function () {
    usingChoir = !usingChoir;

    if (usingChoir) {
        loadVoice('choir');
    } else {
        loadVoice('flute');
    }
});

loadVoice('choir');
