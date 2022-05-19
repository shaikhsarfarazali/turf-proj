import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import { Validator } from 'src/api/api_base.service';
import { PublicApiService } from 'src/api/public_api.service';
import { BaseHelper } from 'src/helper/baseHelper';
import { GlobalProvider } from 'src/helper/global';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  @ViewChild('slides', { static: true }) slides: IonSlides;
  // slider
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    onlyExternal: false,
  };

  form: FormGroup;
  adminForm: FormGroup;

  userForm: boolean = true;
  keydown(event) {
    if (event.keyCode === 9) {
      event.preventDefault();
    }
  }
  constructor(
    private b: BaseHelper,
    private g: GlobalProvider,
    private api: PublicApiService
  ) {

    this.form = new FormBuilder().group({
      id: 0,
      name: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(Validator.name)]],
      email: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(Validator.email)]],
      password: ['', [Validators.required, Validators.maxLength(100)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(100)]],
      tnc: [false]
      // contact: ['', [Validators.required, Validators.maxLength(10)]],
      // username: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(/^[a-zA-Z\-]+$/)]],
    });

    this.adminForm = new FormBuilder().group({
      id: 0,
      adName: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(Validator.name)]],
      adEmail: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(Validator.email)]],
      adPassword: ['', [Validators.required, Validators.maxLength(100)]],
      adConfirmPassword: ['', [Validators.required, Validators.maxLength(100)]],
      adTurfName: ['', [Validators.required, Validators.maxLength(100)]],
      adTnc: [false]
      // contact: ['', [Validators.required, Validators.maxLength(10)]],
      // username: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(/^[a-zA-Z\-]+$/)]],
    });

  }

  // User Form
  get name() {
    return this.form.get('name');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
  get tnc() {
    return this.form.get('tnc');
  }

  // Admin Form
  get adName() {
    return this.adminForm.get('adName');
  }
  get adEmail() {
    return this.adminForm.get('adEmail');
  }
  get adPassword() {
    return this.adminForm.get('adPassword');
  }
  get adConfirmPassword() {
    return this.adminForm.get('adConfirmPassword');
  }
  get adTurfName() {
    return this.adminForm.get('adTurfName');
  }
  get adTnc() {
    return this.adminForm.get('adTnc');
  }

  ngOnInit() {
    this.slides.lockSwipes(true)
  }

  async register(status) {
    this.b.loadLoading(true);
    let postData;
    if (status) {
      postData = {
        userData: {
          ...this.form?.value
        },
      };
    } else {
      postData = {
        userData: {
          ...this.adminForm?.value
        },
      };
    }
    (await this.api.register(postData)).subscribe(
      async (result) => {
        const r: any = result;
        console.log(`login??`, r);
        if (r.formFilled) {
          this.b.setJws(r.token, r.mediaUrl);

          this.b.loadLoading(false);
          // this.b.navigateRoot(`/${this.rootPath}`);
        } else {
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

  prev() {
    this.slides.lockSwipes(false)
    this.userForm = true;
    this.slides.slidePrev();
    this.slides.lockSwipes(true)
  }
}
