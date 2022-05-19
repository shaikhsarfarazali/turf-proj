import { Component, OnInit } from '@angular/core';
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

  turfList = [
    {
      'title': 'Turf 1',
      'img': 'https://www.teahub.io/photos/full/9-96672_1920x1080-images-about-football-wallpapers-hd-on-pinterest.jpg',
      'desc': "Keep close to Nature's heart... and break clear away, once in awhile,and climb a mountain or spend a week in the woods. Wash your spirit clean."
    },
    {
      'title': 'Turf 2',
      'img': 'https://www.teahub.io/photos/full/9-96672_1920x1080-images-about-football-wallpapers-hd-on-pinterest.jpg',
      'desc': "Keep close to Nature's heart... and break clear away, once in awhile,and climb a mountain or spend a week in the woods. Wash your spirit clean."
    },
    {
      'title': 'Turf 3',
      'img': 'https://www.teahub.io/photos/full/9-96672_1920x1080-images-about-football-wallpapers-hd-on-pinterest.jpg',
      'desc': "Keep close to Nature's heart... and break clear away, once in awhile,and climb a mountain or spend a week in the woods. Wash your spirit clean."
    },
    {
      'title': 'Turf 2',
      'img': 'https://www.teahub.io/photos/full/9-96672_1920x1080-images-about-football-wallpapers-hd-on-pinterest.jpg',
      'desc': "Keep close to Nature's heart... and break clear away, once in awhile,and climb a mountain or spend a week in the woods. Wash your spirit clean."
    },
    {
      'title': 'Turf 3',
      'img': 'https://www.teahub.io/photos/full/9-96672_1920x1080-images-about-football-wallpapers-hd-on-pinterest.jpg',
      'desc': "Keep close to Nature's heart... and break clear away, once in awhile,and climb a mountain or spend a week in the woods. Wash your spirit clean."
    },
    {
      'title': 'Turf 3',
      'img': 'https://www.teahub.io/photos/full/9-96672_1920x1080-images-about-football-wallpapers-hd-on-pinterest.jpg',
      'desc': "Keep close to Nature's heart... and break clear away, once in awhile,and climb a mountain or spend a week in the woods. Wash your spirit clean."
    }
  ]

  constructor(private b: BaseHelper) { }

  ngOnInit() { }

  navigate(path) {
    this.b.navigate(path);
  }
}
