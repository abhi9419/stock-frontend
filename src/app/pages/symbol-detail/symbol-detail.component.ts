import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpRequestService} from "../../services/http-request.service";

@Component({
    selector: 'app-symbol-detail',
    templateUrl: './symbol-detail.component.html',
    styleUrls: ['./symbol-detail.component.css']
})
export class SymbolDetailComponent implements OnInit {

    currentPageSubscriber: any;
    currentSymbol: string;

    constructor(private route: ActivatedRoute,private httpRequestService: HttpRequestService) {
    }

    ngOnInit() {
        this.currentPageSubscriber = this.route.params.subscribe(params => {
            this.currentSymbol = params['symbol'] === undefined ? '' : params['symbol'];
            this.currentSymbol = this.currentSymbol.toUpperCase();
            this.httpRequestService.setUrl('symbol/fetch/'+this.currentSymbol);
            this.httpRequestService.sendGet();
        });
    }

    fetchDataFromApiToBackend() {

    }

}
