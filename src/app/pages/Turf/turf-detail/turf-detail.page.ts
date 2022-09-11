import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TurfApiService } from 'src/api/turf_api.service';

@Component({
  selector: 'app-turf-detail',
  templateUrl: './turf-detail.page.html',
  styleUrls: ['./turf-detail.page.scss'],
})
export class TurfDetailPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    autoplay: true,
    speed: 400
  };

  turfData: any = {}

  sampleImgUrl1: string = "https://images.unsplash.com/photo-1613336026275-d6d473084e85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80";
  sampleImgUrl2: string = "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80";

  loading: boolean = true;

  constructor(private route: ActivatedRoute, public modalCtrl: ModalController, private router: Router, private turfApiService: TurfApiService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.turfData = this.router.getCurrentNavigation().extras.state.user;
        this.getResources(this.turfData?.turf_id)
      }
    });
  }
  getResources(id) {
    this.turfApiService.getResourceById(id).subscribe((res) => {
      res.length > 0 ?
        (this.turfData['resources'] = res, this.loading = false) : '';
    },
      (error) => {
        throw error
      })
  }
}
