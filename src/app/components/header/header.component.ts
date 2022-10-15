import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseHelper } from 'src/helper/baseHelper';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input('title') title: any;
  pageTitle: Observable<object>;
  isSearchBar: boolean;

  constructor(private b: BaseHelper) {
  }

  navigate(path) {
    this.b.navigate(path);
  }
  ngOnInit() {
    // console.log(this.title)
  }

}
