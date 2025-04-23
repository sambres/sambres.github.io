// Write your Javascript code.

// Global variables 

var numDrops = 10;
var maxDrops = 100;
var drops = [];
var splashs = [];
var Radius = 10;
var Gammes = {
    'DoM': [329, 369, 392, 440, 493, 523, 587, 659],
    'SolM': [392, 440, 493, 523, 587, 659, 739, 783],
    'Mim': [264, 297, 330, 352, 396, 440, 495, 526],
    'Custom': [],
};


var attackTime = 0.05
var decayTime = 0.2;
var susPercent = 0.2;
var releaseTime = 0.2;

var attackLevel = 1.0;
var releaseLevel = 0;

//Do Majeur
// 264 297 330 352 396 440 495 526
//Sol Majeur
//392 440n493 523 587 659 739 783
//Mi mineur
//329 369 392 440 493 523 587 659

var Oscillators = [];
var Oscillator;
var Envelopes = [];
var Envelope;
var Gain;
var context = new AudioContext();
var vco;
var vca;
var envelope;

var masterGain;

// Colors
/*
#00BCD4  0 188 212  Cyan1
*/

function setup() {
    //createCanvas(640, 480);
    //createCanvas(displayWidth, displayHeight);
    //createCanvas(windowWidth, windowHeight);
    createCanvas(window.innerWidth, window.innerHeight);

    noStroke();
    smooth();   //Already default 

    // https://noisehack.com/how-to-build-supersaw-synth-web-audio-api/
    masterGain = context.createGain();
    masterGain.gain.value = 0.7;
    masterGain.connect(context.destination);
   // window.scissor = new Scissor(audioContext);
   // scissor.connect(masterGain);

    vco = new VCO;
    vca = new VCA;
    envelope = new EnvelopeGenerator;

    /* Connections */
    vco.connect(vca);
    envelope.connect(vca.amplitude);
    vca.connect(context.destination);

    // Calcul de la gamme custom
    var f0 = random(130, 2000);
    Gammes.Custom[0] = f0;
    for (var i = 1; i < 8; i++) {
        Gammes.Custom[i] = Gammes.Custom[i - 1] * pow(random(2.00, 2.00), random(0.00, 2.00) / 12);

        /*
        // Initialisation of the envelope
        var env = new p5.Env();
        env.setADSR(attackTime, decayTime, susPercent, releaseTime);
        env.setRange(attackLevel, releaseLevel);

        var osc = new p5.Oscillator();
        osc.setType('sine');
        osc.freq(Gammes.Custom[i]);
        osc.amp(env);

        Oscillators.push(osc);
        Envelopes.push(env);
        osc.start();
        Envelope = env;*/
    }

    Gain = new p5.Gain();
    Gain.connect();

    Envelope = new p5.Env();
    Envelope.setADSR(attackTime, decayTime, susPercent, releaseTime);
    Envelope.setRange(attackLevel, releaseLevel);
    Envelope.connect(Gain);

    //	Set the output level of the gain node.
    //Gain.amp(Envelope);

    var osc = new p5.Oscillator();
    osc.setType('sine');
    osc.freq(Gammes.Custom[i]);
    //osc.amp(env);
    osc.disconnect();
    osc.connect(Gain);

    //Loop through array to create each object
    for (var i = 0; i < numDrops; i++) {
        //drops[i] = new Rain(); // Create each object
        //drops[i].y = random(600);
        drops.push(new Rain((i * width) / 8, -  random(height)));

    }
}

function draw() {
    fill(255, 255, 255, 120);
    rect(0, 0, width, height);

    for (var i = numDrops - 1; i >= 0; i--) {
        drop = drops[i];
        drop.fall();

        if (drop.y > height) {
            makeSound(drop.x);
            splashs.push(new Splash(drop.x, drop.y, drop.ySpeed));
            if (drop.toRemove) {
                drops.splice(i, 1);
                numDrops--;
            }
            else {
                drop.reset();
            }
        }
    }
    for (var i = splashs.length - 1; i >= 0; i--) {
        splashs[i].draw();
        if (splashs[i].lifetime > 100) {
            splashs.splice(splashs[i], 1);
        }
    }
}


function makeSound(x) {
    var xIndex = Math.floor(7 * x / width);

    //Envelope.play(Oscillators[xIndex]);  

    //var osc = new p5.Oscillator();
    //osc.setType('sine');
    //osc.freq(Gammes.Custom[xIndex]);
    //osc.amp(Envelopes[xIndex]);
    //Oscillators[xIndex] = osc;

    //    vco.setFrequency(Gammes.Custom[xIndex]);
    //  envelope.trigger();

    var voice = new Scissor(context);
    voice.noteOn(Gammes.Custom[xIndex]);
    voice.connect(masterGain);

}


function mouseClicked() {
    if (mouseButton == LEFT) {
        if (numDrops < maxDrops) {
            drops.push(new Rain(mouseX, mouseY));
            numDrops++;
        }
    }
    //else
    //    if (mouseButton == RIGHT) {
    //    if (!drops2.isEmpty()) {
    //        drops2.remove(0);
    //        numDrops--;
    //    }
    //}
}


function Rain(x, y) {
    this.x = x || random(width);
    this.y = y || random(0);

    this.ySpeed = 5;
    this.gravity = 0.1;
    this.bounce = -0.18;
    this.radius = random(20);
    this.toRemove = false;

    this.fall = function () {
        this.ySpeed += this.gravity;
        this.y = this.y + this.ySpeed;
        fill(0, 188, 212, 180);
        //fill(0,10,200,180);
        //fill(255, 180);
        ellipse(this.x, this.y, Radius, 10 + this.radius);
    }

    this.splash = function () {
        this.ySpeed *= this.bounce;
        this.fall();
    }

    this.reset = function () {
        this.x = random(width);
        this.y = random(-200);
        this.radius = random(Radius);
        this.ySpeed = 7;
    }
}

