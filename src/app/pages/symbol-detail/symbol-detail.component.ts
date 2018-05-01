import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpRequestService} from "../../services/http-request.service";

@Component({
    selector: 'app-symbol-detail',
    templateUrl: './symbol-detail.component.html',
    styleUrls: ['./symbol-detail.component.css']
})
export class SymbolDetailComponent implements OnInit, OnDestroy {

    currentPageSubscriber: any;
    currentSymbol: string;
    latestSymbolValue = {open: 0, high: 0, low: 0, close: 0, volume: 0, average: 0};
    secondLatestSymbolValue = {open: 0, high: 0, low: 0, close: 0, volume: 0, average: 0};
    latestSymbolValueSubscriber: any;


    constructor(private route: ActivatedRoute, private httpRequestService: HttpRequestService) {
    }

    ngOnInit() {
        this.currentPageSubscriber = this.route.params.subscribe(params => {
            this.currentSymbol = params['symbol'] === undefined ? '' : params['symbol'];
            this.currentSymbol = this.currentSymbol.toUpperCase();

            this.fetchLatesSymbolValues();
            this.fetchDataFromApiToBackend();
        });
        this.latestSymbolValueSubscriber = this.httpRequestService.contentLoaded.subscribe(params => {
            if (params['id'] === 2) {
                const data = params['data']['data'];
                this.processLatestSymbolValue(data);
            }
        });

    }

    ngOnDestroy() {
        this.currentPageSubscriber.unsubscribe();
        this.latestSymbolValueSubscriber.unsubscribe();
    }

    fetchDataFromApiToBackend() {
        this.httpRequestService.setUrl('symbol/fetch/' + this.currentSymbol);
        this.httpRequestService.sendGetWithIdentifier(1);
    }

    fetchLatesSymbolValues() {
        this.httpRequestService.setUrl('symbol/current/' + this.currentSymbol);
        this.httpRequestService.sendGetWithIdentifier(2);
    }

    processLatestSymbolValue(data: any) {
        this.latestSymbolValue.open = data['open'];
        this.latestSymbolValue.high = data['high'];
        this.latestSymbolValue.close = data['close'];
        this.latestSymbolValue.volume = data['volume'];
        this.latestSymbolValue.low = data['low'];
        this.latestSymbolValue.average = (this.latestSymbolValue.open + this.latestSymbolValue.high + this.latestSymbolValue.low + this.latestSymbolValue.close) / 4;
    }

}
