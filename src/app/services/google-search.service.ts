import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CustomSearchResponse} from '../interfaces/response';
import {Kind} from '../interfaces/kind';


@Injectable({
  providedIn: 'root'
})
export class GoogleSearchService {
  private apiKey = 'AIzaSyC3zVqbXZiCV_kBfE6QUj0AoeYKW4gUsKk';
  private cx = '000139076892268867619:b0ib82xeeen';
  public images: Array<Kind> = [];
  public articles: Array<Kind> = [];

  constructor(private http: HttpClient) {
  }

  getImages(query: string) {
    this.http.get(`https://www.googleapis.com/customsearch/v1?key=${this.apiKey}&cx=${this.cx}&q=${query}&searchType=image&alt=json`)
      .subscribe(response => {
        const customSearchResponse = response as CustomSearchResponse;
        this.images = customSearchResponse.items;
      });
  }

  getArticles(query: string) {
    this.http.get(`https://www.googleapis.com/customsearch/v1?key=${this.apiKey}&cx=${this.cx}&q=${query}&alt=json`)
      .subscribe(response => {
        const customSearchResponse = response as CustomSearchResponse;
        this.articles = customSearchResponse.items;
      });
  }
}
