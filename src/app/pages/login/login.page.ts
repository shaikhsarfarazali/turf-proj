import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { Validator } from 'src/api/api_base.service';
import { AuthService } from 'src/api/auth.service';
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
    private authService: AuthService,
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  get usEmail() {
    return this.loginForm.get('usEmail');
  }
  get usPassword() {
    return this.loginForm.get('usPassword');
  }

  get email() {
    return this.adminForm.get('email');
  }
  get adPassword() {
    return this.adminForm.get('password');
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.token) {
        let token = { token: params.token }
        this.authService.verifyToken(token).subscribe((res) => {
          if (res) {
            this.b.toast('User Verified Successfully, Please Login', 3000, 'success');
          }
        })
      }
    })
    this.loginForm = this.fb.group({
      usEmail: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(Validator.email)]],
      usPassword: ['', [Validators.required, Validators.maxLength(100)]],
    });
    this.adminForm = this.fb.group({
      email: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(Validator.email)]],
      password: ['', [Validators.required, Validators.maxLength(100)]],
    });
    this.slides.lockSwipes(true)
  }

  async login(ev?) {
    let params: any;
    let name: string;
    this.b.loadLoading(true);
    if (ev) {
      let data = this.loginForm?.value
      params = {
        email: data.usEmail,
        password: data.usPassword,
      }
      name = "userLogin"
    } else {
      params = this.adminForm?.value
      name = "adminLogin"
    }
    (await this.authService[name](params)).subscribe(
      async (result) => {
        const r: any = result;

        this.b.loadLoading(false);
        console.log(`login??`, r);
        if (r.token) {
          this.b.setJws(r.token, r.mediaUrl);
          this.navigate('/home')
          // this.b.navigateRoot(`/${this.rootPath}`);
        } else {
          this.b.toast(r.error, 2000, 'danger');
        }
      },
      (error) => {
        this.b.toast(error?.error['message'][0], 2000, 'danger');
        console.log(`err?`, error);
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
