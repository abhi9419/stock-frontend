import {EventEmitter, Injectable} from "@angular/core";
import {HttpRequestService} from "./http-request.service";

@Injectable()
export class SymbolListService {

    private localStorageKey = 'symbol-list';
    private symbolSubscriber: any;
    private symbolLoaded = false;
    private symbolData: { id: number, symbol: string, series: string, isin: string }[] = [];
    outputSymbolData: EventEmitter<any> = new EventEmitter();


    constructor(private httpRequestService: HttpRequestService) {

    }


    fetchSymbolList() {
        this.symbolSubscriber = this.httpRequestService.contentLoaded.subscribe(params => {
            if (params !== false) {
                const data = params['data'];
                data.forEach((s, i) => {
                    this.symbolData.push({id: s.id, symbol: s.symbol, series: s.series, isin: s.isin});
                });
                this.symbolLoaded = true;
                localStorage.setItem(this.localStorageKey, JSON.stringify(this.symbolData));
                this.outputSymbolData.emit(this.symbolData);
            } else {
                console.log("Something went wrong in the api");
            }
        });
        this.httpRequestService.setUrl('symbols');
        this.httpRequestService.sendGet();
    }

    getSymbolList(forceRefresh: boolean) {

        if (forceRefresh || localStorage.getItem(this.localStorageKey) === null) {
            console.log("API Call for Symbols");
            this.fetchSymbolList();
        } else {
            console.log("No API call attempted for Symbols from local storage");
            this.outputSymbolData.emit(JSON.parse(localStorage.getItem(this.localStorageKey)));
        }


    }


}
