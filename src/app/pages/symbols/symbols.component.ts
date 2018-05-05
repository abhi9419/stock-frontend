import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SymbolListService} from "../../services/symbol-list.service";

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

    constructor(private httpRequestService: SymbolListService, private router: Router) {
    }

    ngOnInit() {
        this.symbolSubscriber = this.httpRequestService.outputSymbolData.subscribe(params => {
            this.symbolData = params;
            setTimeout(() => {
                $('#symbol-table').DataTable({
                    "destroy": true
                });
            }, 100);
            this.symbolLoaded = true;
        });
        this.httpRequestService.getSymbolList(false);

    }

    ngOnDestroy() {
        this.symbolSubscriber.unsubscribe();
    }


    viewDetail(symbol: string) {
        symbol = symbol.toUpperCase();
        this.router.navigate(['symbol/', symbol]);
    }

    forceRefreshList() {
        this.symbolData = null;
        this.symbolLoaded = false;
        this.httpRequestService.getSymbolList(true);
    }
}
