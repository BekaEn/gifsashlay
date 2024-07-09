import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isMenuOpened = false;
  public isBrowser = false
  public isScrollDown = false;
  public isScrollClicked: boolean;
  private scroll = 0;
  constructor(private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(platformId)
  }

  ngOnInit(): void {
    if(this.isBrowser) {
      this.renderer.listen(window, 'scroll', ($event) => {
        this.scroll = window.scrollY;
        if(window.scrollY > 0){
          this.isScrollDown = true;
        } else {
          this.isScrollDown = false;
          this.isScrollClicked = false;
        }
     })
    }
  }

  backToTop(): void {
    if(this.isBrowser) {
      this.isScrollClicked = true;
      window.scrollTo(0,0);
    }
  }

  openMenu(): void {
    this.isMenuOpened = !this.isMenuOpened
  }

  routerChange(): void {
    if(this.isMenuOpened) {
      this.isMenuOpened = false;
    }
  }
}
