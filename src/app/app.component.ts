import { Component } from '@angular/core';
import { BaseHelper } from 'src/helper/baseHelper';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private b: BaseHelper) {}

  navigate(path) {
    this.b.navigate(path);
  }
}
