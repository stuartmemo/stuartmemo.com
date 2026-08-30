# Make Music in the Browser with a Web Audio Theremin

Petrograd, Russia, 1920. Deep in his scientific laboratory, a young Léon Theremin accidentally notices that the sound coming from one of his high frequency oscillators changes pitch when he moves his hand. Popular culture is changed forever. The theremin's unique sound proves perfect for sci-fi soundtracks and Good Vibrations by the Beach Boys. The world is a better place.

For the best part of a century, musicians have been waiting for a similar breakthrough technology to again change the way we create music. I'm delighted to announce it has already arrived. It's called the Web Audio API.

The Web Audio API is a high-level, high-performance way of making and manipulating sound in the browser. That's right, we can make sound in the browser without a plugin or mp3 in sight. What's more, I'm going to show you how to recreate Léon Theremin's amazing invention with a little bit of JavaScript.

## The Web Audio API

Currently the Web Audio API is [supported in all major browsers except IE](http://caniuse.com/#search=web%20audio%20api), but that's currently being remedied by [Microsoft Edge](https://www.microsoft.com/en-gb/windows/microsoft-edge). Imagine an electric guitar player. They might take a lead from their guitar, connect it to an effects pedal, then connect it to an amplifier. This concept of chaining things together is central to the API.

To make a sound we'll first need a simple web page with a reference to a JavaScript file. Something like this:

```HTML
<!doctype html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>My Theremin</title>
    </head>
    <body>
        <h1>My Theremin</h1>
        <script src="theremin.js"></script>
    </body>    
</html>
```

Then in `theremin.js` we'll create an `AudioContext`. An `AudioContext` is how we access the Web Audio API's various methods. We'll also want an oscillator, which generates a continuous tone.

```JavaScript
var context = new AudioContext(),
    oscillator = context.createOscillator();
```

To continue our guitar analogy, we need to take a lead from the oscillator and connect it to our speakers. This is done using the `connect` method. Our speakers are accessible by using `context.destination`.

```JavaScript
oscillator.connect(context.destination);
```

Now that everything is connected, we need to start the oscillator to generate a tone. This is as easy as writing:

```JavaScript
oscillator.start(context.currentTime);
```

You can see we've passed `context.currentTime` here. This means we are telling the browser to start this oscillator now. To stop it we simply say:

```JavaScript
oscillator.stop(context.currentTime + 1);
```
This will stop the oscillator playing one seconds from now. Save and open your page in the browser to hear a lovely 440Hz tone play for a second. Beautiful.

## Mouse Control

Now a sound that plays when we load the page is one thing, but if we're wanting to turn this into an instrument we'll have to have to have control over when it starts and stops.

Let's make the entire page our playing area. Add some simple styles to your page to make sure the body element covers the entire visible area and that it's more interesting than plain white.

```CSS
html, body {
    background: darkmagenta;
    height: 100%;
}
```

Next, we'll add some click event listeners to the body element to.

```JavaScript
document.body.addEventListener('mousedown', function () {
    // Mouse has been pressed
});

document.body.addEventListener('mouseup', function () {
    // Mouse has been released
});
```

You may be thinking "Ok, let's stick start call in mousedown, and stop in mousedown". It's actually slightly more complicated than that. Oscillators, by design, are only able be started and stopped exactly once. Think of them as some sort of weird audio firework. This is actually better for performance, as it means it doesn't hang around in memory waiting to be used when it doesn't need to be. Luckily oscillators are cheap and easy to make, so we create one every time the user holds their mouse button down.

```JavaScript
var context = new AudioContext(),
    oscillator = null;

document.body.addEventListener('mousedown', function () {
    oscillator = context.createOscillator();
    oscillator.connect(context.destination);
    oscillator.start(context.currentTime);
});

document.body.addEventListener('mouseup', function () {
    oscillator.stop(context.currentTime);
    oscillator.disconnect();
});
```

Note that in order stop the oscillator we've created inside the `mousedown` event listener, we need to maintain a reference to it outside the scope of the function so that `mouseup` knows to stop that exact oscillator.

Also, just to be on the safe side, we should check that the oscillator has actually been created before we call `stop` on it. While it's rare that we'll have a `mouseup` event without mousedown preceeding it, it's good programming practise to check an object exists before performing operations upon it.

```JavaScript
document.body.addEventListener('mouseup', function () {
    if (oscillator) {
        oscillator.stop(context.currentTime);
        oscillator.disconnect();
    }
});
```

Refresh your browser to be amazed by sound playing in response to your mouse clicks! Be disappointed when you realise all you can do is tap out incomprehensible morse code! Let's fix that.

## Frequency and Pitch

A theremin changes pitch when you change the position of your hand. Pitch is how high or low a note playing is, which is technically the speed in which the instrument producing a note vibrates. The frequency of this vibrations is measured in Hertz, and luckily the Web Audio API allows us to specify the frequency of an oscillator to change the pitch in exactly this way.

Just after the line in which we create the oscillator, change the frequency like so:

```JavaScript
oscillator.frequency.value = 600;
```

You'll now be able to tap away at a different pitch. What we want to do though is to alter the pitch depending on where on the screen the mouse is without repeated clicking.

Our `mousedown` event listener passes the mouse event to us in the callback, which we'll label `e`. We can get the x-coordinate from this by using the `clientX` property.

```JavaScript
document.body.addEventListener('mousedown', function (e) {
    console.log(e.clientX);
});
```

So what do we have to do to convert this coordinate into a frequency suitable for a theremin? Let's start by creating a `calculateFrequency` function that takes the x-coordinate and returns a frequency.

```JavaScript
var calculateFrequency = function (mouseXPosition) {
}
```

The very left x-coordinate of the browser window is 0, while the very right coordinate is the width of your browser in pixels. Without doing anything, this is actually a fairly good range. The range of human hearing goes from 20Hz to 20,000Hz, although things start to get unpleasant at around 2,000Hz so we don't want to go any higher than that. That said, we can't use this range as is because it would limit small screen devices to only producing low notes at low frequencies. Instead we should use what ratio of the screen from the left did the mouse click happen.

First, we set our minimum and maximum frequencies.

```JavaScript
var minFrequency = 20,
    maxFrequency = 2000;
```

To calculate the ratio, we divide `mouseXPosition` by the width of the browser window. Then to get the frequency, multiply this ratio by the maximum frequency. This gives us a frequency of 0 to 2000Hz. 0Hz is inaudible so we'll just add 20 to get it over the human hearing threshold.

```JavaScript
var calculateFrequency = function (mouseXPosition) {
    var minFrequency = 20,
        maxFrequency = 2000;

    return ((mouseXPosition / window.innerWidth) * maxFrequency) + minFrequency;
};
```
Next, replace the hardcoded frequency in our `mousedown` function with:

```JavaScript
oscillator.frequency.value = calculateFrequency(e.clientX);
```

This will now calculate the frequency based on the position of the mouse click, but it will do it fairly abruptly. We want our theremin to smoothly slide between frequencies. To do this we use the the Web Audio API's automation methods. These methods allow us to schedule such changes at some future point in time, but more importantly for us it will transition the frequency to its new value _smoothly_. To automate the frequency change we delete our previous line and write:

```JavaScript
oscillator.frequency.setTargetAtTime(calculateFrequency(e.clientX), context.currentTime, 0.01);
```

What we're saying here is smoothly transition the frequency of the oscillator over time. The first parameter is the frequency to change the oscillator to, the seconds is when should we do it? (now), and the third is the rate at which it should change. For this value, we want the transition to happen quickly so a small value is desired.

Try it out in your browser by clicking on different areas to hear the pitch change.

A distinct feature of the theremin's sound is the way it slides from note to note. We can achieve this very same effect by tracking the position of the mouse and updating the frequency as it moves. We'll use the `mousemove` event and set up a listener in the same manner as the others. In it we'll set the oscillator's frequency as before.

```
document.body.addEventListener('mousemove', function (e) {
    oscillator.frequency.setTargetAtTime(calculateFrequency(e.clientX), context.currentTime, 0.01);
});
```

This code will cause an error however, as `mousemove` will fire even if the mouse isn't depressed. This means that the oscillator specified here may not even exist yet. We can make sure that an oscillator is actively accepting frequency values by keeping track of whether the mouse has been clicked or not.

```JavaScript
var context = new AudioContext(),
    mousedown = false,
    oscillator;

var calculateFrequency = function (mouseXPosition) {
    var minFrequency = 20,
        maxFrequency = 2000;

    return ((mouseXPosition / window.innerWidth) * maxFrequency) + minFrequency;
};

document.body.addEventListener('mousedown', function (e) {
    mousedown = true;
    oscillator = context.createOscillator();
    oscillator.frequency.setTargetAtTime(calculateFrequency(e.clientX), context.currentTime, 0.01);
    oscillator.connect(context.destination);
    oscillator.start(context.currentTime);
});

document.body.addEventListener('mouseup', function () {
    mousedown = false;
    oscillator.stop(context.currentTime);
    oscillator.disconnect();
});

document.body.addEventListener('mousemove', function (e) {
    if (mousedown) {
        oscillator.frequency.setTargetAtTime(calculateFrequency(e.clientX), context.currentTime, 0.01);
    }
});
```

That's pitch sorted, but the Theremin had one other feature that made it so expressive. The player could alter the volume of the instrument by simply moving their other hand up or down to make it louder or quieter. We can add this functionality to our Web Theremin quite easily by approaching volume in a similar manner to frequency.

First, we'll need to add a `gainNode`. Remember the guitar analogy from earlier? A gain node is a simple effect that we can add to our chain to change the volume of an incoming signal. We'll create it up at the top with our other variables.

```JavaScript
var gainNode = context.createGain();
```

Now we need to add it to the correct position in our chain. Remove the line connecting the oscillator to `context.destination`, and in its place write:

```JavaScript
oscillator.connect(gainNode);
gainNode.connect(context.destination);
```

Here we're taking connection the oscillator to our gain node, then connecting it to our speakers.

Next, duplicate the `calculateFrequency` function and rename the copy as `calculateGain`. This function will instead accept the cursor's y-position as its only argument. And instead of min and max frequency, these values will represent gain. Gain is the value in which you wish to multiply the volume of the incoming signal by. So if you set the gain to 0.5 then this would be half the volume of our oscillator. We don't want our instrument to be any louder than it is already, so the minimum value will be 0 and the maximum 1. The last tweak to the function will be to subtract our calculation from 1. This means that volume will louder at the top of the screen and quieter at the bottom. The final function looks like this:

```JavaScript
var calculateGain = function (mouseYPosition) {
    var minGain = 0,
        maxGain = 1;

    return 1 - ((mouseYPosition / window.innerHeight) * maxGain) + minGain;
};
```

Great. Now all we need to do is set the gain as the mouse moves. Again, duplicate the two lines which specify the `frequency.setTargetAtTime` lines, and update the copy to refer to the `gainNode` instead. Oh, and remember to use the y-position of the cursor.

```JavaScript
gainNode.gain.setTargetAtTime(calculateGain(e.clientY), context.currentTime, 0.01);
```

Behold, [our lovely theremin](http://stuartmemo.com/smashing-magazine/theremin/)! If you look at the source of my version you'll see I've added listeners for touch events too, meaning that you can annoy others on public transport as you perform your theremin masterpiece.

Lovely. Léon Theremin would be proud - a musical instrument in the browser without a plugin in sight.

This tutorial has only touched on the Web Audio API, but I hope it shows you how simple it is to get something musical up and running fairly quickly. You can even use the techniques we've learned here to make a synthesizer. I created a little HTML keyboard called [Qwerty Hancock](http://stuartmemo.com/qwerty-hancock/) to help you do this very thing. Feel free to show-off your creation in the comments or [send me a tweet](https://twitter.com/stuartmemo). I'd love to see what you make.
