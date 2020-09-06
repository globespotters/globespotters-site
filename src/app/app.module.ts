import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// App Modules
import { CoreModule } from './core/core.module';
import { MapModule } from './map/map.module';
import { StaticPagesModule } from './static-pages/static-pages.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    MapModule,
    StaticPagesModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
