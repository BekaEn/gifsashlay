import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

import { GifDetailComponent } from './pages/gif-detail/gif-detail.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoadMoreBtnComponent } from './shared/components/load-more-btn/load-more-btn.component';

import { CarouselModule } from 'ngx-owl-carousel-o';
import {HttpClientModule} from '@angular/common/http';

import { AboutMeComponent } from './pages/about-me/about-me.component';
import { LogoComponent } from './shared/components/logo/logo.component';
import { HomeComponent } from './pages/home/home.component'
import { DropdownComponent } from './shared/components/dropdown/dropdown.component';
import { BlogListComponent } from './pages/blog-list/blog-list.component';

import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AdminComponent } from './pages/admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MobileHeaderComponent } from './shared/components/mobile-header/mobile-header.component';
import { DatePipe } from '@angular/common';
import { UploadComponent } from './pages/Upload/upload.component';
import { MetaTagsService } from './shared/service/meta-tags.service'; // Import MetaTagsService

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,

    GifDetailComponent,
    
    ContactComponent,
    LoadMoreBtnComponent,

    AboutMeComponent,
    LogoComponent,
    HomeComponent,
    DropdownComponent,
    BlogListComponent,

    PrivacyPolicyComponent,
    UploadComponent,

    PageNotFoundComponent,
    AdminComponent,
    MobileHeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CarouselModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [DatePipe, MetaTagsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
