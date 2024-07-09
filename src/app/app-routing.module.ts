import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { HomeComponent } from './pages/home/home.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UploadComponent } from './pages/Upload/upload.component';
import { GifDetailComponent } from './pages/gif-detail/gif-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact-us', component: ContactComponent },
  { path: 'about-us', component: AboutMeComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'gifs/:title', component: GifDetailComponent },
  { path: '**', component: PageNotFoundComponent }  // Wildcard route
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', initialNavigation: 'enabledBlocking' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }