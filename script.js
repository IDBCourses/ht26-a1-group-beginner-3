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

const keyNoise = "q";
// ---------- State ----------
//Author:At1220
const state = {
  noiseActive:false,
  noiseStopTime:0
};
// ---------- Sound ----------
// Make the instruments and plug them into the speakers.
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const noise = new Tone.Noise("brown").toDestination();
noise.volume.value = -12;

// ---------- Update ----------
// Update the state. This is called every 100ms.
function update() {
  // Example: replace this with your own instrument.

  setTimeout(update, 100); // call update() again in 100 milliseconds
}

// ---------- Use ----------
// Use the state to make sound. This is called every 100ms.
function use(){
  if (state.noiseActive && !noise.state !== "started"){
    noise.start();
  }
  if (!state.noiseActive && noise.state === "started"){
    noise.stop("+3");
  }
  setTimeout(use,100);
}

// ---------- Controls (Event Handlers) ----------
// Runs every time a key goes down.
//Author:At1220
function keyDown(event) {
  Tone.start(); //browsers only allow sound after the player has pressed something
  //Holding a key down sends keydown again and again. only react to the first one.
  if (event.repeat === false){
    console.log("Key down:", event.key);
    const pressedKey = event.key.toLowerCase();

    if (pressedKey === keyC){
      synth.triggerAttack(noteC, Tone.now());
    }
    if (pressedKey === keyD){
      synth.triggerAttack(noteD, Tone.now());
    }
    if (pressedKey === keyE){
      synth.triggerAttack(noteE, Tone.now());
    }
    if (pressedKey === keyF){
      synth.triggerAttack(noteF, Tone.now());
    }
    if (pressedKey === keyG){
      synth.triggerAttack(noteG, Tone.now());
    }
    if (pressedKey === keyA){
      synth.triggerAttack(noteA, Tone.now());
    }
    if (pressedKey === keyB){
      synth.triggerAttack(noteB, Tone.now());
    }
    if (pressedKey === keyNoise){
      state.noiseActive = true;
    }
    if (event.key.toLowerCase() === "q"){
      state.noiseActive = true;
    }
  }
}

// Runs every time a key comes up.
// Author:At1220
function keyUp(event){
  console.log("key up:",event.key);
  const releasedKey = event.key.toLowerCase();

  if(releasedKey === keyC){
    synth.triggerRelease(noteC,Tone.now());
  }
  if(releasedKey === keyD){
    synth.triggerRelease(noteD,Tone.now());
  }
  if(releasedKey === keyE){
    synth.triggerRelease(noteE,Tone.now());
  }
    if(releasedKey === keyF){
    synth.triggerRelease(noteF,Tone.now());
  }
    if(releasedKey === keyG){
    synth.triggerRelease(noteG,Tone.now());
  }
    if(releasedKey === keyA){
    synth.triggerRelease(noteA,Tone.now());
  }
    if(releasedKey === keyB){
    synth.triggerRelease(noteB,Tone.now());
  }
  //Stop noise when q is released
  if(releasedKey === keyNoise){
    state.noiseActive = false;
    state.noiseStopTime = Tone.now() + 3;
  }
}


// ---------- Setup ----------
// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  noise.volume.value = -12;

  update(); // start the update loop
  use(); // start the use loop

  // Put your event listener code here
  window.addEventListener("keydown", keyDown);
  window.addEventListener("keyup", keyUp);
}

setup(); // Always remember to call setup()!
