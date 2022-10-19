import { Component, ENVIRONMENT_INITIALIZER } from '@angular/core';
import { io } from 'socket.io-client';

interface translation {
  from: string;
  to: string;
  orignal: string;
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
  translations: any[] = []

  ngOnInit(): void {
    this.socket = io();
  };

  requestTranslation() {
    let translateObject = {
      text: this.text,
      target: this.target    
    }
    console.log(translateObject);
    this.socket.emit('translate', translateObject);

    this.socket.on('onTranslation', (translatedText: any) => {
      this.translations.push({
        from: 'EN',
        to: this.target,
        orignal: this.text,
        translated: translatedText
      });
    });
  }
}
