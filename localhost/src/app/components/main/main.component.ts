import { Component, OnInit } from '@angular/core';
import {GoogleSearchService} from '../../services/google-search.service';
import { BlacklistService } from 'src/app/services/blacklist.service';
import {PageExtractorService} from '../../services/page-extractor.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  warning = false;
  open = true;
  checkImage = true;
  checkTitle = true;
  startOn = true;
  percentage = [89, 76, 68, 61, 54, 41, 31, 18];

  constructor(
    private googleSearchService: GoogleSearchService,
    private blackListService: BlacklistService,
    private pageExtractorService: PageExtractorService
  ) { }

  ngOnInit() {

  }

  searchImages(x) {
    this.googleSearchService.getImages(x);
  }

  seek() {
    this.open = false;
    this.pageExtractorService.processCrawl().then(() => {
      this.warning = this.blackListService.checkDomainBlacklisted(this.pageExtractorService.targetUrl);
      this.googleSearchService.getArticles(this.pageExtractorService.title);
      this.googleSearchService.getImages(this.pageExtractorService.imageUrl);
    });
  }

}
