/**
 * Web Audio API and Speech Synthesis Utilities for Neural Core Reactivity
 */

export interface AudioVisualizerState {
  isListening: boolean;
  frequencyData: Uint8Array;
  averageVolume: number;
  bassEnergy: number;
}

class NeuralAudioManager {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private microphoneStream: MediaStream | null = null;
  private dataArray: Uint8Array = new Uint8Array(new ArrayBuffer(0));
  private isInitialized = false;

  public async initializeMicrophone(): Promise<boolean> {
    if (typeof window === 'undefined') return false;

    try {
      if (!this.audioContext) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.audioContext = new AudioCtx();
      }

      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.warn('Audio input not supported on this browser/environment.');
        return false;
      }

      this.microphoneStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      const source = this.audioContext.createMediaStreamSource(this.microphoneStream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.8;

      source.connect(this.analyser);
      this.dataArray = new Uint8Array(new ArrayBuffer(this.analyser.frequencyBinCount));
      this.isInitialized = true;
      return true;
    } catch (err) {
      console.warn('Microphone access denied or unavailable:', err);
      this.isInitialized = false;
      return false;
    }
  }

  public getReactivity(): { volume: number; bass: number } {
    if (!this.isInitialized || !this.analyser) {
      return { volume: 0, bass: 0 };
    }

    // Cast dataArray to Uint8Array as expected by DOM lib
    this.analyser.getByteFrequencyData(this.dataArray as unknown as Uint8Array<ArrayBuffer>);

    let sum = 0;
    const len = this.dataArray.length;
    for (let i = 0; i < len; i++) {
      sum += this.dataArray[i];
    }
    const volume = len > 0 ? sum / (len * 255) : 0;

    // Bass frequencies (first few bins)
    const bassBins = Math.min(4, len);
    let bassSum = 0;
    for (let i = 0; i < bassBins; i++) {
      bassSum += this.dataArray[i];
    }
    const bass = bassBins > 0 ? bassSum / (bassBins * 255) : 0;

    return { volume, bass };
  }

  public stopListening(): void {
    if (this.microphoneStream) {
      this.microphoneStream.getTracks().forEach((track) => track.stop());
      this.microphoneStream = null;
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
      this.audioContext = null;
    }
    this.isInitialized = false;
  }

  public speak(text: string, onEnd?: () => void): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return false;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 0.95;
      utterance.rate = 1.0;
      utterance.volume = 0.8;

      // Select high quality voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(
        (v) => v.name.includes('Google') || v.name.includes('Natural') || v.lang.startsWith('en')
      );
      if (preferred) {
        utterance.voice = preferred;
      }

      if (onEnd) {
        utterance.onend = onEnd;
      }

      window.speechSynthesis.speak(utterance);
      return true;
    } catch (e) {
      console.warn('Speech synthesis failed:', e);
      return false;
    }
  }
}

export const neuralAudio = new NeuralAudioManager();
export default neuralAudio;

