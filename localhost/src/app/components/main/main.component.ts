import { Component, OnInit } from '@angular/core';
import {GoogleSearchService} from '../../services/google-search.service';
import { BlacklistService } from 'src/app/services/blacklist.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  
  open = true;
  checbbox = [];
  query = '';
  data = {
    website: null,
    title: null,
    twitter: null,
  };

  constructor(
    private googleSearchService: GoogleSearchService,
    private blackListService: BlacklistService
  ) { }

  ngOnInit() {
    this.data.website  = {
      percent: '90%'
    }
    this.blackListService.checkDomain()
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
