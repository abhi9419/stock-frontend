import {HttpClient, HttpParams} from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import {ApiUrlService} from "./api-url.service";

@Injectable()
export class HttpRequestService {

    private httpUrl: string;
    contentLoaded: EventEmitter<any> = new EventEmitter();

    constructor(private http: HttpClient,
                private apiUrlService: ApiUrlService
    ) {
    }

    setUrl(url: string){
        this.httpUrl = url;
    }


    sendPost(postData: any) {
        const body = new HttpParams()
            .set('data', JSON.stringify(postData));
        const url = this.apiUrlService.getBaseUrl() + this.httpUrl;
        this.http.post<any[]>(url, body)
            .subscribe(data => {
                    console.log(data);
                    this.contentLoaded.emit(data);
                },
                error => {
                    console.log(error);
                    this.contentLoaded.emit(false);
                }
            );
    }

    sendGet() {
        const url = this.apiUrlService.getBaseUrl() + this.httpUrl;
        this.http.get<any[]>(url)
            .subscribe(data => {
                    console.log(data);
                    this.contentLoaded.emit(data);
                },
                error => {
                    console.log(error);
                    this.contentLoaded.emit(false);
                }
            );
    }


}
