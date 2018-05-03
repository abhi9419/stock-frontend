import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpRequestService} from "../../services/http-request.service";

declare const d3: any;
declare const nv: any;
declare const $: any;


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
    latestTimestamp: string;
    graphDataSubscriber: any;
    graphData: string;


    constructor(private route: ActivatedRoute, private httpRequestService: HttpRequestService) {
    }

    ngOnInit() {
        this.currentPageSubscriber = this.route.params.subscribe(params => {
            this.currentSymbol = params['symbol'] === undefined ? '' : params['symbol'];
            this.currentSymbol = this.currentSymbol.toUpperCase();
            this.fetchLatesSymbolValues();
            this.fetchDataFromApiToBackend();
            this.fetchGraphData();
        });
        this.latestSymbolValueSubscriber = this.httpRequestService.contentLoaded.subscribe(params => {
            if (params['id'] === 2) {
                const latest = params['data']['data']['0'];
                const secondLatest = params['data']['data']['1'];
                this.processLatestSymbolValue(latest);
                this.processSecondLatestSymbolValue(secondLatest);
            }
        });
        this.graphDataSubscriber = this.httpRequestService.contentLoaded.subscribe(params => {
            if (params['id'] === 3) {
                const data = params['data']['data'];
                this.graphData = JSON.stringify(data);
                console.log(this.graphData);
                this.n();
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
        this.httpRequestService.setUrl('symbol/recent2/' + this.currentSymbol);
        this.httpRequestService.sendGetWithIdentifier(2);
    }

    fetchGraphData() {
        this.httpRequestService.setUrl('symbol/graph-data/' + this.currentSymbol);
        this.httpRequestService.sendGetWithIdentifier(3);
    }

    processLatestSymbolValue(data: any) {
        this.latestSymbolValue.open = data['open'];
        this.latestSymbolValue.high = data['high'];
        this.latestSymbolValue.close = data['close'];
        this.latestSymbolValue.volume = data['volume'];
        this.latestSymbolValue.low = data['low'];
        this.latestSymbolValue.average = (this.latestSymbolValue.open + this.latestSymbolValue.high + this.latestSymbolValue.low + this.latestSymbolValue.close) / 4;
        this.latestTimestamp = data['timestamp'];
    }

    processSecondLatestSymbolValue(data: any) {
        this.secondLatestSymbolValue.open = data['open'];
        this.secondLatestSymbolValue.high = data['high'];
        this.secondLatestSymbolValue.close = data['close'];
        this.secondLatestSymbolValue.volume = data['volume'];
        this.secondLatestSymbolValue.low = data['low'];
        this.secondLatestSymbolValue.average = (this.secondLatestSymbolValue.open + this.secondLatestSymbolValue.high + this.secondLatestSymbolValue.low + this.secondLatestSymbolValue.close) / 4;
    }


    n() {

        nv.addGraph(function () {
            var chart = nv.models.cumulativeLineChart()
                .x(function (d) {
                    return d[0]
                })
                .y(function (d) {
                    return d[1]
                })
                .color(d3.scale.category10().range())
                .useInteractiveGuideline(true)
            ;

            chart.xAxis
                .tickFormat(function (d) {
                    return d3.time.format('%x')(new Date(d))
                })

            chart.yAxis
                .tickFormat(d3.format(''));

            console.log($("#chart1").attr("data-content"));

            d3.select('#chart1 svg')
                .datum(JSON.parse($("#chart1").attr("data-content")))
                .call(chart);


            return chart;
        });


    }

}
