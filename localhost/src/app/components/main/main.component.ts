import { Component, OnInit } from '@angular/core';
import {GoogleSearchService} from '../../services/google-search.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  query = '';

  constructor(private googleSearchService: GoogleSearchService) { }

  ngOnInit() {
  }

  searchImages() {
    this.googleSearchService.getImages(this.query);
  }

}
