import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { BACK_URL } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class ConversionHistoryService {
  prefix: string = 'convert-currency';
  fullUrl: string = `${BACK_URL}/${this.prefix}`;

  constructor(private http: HttpClient) {}

  index() {
    let url = `${this.fullUrl}/historical`;
    return this.http.get(url).pipe(map((data: any) => data));
  }

  store(store: any) {
    let url = `${this.fullUrl}/historical`;
    return this.http.post(url, store).pipe(map((data: any) => data));
  }
}
