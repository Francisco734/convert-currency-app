import { Component, OnInit } from '@angular/core';
import { ConversionHistoryService } from '../../services/conversion-history.service';
import { catchError, throwError } from 'rxjs';
import { FLAG_URL } from 'src/app/config/config';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  histories: any = [];
  loading:boolean = true;
  flag_url: string = FLAG_URL;
  error: boolean = false;
  error_msj: string = '';

  constructor(public history: ConversionHistoryService) { }

  ngOnInit(): void {
    this.getHistory();
  }

  getHistory() {
    this.history
      .index()
      .pipe(
        catchError((err: any) => {
          let msj = err.error.message;
          this.error = true;
          this.error_msj = msj;
          this.loading = false;
          return throwError(() => new Error(msj));
        })
      )
      .subscribe((data: any) => {
        let dataArr = Object.values(data.historical)
        this.histories = dataArr
        this.loading = false;
      });
  }

}
