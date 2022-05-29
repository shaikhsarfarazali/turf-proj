import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import { PublicApiService } from 'src/api/public_api.service';
import { BaseHelper } from 'src/helper/baseHelper';
import { GlobalProvider } from 'src/helper/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slides', { static: true }) slides: IonSlides;
  // slider
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    onlyExternal: false,
  };

  // Form Variables
  adminForm: FormGroup;
  loginForm: FormGroup;

  userForm: boolean = true;

  constructor(
    private b: BaseHelper,
    private g: GlobalProvider,
    private api: PublicApiService,
    public fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      id: 0,
      username: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(/^[a-zA-Z\-]+$/)]],
      usPassword: ['', [Validators.required, Validators.maxLength(100)]],
    });
    this.adminForm = this.fb.group({
      id: 0,
      email: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      adPassword: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  get username() {
    return this.loginForm.get('username');
  }
  get usPassword() {
    return this.loginForm.get('usPassword');
  }

  get email() {
    return this.adminForm.get('email');
  }
  get adPassword() {
    return this.adminForm.get('adPassword');
  }

  ngOnInit() {
    this.slides.lockSwipes(true)
  }

  async login(status) {
    this.b.loadLoading(true);
    let postData;
    if (status) {
      postData = {
        userData: {
          ...this.loginForm?.value
        },
      };
    } else {
      postData = {
        userData: {
          ...this.adminForm?.value
        },
      };
    }
    (await this.api.login(postData)).subscribe(
      async (result) => {
        const r: any = result;

        this.b.loadLoading(false);
        console.log(`login??`, r);
        if (r.ok) {
          this.b.setJws(r.token, r.mediaUrl);

          // this.b.navigateRoot(`/${this.rootPath}`);
        } else {
          this.b.toast(r.error, 2000, 'danger');
        }
      },
      (error) => {
        console.log(`err?`, error);
        console.log(`err?`, error);
        // if(error.error && error.error.message) this.b.toastUp(error.error.message, 2000,
        //   "danger")
        this.b.loadLoading(false);
      }
    );
  }

  next() {
    this.slides.lockSwipes(false)
    this.userForm = false;
    this.slides.slideNext();
    this.slides.lockSwipes(true)
  }

  prev(ev) {
    this.slides.lockSwipes(false)
    this.userForm = true;
    this.slides.slidePrev();
    this.slides.lockSwipes(true)
  }
}
