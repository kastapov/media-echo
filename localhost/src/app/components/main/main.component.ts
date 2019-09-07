import { Component, OnInit } from '@angular/core';
import {GoogleSearchService} from '../../services/google-search.service';
import { BlacklistService } from 'src/app/services/blacklist.service';
import {PageExtractorService} from '../../services/page-extractor.service';
import {ArticleItem} from '../../interfaces/article-item';

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
  startOn = true;
  data = {
    title: null,
    twitter: null,
  };
  articles: Array<ArticleItem> = [];
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

  filter(x) {
    const index = this.checbbox.indexOf(x);
    if (index >= 0) {
      return this.checbbox.splice(index, 1);
    } else {
      return this.checbbox.push(x);
    }
  }

  includes(x) {
    return this.checbbox.includes(x);
  }

  seek() {
    this.open = false;
    this.pageExtractorService.processCrawl().then(() => {
      this.warning = this.blackListService.checkDomainBlacklisted(this.pageExtractorService.targetUrl);
      this.googleSearchService.getArticles(this.pageExtractorService.title);
      this.googleSearchService.getImages(this.pageExtractorService.imageUrl);
    });
  }

  randomDate() { 
    const number = Math.floor(Math.random() * 8); 
    return this.dates[number]
  }
}

