import { AfterContentChecked, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Validator } from 'src/api/api_base.service';
import { PublicApiService } from 'src/api/public_api.service';
import { BaseHelper } from 'src/helper/baseHelper';
import { GlobalProvider } from 'src/helper/global';
import SwiperCore, { Navigation, Pagination, EffectCube, A11y, SwiperOptions, EffectCards, EffectCoverflow } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, EffectCube, EffectCoverflow, A11y]);

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationPage implements OnInit {
  @ViewChild('swiper', { static: false }) swiper: SwiperComponent;
  // '"slide" | "fade" | "cube" | "coverflow" | "flip" | "creative" | "cards"'.
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    pagination: false,
    allowTouchMove: false,
    // effect: 'creative',
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
  constructor(private b: BaseHelper,
    private g: GlobalProvider,
    private api: PublicApiService) {
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

  ngOnInit(): void {

  }

  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
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

  slideNext() {
    this.userForm = false;
    this.swiper.swiperRef.slideNext(100);
  }
  slidePrev() {
    this.userForm = true;
    this.swiper.swiperRef.slidePrev(100);
  }
}
