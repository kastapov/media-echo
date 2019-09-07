import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ImageKind} from '../interfaces/image-kind';
import {ImageResponse} from '../interfaces/image-response';
import {ArticleResponse} from '../interfaces/article-response';
import {ArticleItem} from '../interfaces/article-item';


@Injectable({
  providedIn: 'root'
})
export class GoogleSearchService {
  private apiKey = 'AIzaSyArdPCDEzUcmpNUcnJkaNHYp5CbdvZJ7as';
  private cx = '012156150781488256618:iipuzjzzjex';
  public images: Array<ImageKind> = [];
  public articles: Array<ArticleItem> = [];

  constructor(private http: HttpClient) {
  }

  getImages(query: string) {
    return this.http.get(`https://www.googleapis.com/customsearch/v1?key=${this.apiKey}&cx=${this.cx}&q=${query}&excludeTerms=aeronet;ac24;svetkolemnas;zvedavec.org&searchType=image&num=8&alt=json`)
      .subscribe(response => {
        const customSearchResponse = response as ImageResponse;
        this.images = customSearchResponse.items;
      });
  }

  getArticles(query: string) {
    return this.http.get(`https://www.googleapis.com/customsearch/v1?key=${this.apiKey}&cx=${this.cx}&q=${query}&excludeTerms=aeronet;ac24;svetkolemnas;zvedavec.org&num=8&alt=json`)
      .subscribe(response => {
        const customSearchResponse = response as ArticleResponse;
        this.articles = customSearchResponse.items;
      });
  }
}
