import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiUrlService} from '../../services/api-url.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalSymbol = 0;
  name = '';

  constructor(private http: HttpClient, private apiUrl: ApiUrlService) {
  }

  ngOnInit() {
    // this.fetchTotalSymbol();
  }

  fetchTotalSymbol() {
    this.http.get(this.apiUrl.getBaseUrl() + 'symbol/count').subscribe(data => {
      this.totalSymbol = +data;
    });
  }

}
