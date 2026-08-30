var context = new AudioContext(),
    mousedown = false,
    oscillator = null;

var gainNode = context.createGain();

var calculateFrequency = function (mouseXPosition) {
    var minFrequency = 20,
        maxFrequency = 2000;

    return ((mouseXPosition / window.innerWidth) * maxFrequency) + minFrequency;
};

var calculateGain = function (mouseYPosition) {
    var minGain = 0,
        maxGain = 1;

    return 1 - ((mouseYPosition / window.innerHeight) * maxGain) + minGain;
};

document.body.addEventListener('mousedown', function (e) {
    var mouseXPosition = e.clientX,
        mouseYPosition = e.clientY;

    mousedown = true;
    oscillator = context.createOscillator();
    oscillator.frequency.setTargetAtTime(calculateFrequency(mouseXPosition), context.currentTime, 0.01);
    gainNode.gain.setTargetAtTime(calculateGain(e.clientY), context.currentTime, 0.01);
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.start(context.currentTime);
});

document.body.addEventListener('mousemove', function (e) {
    if (mousedown) {
        oscillator.frequency.setTargetAtTime(calculateFrequency(e.clientX), context.currentTime, 0.01);
        gainNode.gain.setTargetAtTime(calculateGain(e.clientY), context.currentTime, 0.01);
    }
});

document.body.addEventListener('mouseup', function () {
    mousedown = false;
    oscillator.stop(context.currentTime);
    oscillator.disconnect();
});
