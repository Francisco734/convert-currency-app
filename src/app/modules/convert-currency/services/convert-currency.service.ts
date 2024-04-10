import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_HOST, API_KEY, API_URL } from 'src/app/config/config';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConvertCurrencyService {

  private _headers = new HttpHeaders({
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': API_HOST,
  });

  constructor(private http: HttpClient) {}

  convert(have: string, want: string, amount: string) {
    let url = `${API_URL}?have=${have}&want=${want}&amount=${amount}`;
    return this.http
      .get(url, { headers: this._headers })
      .pipe(map((data: any) => data));
  }
}
