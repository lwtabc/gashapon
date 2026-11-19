(function () {
  "use strict";

  class GachaSound {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    ensureContext() {
      if (!this.enabled) return null;
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return null;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    }

    setEnabled(flag) {
      this.enabled = Boolean(flag);
    }

    playTone(freq, startOffset, duration, type, volume, endFreq) {
      const ctx = this.ensureContext();
      if (!ctx) return;
      const now = ctx.currentTime + startOffset;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type || "sine";
      osc.frequency.setValueAtTime(freq, now);
      if (endFreq) {
        osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration);
      }
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(volume || 0.14, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration + 0.02);
    }

    playCoin() {
      this.playTone(1046, 0, 0.12, "triangle", 0.16, 1318);
      this.playTone(1568, 0.07, 0.18, "sine", 0.14);
    }

    playKnobTurn() {
      const clicks = [0, 0.11, 0.22, 0.34, 0.46, 0.58];
      clicks.forEach((t, idx) => {
        this.playTone(300 + idx * 35, t, 0.055, "square", 0.05, 190);
      });
    }

    playDrop() {
      this.playTone(420, 0, 0.14, "sine", 0.15, 220);
      this.playTone(260, 0.15, 0.1, "triangle", 0.12, 340);
      this.playTone(320, 0.27, 0.08, "sine", 0.09, 280);
    }

    playCrack() {
      this.playTone(360, 0, 0.1, "triangle", 0.14, 720);
      this.playTone(784, 0.12, 0.16, "sine", 0.15);
      this.playTone(1046, 0.22, 0.22, "sine", 0.16);
      this.playTone(1318, 0.32, 0.3, "triangle", 0.14);
    }

    playEarPoke() {
      this.playTone(580, 0, 0.09, "sine", 0.13, 860);
      this.playTone(880, 0.06, 0.09, "triangle", 0.1, 740);
    }

    playBonusCoin() {
      this.playTone(880, 0, 0.12, "triangle", 0.14);
      this.playTone(1174, 0.1, 0.12, "triangle", 0.14);
      this.playTone(1568, 0.2, 0.24, "sine", 0.16);
    }

    playTear() {
      const ctx = this.ensureContext();
      if (!ctx) return;
      const sampleRate = ctx.sampleRate;
      const length = Math.floor(sampleRate * 0.26);
      const buffer = ctx.createBuffer(1, length, sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < length; i++) {
        const env = 1 - i / length;
        data[i] = (Math.random() * 2 - 1) * env * 0.45;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1800, ctx.currentTime);
      filter.Q.setValueAtTime(1.2, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.26);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    }

    playStamp() {
      this.playTone(180, 0, 0.11, "triangle", 0.2, 85);
      this.playTone(660, 0.09, 0.18, "sine", 0.12, 880);
    }

    playUnlock() {
      const notes = [523, 659, 784, 1046, 1318];
      notes.forEach((n, idx) => {
        this.playTone(n, idx * 0.085, 0.22, "triangle", 0.13);
      });
    }
  }

  window.GachaSound = new GachaSound();
})();
