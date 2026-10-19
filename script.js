/*
 * IDB Programming: A1 Modelling — a musical instrument
 *
 * All of the code for your instrument goes in this file. It's split into sections:
 *   settings — the "fixed" parts of your program
 *   state    — the parts of your program that change over time
 *   sound    — the Tone.js instruments and effects
 *   update   — updates the state every 100ms, if necessary
 *   use      — applies the state to make sound every 100ms, if necessary
 *   controls — what happens when a key goes down or comes up
 *   setup    — starts everything
 *
 * There is no loop in this assignment. Nothing happens until the player presses
 * a key, and every key event follows the same two steps:
 *   1. update: change the state, based on which key it was
 *   2. use:    make sound from the state
 *
 * Tone.js documentation: https://tonejs.github.io/docs/15.1.22/
 */

// ---------- Settings ----------
// Settings variables should contain all of the "fixed" parts of your programs
//Author:At1220
const keyC = "c";
const noteC = "C4";

const keyD = "d";
const noteD = "D4";

const keyE = "e";
const noteE = "E4";

const keyF = "f";
const noteF = "F4";

const keyG = "g";
const noteG = "G4";

const keyA = "a";
const noteA = "A4";

const keyB = "b";
const noteB = "B4";

//Author: At1220
const keyNoise = "1";

//Author: as6395
const keyDrum = "4";

//Author:As8795
const keyPluckSynth = "3";

//Author:ao5056
const keyReverb = "2";

// ---------- State ----------

//Author:At1220
const state = {
  noiseActive: false,
  noiseStopTime: 0,

  //Author:As8795
  PluckSynthActive: false,
  PluckSynthStopTime: 0,
};

//Author: as6395
const state2 = {
  drumActive: false,
  drumStopTime: 0,
};

//Author: ao5056
const state4 = {
  noiseActive: false,
  noiseStopTime: 0,
  reverbActive: false,
};

// ---------- Sound ----------
// Make the instruments and plug them into the speakers.
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const noise = new Tone.Noise("brown").toDestination();
noise.volume.value = -12;

//Author:As8795
const PluckSynth = new Tone.PluckSynth().toDestination();
PluckSynth.volume.value = -12;

// Author: as6395
const drum = new Tone.MembraneSynth().toDestination();
drum.volume.value = -12;

//author:ao5056
const reverb = new Tone.Reverb({
  decay: 3,       // how long
  preDelay: 0.01, // delay
  wet: 1          // on 0-1 scale
}).toDestination();

//author:a05056
const reverbSource = new Tone.NoiseSynth({
  noise: { type: "white" },
  envelope: { attack: 0.1, decay: 0.2, sustain: 1, release: 0.5 }
}).connect(reverb);
reverbSource.volume.value = -12;

// ---------- Update ----------
// Update the state. This is called every 100ms.
function update() {


  setTimeout(update, 100); // call update() again in 100 milliseconds
}

// ---------- Use ----------
// Use the state to make sound. This is called every 100ms.
function use() {
  if (state.noiseActive && noise.state !== "started") {
    noise.start();
  }
  if (!state.noiseActive && noise.state === "started") {
    noise.stop("+1");
  }

  setTimeout(use, 100);
}
// arthur as8795

// ---------- Controls (Event Handlers) ----------
// Runs every time a key goes down.
//Author:At1220
//arthur : as8795 function plucksynth
function playNote(note) {
  if (state.PluckSynthActive) {
    PluckSynth.triggerAttackRelease(note, 0.25);
  } else {
    synth.triggerAttack(note, Tone.now());
  }

}
function keyDown(event) {
  Tone.start(); //browsers only allow sound after the player has pressed something
  //Holding a key down sends keydown again and again. only react to the first one.
  if (event.repeat === false) {
    console.log("Key down:", event.key);
    const pressedKey = event.key.toLowerCase();

    if (pressedKey === keyC) {
      playNote(noteC);
    }
    if (pressedKey === keyD) {
      playNote(noteD);
    }
    if (pressedKey === keyE) {
      playNote(noteE);
    }
    if (pressedKey === keyF) {
      playNote(noteF);
    }
    if (pressedKey === keyG) {
      playNote(noteG);
    }
    if (pressedKey === keyA) {
      playNote(noteA);
    }
    if (pressedKey === keyB) {
      playNote(noteB);
    }
    if (pressedKey === keyNoise) {
      state.noiseActive = true;
    }
    if (event.key.toLowerCase() === "1") {
      state.noiseActive = true;
    }
    // arthur : as8795
    if (pressedKey === keyPluckSynth) {
      state.PluckSynthActive = true;
    }
    // Author: as6395
    if (pressedKey === keyDrum) {
      console.log("Drum key pressed");
      drum.triggerAttackRelease("C2","2n");
    }
    // Author: ao5056
    // when key is pressed, the effect is on
    if (pressedKey === keyReverb) {
      reverbSource.triggerAttack();
    }
  }
}

// Runs every time a key comes up.
// Author:At1220
function keyUp(event) {
  console.log("key up:", event.key);
  const releasedKey = event.key.toLowerCase();

  if (releasedKey === keyC) {
    synth.triggerRelease(noteC, Tone.now());
  }
  if (releasedKey === keyD) {
    synth.triggerRelease(noteD, Tone.now());
  }
  if (releasedKey === keyE) {
    synth.triggerRelease(noteE, Tone.now());
  }
  if (releasedKey === keyF) {
    synth.triggerRelease(noteF, Tone.now());
  }
  if (releasedKey === keyG) {
    synth.triggerRelease(noteG, Tone.now());
  }
  if (releasedKey === keyA) {
    synth.triggerRelease(noteA, Tone.now());
  }
  if (releasedKey === keyB) {
    synth.triggerRelease(noteB, Tone.now());
  }
  //Stop noise when 1 is released
  if (releasedKey === keyNoise) {
    state.noiseActive = false;
    state.noiseStopTime = Tone.now() + 1;
  }
   // stop the changes in the notes when 3 is relased
  if (releasedKey === keyPluckSynth) {
      state.PluckSynthActive = false;
   }
   // Author: ao5056
  // when key is released, the effect is off
  if (releasedKey === keyReverb) {
    reverbSource.triggerRelease();
  }
}

// ---------- Setup ----------
// Setup is run once, at the start of the program. It sets everything up for us!
async function setup() {
  noise.volume.value = -12;
  await reverb.ready;

  update(); // start the update loop
  use(); // start the use loop

  // Put your event listener code here
  window.addEventListener("keydown", keyDown);
  window.addEventListener("keyup", keyUp);
}

setup(); // Always remember to call setup()!
