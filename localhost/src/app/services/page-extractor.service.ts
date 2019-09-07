import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PageExtractorService {

  constructor(private http: HttpClient) { }
  public targetUrl: string;
  public imageUrl: string;
  public title: string;
  private pageSource: string;
  private pageDom: Document;

  public processCrawl() {
    return new Promise(resolve => {
      this.extractUrlToCrawl();
      this.getPageContents(resolve);
    });
  }

  private extractTitle() {
    const titleDom = this.pageDom.getElementsByTagName('title');
    // @ts-ignore
    this.title = titleDom[0].innerHTML;
  }

  private extractUrlToCrawl() {
    const url = window.location.href;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      this.targetUrl = httpParams.get('url');
    }
  }

  private getPageContents(resolve) {
    this.http.get(this.targetUrl, {responseType: 'text'}).subscribe(response => {
      // @ts-ignore
      this.pageSource = response;
      this.parseDomContents();
      resolve();
    });
  }

  private parseDomContents() {
    const parser = new DOMParser();
    this.pageDom =  parser.parseFromString(this.pageSource, 'text/html');
    this.extractTitle();
    this.imageUrl = this.getFirstImage();
  }

  private getFirstImage() {
    const images = Array.from(this.pageDom.getElementsByTagName('img'));
    let imageCandidate = null;
    for (const image of images) {
      const width = image.getAttribute('width');
      const height = image.getAttribute('height');
      if (width && height) {
        if (imageCandidate) {
          if (imageCandidate.getAttribute('height') < image.getAttribute('height')) {
            imageCandidate = image;
          }
        } else {
          imageCandidate = image;
        }
        return imageCandidate && imageCandidate.getAttribute('src');
      }
    }
  }
}
