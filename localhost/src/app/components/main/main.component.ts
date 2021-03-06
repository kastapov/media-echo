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
  dates = [
    '23.2.2019','1.6.2019','14.3.2019','9.8.2019','10.8.2019','3.5.2019','26.4.2019','8.9.2019','29.5.2019'
  ]
  warning = false;
  open = true;
  checbbox = ['content','title','image'];
  query = '';
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

  seek() {
    this.open = false;
    this.pageExtractorService.processCrawl().then(() => {
      const url = this.pageExtractorService.targetUrl;
      const domain = this.blackListService.getDomain(url);
      this.warning = this.blackListService.checkDomainBlacklisted(this.pageExtractorService.targetUrl);
      this.googleSearchService.getArticles(this.pageExtractorService.title, domain);
      this.googleSearchService.getImages(this.pageExtractorService.imageUrl, domain);
    });
  }
}

