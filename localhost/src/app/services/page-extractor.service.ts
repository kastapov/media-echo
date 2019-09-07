import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GoogleSearchService} from './google-search.service';

@Injectable({
  providedIn: 'root'
})
export class PageExtractorService {
  public targetUrl: string;
  public imageUrl: string;
  public title: string;
  private pageSource: string;
  private pageDom: Document;

  constructor(private http: HttpClient, private googleSearchService: GoogleSearchService) { }

  public processCrawl() {
    this.extractUrlToCrawl();
    this.getPageContents();
  }

  private extractTitle() {
    const titleDom = this.pageDom.getElementsByTagName('title');
    // @ts-ignore
    this.title = titleDom.value;
  }

  private extractImage() {

  }

  private extractUrlToCrawl() {
    const url = window.location.href;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      this.targetUrl = httpParams.get('url');
    }
  }

  private getPageContents() {
    this.http.get(this.targetUrl).subscribe(response => {
      // @ts-ignore
      this.pageSource = response;
      this.parseDomContents();
    });
  }

  private parseDomContents() {
    const parser = new DOMParser();
    this.pageDom =  parser.parseFromString(this.pageSource, 'text/html');
    this.extractTitle();
  }
}
