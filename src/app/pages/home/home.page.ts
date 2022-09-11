import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/api/loader.service';
import { TurfApiService } from 'src/api/turf_api.service';
import { BaseHelper } from 'src/helper/baseHelper';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
  };

  turfList: any = [
    {
      turf_id: 1,
      'turf_name': 'Turf 1',
      'img': 'https://www.teahub.io/photos/full/9-96672_1920x1080-images-about-football-wallpapers-hd-on-pinterest.jpg',
      'turf_description': "Keep close to Nature's heart... and break clear away, once in awhile,and climb a mountain or spend a week in the woods. Wash your spirit clean."
    },
  ]

  loading: boolean = true;

  constructor(private b: BaseHelper, private turfApiService: TurfApiService, private loader: LoaderService) { }

  ngOnInit() {
    this.getTurfList();
  }

  getTurfList() {
    this.turfApiService.getTurfList().subscribe((res) => {
      this.turfList = res;
      this.loading = false;
    },
      (error) => {
        throw error
      })
  }

  getTurfById() {
    this.turfApiService.getTurfList().subscribe((res) => {
      console.log(res);
    },
      (error) => {
        throw error
      })
  }

  onSearch(ev) {
    let val = ev.target.value;
    this.turfApiService.getSearchedTurf(val).subscribe((res) => {
      this.turfList = res;
    },
      (error) => {
        throw error
      })
  }
  navigate(path, data) {
    this.b.clearNavigate(path, data);
  }
}
