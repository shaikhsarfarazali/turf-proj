import { Component } from '@angular/core';
import { BaseHelper } from 'src/helper/baseHelper';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  sideMenus: any;

  constructor(private b: BaseHelper) {
    this.sideMenu();
  }

  navigate(path) {
    this.b.navigate(path);
  }

  sideMenu() {
    this.sideMenus =
      [
        {
          title: "Home",
          url: "/home",
          icon: "home"
        },
        {
          title: "About Us",
          url: "/about",
          icon: "business-sharp"
        },
        {
          title: "Contact Us",
          url: "/contact-us",
          icon: "people-sharp"
        },
        {
          title: "Registration",
          url: "/registration",
          icon: "person-add-sharp"
        },
        {
          title: "Login",
          url: "/login",
          icon: "person-sharp"
        },
      ]
  }
}
