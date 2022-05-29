import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Validator } from 'src/api/api_base.service';
import { PublicApiService } from 'src/api/public_api.service';
import { BaseHelper } from 'src/helper/baseHelper';
import { GlobalProvider } from 'src/helper/global';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {

  contactForm: FormGroup;

  get name() {
    return this.contactForm.get('name');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get subject() {
    return this.contactForm.get('subject');
  }
  get message() {
    return this.contactForm.get('message');
  }
  constructor(public fb: FormBuilder,
    private b: BaseHelper,
    private g: GlobalProvider,
    private api: PublicApiService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(Validator.name)]],
      email: ['', [Validators.required, Validators.minLength(3), Validators.pattern(Validator.email)]],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['',],
    })
  }

  ngOnInit() {
  }

  async onSubmit() {

    // Object.keys(this.contactForm.controls).forEach(field => {
    //   let control = this.contactForm.get(field);
    //   control.updateValueAndValidity();
    // });

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.b.loadLoading(true);
    let postData;
    postData = {
      userData: {
        ...this.contactForm?.value
      },
    };
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
}
