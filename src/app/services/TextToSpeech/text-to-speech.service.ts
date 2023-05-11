import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

 // private synthesis = window.speechSynthesis;

  utterance: SpeechSynthesisUtterance;
  constructor(){
    this.utterance = new SpeechSynthesisUtterance();
    this.utterance.lang = 'hi-IN';
  }
  convertTextToSpeech(text: string) {
    this.utterance.text = text;
    speechSynthesis.speak(this.utterance);
    this.utterance.addEventListener('error', (event: SpeechSynthesisErrorEvent) => {
      console.error('Speech synthesis error:', event.error);
    });
    
    this.utterance.addEventListener('end', () => {
      console.log('Speech synthesis ended.');
    });
  }
}
