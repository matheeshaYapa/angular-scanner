import { Component } from '@angular/core';
import {SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sample-project';
  image: SafeResourceUrl;

   test(files: FileList) {
     const file = files.item(0);

     const fileReader = new FileReader();
     fileReader.readAsDataURL(file);
     fileReader.onload = () => {
       this.image = fileReader.result;
       console.log(this.image);
     }
    //  const xhr = new XMLHttpRequest();
    // xhr.open('GET', 'unicorn.png');
    // xhr.responseType = 'arraybuffer';
    //
    // xhr.onload = () => {
    //   imageType(new Uint8Array(this.response));
    //   //=> {ext: 'png', mime: 'image/png'}
    // };
    //
    // xhr.send();
  }
}
