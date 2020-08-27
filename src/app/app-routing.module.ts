import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Pages
import { AboutComponent } from './static-pages/about/about.component';
import { FaqComponent } from './static-pages/faq/faq.component';
import { ContactComponent } from './static-pages/contact/contact.component';
import { PrivacyPolicyComponent } from './static-pages/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './static-pages/terms-of-service/terms-of-service.component';
import {ErrorComponent} from './pages/error/error.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-of-service', component: TermsOfServiceComponent },
  { path: '', pathMatch: 'full', redirectTo: '/map' },
  { path: '**', redirectTo: '/map' },
  { path: 'error', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
