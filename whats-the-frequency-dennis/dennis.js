var Dennis = function (context, callback) {
    var analyser = context.createAnalyser();

    var getNote = function (frequency) {
        var notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
            octave,
            keyNumber;

        keyNumber = Math.round(12 * (Math.log(frequency/440)/Math.LN2) + 49);
        octave = Math.round(keyNumber / 12);

        return notes[(keyNumber % 12) - 1] + octave;
    };

    var lastFreq = 0;

    var update = function () {
        var bigArray = new Uint8Array(analyser.fftSize),
            arrLength = bigArray.length,
            count = 0,
            total = 0,
            biggestFreq = 0,
            i = 0;

        analyser.getByteFrequencyData(bigArray);

        for (i = 0; i < arrLength; i++) {
            if (bigArray[i] > biggestFreq) {
                biggestFreq = bigArray[i];
            } else if (bigArray[i] === biggestFreq) {
                count++;
                total += i;
            }
        }

        analyser.frequency = ((total / count) / arrLength) * (context.sampleRate);

        if (isNaN(analyser.frequency) || analyser.frequency === 0) {
            analyser.frequency = lastFreq;
        } else {
            lastFreq = analyser.frequency;
        }

        callback(Math.round(analyser.frequency, 2), getNote(analyser.frequency));

        setTimeout(update, 50);
    };

    update();

    return analyser;
};
