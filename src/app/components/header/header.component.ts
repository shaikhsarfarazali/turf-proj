import { Component, OnInit } from '@angular/core';
import { BaseHelper } from 'src/helper/baseHelper';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private b: BaseHelper) {}

  navigate(path) {
    this.b.navigate(path);
  }
  ngOnInit() {}

}
