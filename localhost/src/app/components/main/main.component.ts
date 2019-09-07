import { Component, OnInit } from '@angular/core';
import {GoogleSearchService} from '../../services/google-search.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  
  checbbox = [];
  query = '';

  constructor(private googleSearchService: GoogleSearchService) { }

  ngOnInit() {
  }

  searchImages() {
    this.googleSearchService.getImages(this.query);
  }

  filter(x) {
    const index = this.checbbox.indexOf(x);
    if (index >= 0) {
      return this.checbbox.splice(index,1)
    } else {
      return this.checbbox.push(x)
    }
  }

  send() {
    
  }

}
