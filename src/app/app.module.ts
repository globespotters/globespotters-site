import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// App Modules
import { CoreModule } from './core/core.module';
import { MapModule } from './map/map.module';
import { StaticPagesModule } from './static-pages/static-pages.module';

import { AboutComponent } from './pages/about/about.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './pages/terms-of-service/terms-of-service.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    FaqComponent,
    ContactComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent
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
