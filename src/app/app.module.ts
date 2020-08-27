import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';

// App Modules
import { CoreModule } from './core/core.module';
import { MapModule } from './map/map.module';
import { StaticPagesModule } from './static-pages/static-pages.module';

// Pages
import { ErrorComponent } from './pages/error/error.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ErrorComponent,
    PageNotFoundComponent
  ],
  imports: [
    CoreModule,
    MapModule,
    StaticPagesModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
