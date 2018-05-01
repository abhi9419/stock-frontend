import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiUrlService} from '../../services/api-url.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpRequestService} from "../../services/http-request.service";

declare const $: any;

@Component({
    selector: 'app-symbols',
    templateUrl: './symbols.component.html',
    styleUrls: ['./symbols.component.css']
})
export class SymbolsComponent implements OnInit, OnDestroy {

    symbolSubscriber: any;
    symbolLoaded = false;
    symbolData: any;

    constructor(private httpRequestService: HttpRequestService,  private router: Router) {
    }

    ngOnInit() {
        this.symbolSubscriber = this.httpRequestService.contentLoaded.subscribe(params => {
            this.symbolData = params['data'];
            this.symbolLoaded = true;
            setTimeout(() => {
                $('#symbol-table').DataTable();
            }, 100);
        });
        this.httpRequestService.setUrl('symbols');
        this.httpRequestService.sendGet();

    }

    ngOnDestroy() {
        this.symbolSubscriber.unsubscribe();
    }

    fetchListOfAllSymbol() {

    }

    viewDetail(symbol: string){
        symbol = symbol.toUpperCase();
        this.router.navigate(['symbol/', symbol]);
    }
}
