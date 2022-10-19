import { Component, ENVIRONMENT_INITIALIZER } from '@angular/core';
import { io } from 'socket.io-client';

interface translation {
  from: string;
  to: string;
  original: string;
  translated: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fit2095-lab-week12';

  socket:any;

  text: string = '';
  target: string = '';
  
  translated: string = '';
  translations: translation[] = []

  ngOnInit(): void {
    this.socket = io();
    this.listenToEvents();
  };

  requestTranslation() {
    let translateObject = {
      text: this.text,
      target: this.target    
    }
    this.socket.emit('translate', translateObject);

    this.text = '';
    this.target = '';
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

      this.translations.push(translatedObject);
    });
  }
}
