import { Component, OnInit } from '@angular/core';
import {GoogleSearchService} from '../../services/google-search.service';
import { BlacklistService } from 'src/app/services/blacklist.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  warning = false;
  open = true;
  checbbox = [];
  query = '';
  startOn = true;
  data = {
    website: null,
    title: null,
    twitter: null,
  };

  constructor(
    private googleSearchService: GoogleSearchService,
    private blackListService: BlacklistService,
  ) { }

  ngOnInit() {
    const urlParams = new URLSearchParams(window.location.search).get('url');
    if (this.blackListService.checkDomain(urlParams || '')) {
      this.warning = true;
    }
    this.data.website  = {
      percent: '90%',
      articles: [
        {
          title: 'necosdsadadasdd asd asdad asd ads',
          link: 'sadsadsadasdasdsadasddsaasdd',
          image: 'https://static01.nyt.com/images/2019/09/07/world/06hkecon1-print/merlin_159784731_ac63cf91-d398-4bc5-9718-2d00178aa902-articleLarge.jpg?quality=75&auto=webp&disable=upscale',
          displayLink: 'adsadadsda'
        }
      ]
    }
  }

  searchImages(x) {
    this.googleSearchService.getImages(x);
  }

  filter(x) {
    const index = this.checbbox.indexOf(x);
    if (index >= 0) {
      return this.checbbox.splice(index,1)
    } else {
      return this.checbbox.push(x)
    }
  }

  includes(x) {
    return this.checbbox.includes(x)
  }

  send() {
    this.open = false;
  }

}