function Splash(x, y, ySpeed) {
    this.bounce = -0.18;
    this.lifetime = 0;
    this.gravity = 0.1;
    this.x = x;
    this.y = y;
    this.ySpeed = ySpeed * this.bounce;
    this.xSpeed = ySpeed;

    this.draw = function () {
        //fill(0, 100 - this.lifetime);
        fill(0, 188, 212);
        ellipse(this.x + this.xSpeed, this.y, Radius, Radius);
        ellipse(this.x - this.xSpeed, this.y, Radius, Radius);
        this.calculate();

        this.lifetime++;
    }

    this.calculate = function () {
        this.ySpeed += this.gravity;
        this.xSpeed += this.gravity;
        this.y += this.ySpeed;
    }
}


var VCO = (function (context) {
    function VCO() {
        this.oscillator = context.createOscillator();
        this.oscillator.type = 'sine';
        this.setFrequency(440);
        this.oscillator.start(0);

        this.input = this.oscillator;
        this.output = this.oscillator;

    };

    VCO.prototype.setFrequency = function (frequency) {
        this.oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    };

    VCO.prototype.connect = function (node) {
        if (node.hasOwnProperty('input')) {
            this.output.connect(node.input);
        } else {
            this.output.connect(node);
        };
    }

    return VCO;
})(context);

var envelopeCounter = 0;
var EnvelopeGenerator = (function (context) {
    function EnvelopeGenerator() {
        this.attackTime = attackTime;
        this.releaseTime = releaseTime;
        this.decayTime = decayTime;
        this.number = envelopeCounter++;
    };

    EnvelopeGenerator.prototype.trigger = function () {
        now = context.currentTime;
        this.param.cancelScheduledValues(now);
        this.param.setValueAtTime(0, now);
        this.param.exponentialRampToValueAtTime(attackLevel, now + this.attackTime);
        this.param.exponentialRampToValueAtTime(attackLevel * susPercent, now + this.attackTime + this.decayTime);
        this.param.exponentialRampToValueAtTime(0.0001, now + this.attackTime + this.decayTime + this.releaseTime);
    };

    EnvelopeGenerator.prototype.connect = function (param) {
        this.param = param;
    };

    return EnvelopeGenerator;
})(context);

var VCA = (function (context) {
    function VCA() {
        this.gain = context.createGain();
        this.gain.gain.value = 0;
        this.input = this.gain;
        this.output = this.gain;
        this.amplitude = this.gain.gain;
    };

    VCA.prototype.connect = function (node) {
        if (node.hasOwnProperty('input')) {
            this.output.connect(node.input);
        } else {
            this.output.connect(node);
        };
    }

    return VCA;
})(context);



var Scissor = (function () {
    function Scissor(context) {
        this.context = context;
        //   this.tuna = new Tuna(this.context);
        this.output = this.context.createGain();
        //   this.delay = new this.tuna.Delay({
        //     cutoff: 3000
        //   });
        //this.delay.connect(this.output);
        this.voices = [];
        this.numSaws = 3;
        this.detune = 12;
    }

    Scissor.prototype.noteOn = function (freq, time) {
        var voice;

        if (!time) {
            time = this.context.currentTime;
        }
        voice = new ScissorVoice(this.context, freq, this.numSaws, this.detune);
        voice.connect(this.output);
        voice.start(time);
        setTimeout(function () { voice.stop(this.context.currentTime) }, 100)

    };

    Scissor.prototype.noteOff = function (note, time) {
        if (this.voices[note] == null) {
            return;
        }
        if (!time) {
            time = this.context.currentTime;
        }
        this.voices[note].stop(time);
        return delete this.voices[note];
    };

    Scissor.prototype.connect = function (target) {
        return this.output.connect(target);
    };

    return Scissor;

})();

var ScissorVoice = (function () {
    function ScissorVoice(context, frequency, numSaws, detune) {
        var i, saw, _i, _ref;
        this.context = context;
        this.frequency = frequency;
        this.numSaws = numSaws;
        this.detune = detune;
        this.output = this.context.createGain();
        this.maxGain = 1 / this.numSaws;
        this.attack = 0.001;
        this.decay = 0.030;
        this.release = 0.4;
        this.saws = [];
        //    for (i = _i = 0, _ref = this.numSaws; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        saw = this.context.createOscillator();
        saw.type = 'sine';
        saw.frequency.value = this.frequency;
        //saw.detune.value = -this.detune + i * 2 * this.detune / (this.numSaws - 1);
        saw.start(this.context.currentTime);
        saw.connect(this.output);
        this.saws.push(saw);
        //   }
    }

    ScissorVoice.prototype.start = function (time) {
        this.output.gain.value = 0;
        this.output.gain.setValueAtTime(0, time);
        return this.output.gain.setTargetAtTime(this.maxGain, time + this.attack, this.decay + 0.001);
    };

    ScissorVoice.prototype.stop = function (time) {
        var _this = this;
        this.output.gain.cancelScheduledValues(time);
        this.output.gain.setValueAtTime(this.output.gain.value, time);
        this.output.gain.setTargetAtTime(0, time, this.release / 10);
        return this.saws.forEach(function (saw) {
            return saw.stop(time + _this.release);
        });
    };

    ScissorVoice.prototype.connect = function (target) {
        return this.output.connect(target);
    };

    return ScissorVoice;

})();
