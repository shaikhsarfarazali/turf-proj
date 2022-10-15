import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import { Validator } from 'src/api/api_base.service';
import { AuthService } from 'src/api/auth.service';
import { BaseHelper } from 'src/helper/baseHelper';
import { GlobalProvider } from 'src/helper/global';
import { PswrdValidator } from 'src/helper/pswrd.validator';

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

  userForm: boolean = true;

  form: FormGroup;
  adminForm: FormGroup;

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
  get mobile_no() {
    return this.form.get('mobile_no');
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
  get adMobile_no() {
    return this.adminForm.get('adMobile_no');
  }
  get adTnc() {
    return this.adminForm.get('adTnc');
  }

  constructor(private b: BaseHelper,
    private g: GlobalProvider,
    private authService: AuthService) {

  }

  ngOnInit(): void {
    this.form = new FormBuilder().group({
      id: 0,
      name: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(Validator.name)]],
      email: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(Validator.email)]],
      password: ['', [Validators.required, Validators.maxLength(100)]],
      confirmPassword: ['', [Validators.required]],
      mobile_no: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(Validator.phone)]],
      tnc: [false]
    }, {
      validator: PswrdValidator('password', 'confirmPassword')
    });

    this.adminForm = new FormBuilder().group({
      id: 0,
      adName: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(Validator.name)]],
      adEmail: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(Validator.email)]],
      adPassword: ['', [Validators.required, Validators.maxLength(100)]],
      adConfirmPassword: ['', [Validators.required, Validators.maxLength(100)]],
      adMobile_no: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(Validator.phone)]],
      adTnc: [false]
    });
  }

  ngAfterContentChecked(): void {
  }

  async register(ev?) {
    let params: any;
    let name: string;
    this.b.loadLoading(true);
    if (ev) {
      params = this.form?.value
      name = "userRegister";
    } else {
      let data = this.adminForm?.value
      params = {
        id: 0,
        name: data.adName,
        email: data.adEmail,
        password: data.adPassword,
        confirmPassword: data.adConfirmPassword,
        mobile_no: data.adMobile_no,
        tnc: data.adTnc
      }
      name = "adminRegister";
    }
    (await this.authService[name](params)).subscribe(
      async (res) => {
        const r: any = res;
        if (r.token) {
          localStorage.setItem('userToken', JSON.stringify(r.token));
          localStorage.setItem('userData', JSON.stringify(r.user));
          this.b.setJws(r.token, r.mediaUrl);
          this.navigate('/login')
          // this.b.toast('User Registered Successfully', 3000, 'success');
          this.b.toast('Verification Email is send please verify', 4000, 'success');
          this.b.loadLoading(false);
          // this.b.navigateRoot(`/${this.rootPath}`);
        } else {
          this.b.toast('Invalid User', 2000, 'danger');
        }
      },
      (error) => {
        console.log(`err?`, error);
        // if(error.error && error.error.message) this.b.toastUp(error.error.message, 2000,
        //   "danger")
        this.b.loadLoading(false);
      }
    );
  }

  navigate(path) {
    this.b.navigate(path);
  }

  next() {
    this.slides.lockSwipes(false)
    this.userForm = false;
    this.slides.slideNext();
    this.slides.lockSwipes(true)
  }

  prev(ev?) {
    this.slides.lockSwipes(false)
    this.userForm = true;
    this.slides.slidePrev();
    this.slides.lockSwipes(true)
  }
}
