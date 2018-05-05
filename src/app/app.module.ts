import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {FullComponent} from './layouts/full/full.component';
import {SidebarComponent} from "./helper/sidebar/sidebar.component";
import {RightSidebarComponent} from "./helper/right-sidebar/right-sidebar.component";
import {HeaderComponent} from "./helper/header/header.component";
import {AppRoutingModule} from "./app-routing.module";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {SymbolsComponent} from "./pages/symbols/symbols.component";
import {HttpClientModule} from "@angular/common/http";
import {ApiUrlService} from "./services/api-url.service";
import {HttpRequestService} from "./services/http-request.service";
import { SymbolDetailComponent } from './pages/symbol-detail/symbol-detail.component';
import {SymbolListService} from "./services/symbol-list.service";


@NgModule({
    declarations: [
        AppComponent,
        FullComponent,
        SidebarComponent,
        HeaderComponent,
        RightSidebarComponent,
        DashboardComponent,
        SymbolsComponent,
        SymbolDetailComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [ApiUrlService,HttpRequestService,SymbolListService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
