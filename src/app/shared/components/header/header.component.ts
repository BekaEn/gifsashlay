import { Component, HostListener, Inject, Input, PLATFORM_ID } from '@angular/core';
import { BLOG_TYPES } from '../../constants/blog-types';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isMenuOpened = false;
  displayDropdown = false;
  blog_types = BLOG_TYPES
  isBrowser = false;
  constructor(
    private router: Router, 
    @Inject(PLATFORM_ID) private plateform_id) {
      this.isBrowser = isPlatformBrowser(this.plateform_id);
    }

  @HostListener('document:click', ['$event'])
  open(event: any) {
    if(this.displayDropdown && this.isBrowser) {
      if(event.target.id != 'dropdown' && event.target.id != 'dropdown-open' && event.target.id != 'dropdown-icon') {
        this.displayDropdown = false;
      }
    }
  }
  
  openOptions(): void {
    this.displayDropdown = true;
  }

  selectedType(value: string): void {
    this.router.navigate(['/blogs', value])
  }
}
