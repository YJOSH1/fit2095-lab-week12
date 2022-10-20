import { Component, ENVIRONMENT_INITIALIZER } from '@angular/core';
import { io } from 'socket.io-client';

interface translation {
  from: string;
  to: string;
  to2: string;
  original: string;
  translated: string;
  translated2: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fit2095-lab-week12';

  socket:any;

  text: string = ' ';
  target: string = 'Select a Language';
  target2: string = 'Select a Language'
  
  translated: string = ' ';
  translations: translation[] = []

  ngOnInit(): void {
    this.socket = io();
    this.listenToEvents();
  };

  requestTranslation() {
    let translateObject = {
      text: this.text,
      target: this.target,
      target2: this.target2
    }
    this.socket.emit('translate', translateObject);

    this.text = '';
    this.target = 'Select a Language'; 
    this.target2 = 'Select a Language'
  }

  listenToEvents() {
    this.socket.on('onTranslation', (translatedObject: translation) => {
      if (translatedObject.to == 'MR') {
        translatedObject.to = 'Marathi'; 
      } else if (translatedObject.to == 'HI') {
        translatedObject.to = 'Hindi';
      } else if (translatedObject.to == 'ZH') {
        translatedObject.to = 'Chinese';
      } else if (translatedObject.to == 'FR') {
        translatedObject.to = 'French';
      } else if (translatedObject.to == 'ES') {
        translatedObject.to = 'Spanish';
      } else {
        translatedObject.to = 'Sweedish'
      }

      if (translatedObject.to2 == 'MR') {
        translatedObject.to2 = 'Marathi'; 
      } else if (translatedObject.to2 == 'HI') {
        translatedObject.to2 = 'Hindi';
      } else if (translatedObject.to2 == 'ZH') {
        translatedObject.to2 = 'Chinese';
      } else if (translatedObject.to2 == 'FR') {
        translatedObject.to2 = 'French';
      } else if (translatedObject.to2 == 'ES') {
        translatedObject.to2 = 'Spanish';
      } else {
        translatedObject.to2 = 'Sweedish'
      }

      this.translations.push(translatedObject);
    });
  }
}
