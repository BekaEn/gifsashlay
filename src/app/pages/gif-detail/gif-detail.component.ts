import { Meta, Title } from '@angular/platform-browser';
import { Component, OnInit, Inject, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSharingService } from 'src/app/shared/service/data-sharing.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MetaTagsService } from 'src/app/shared/service/meta-tags.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';

const META_TAGS_KEY = makeStateKey<any>('metaTags');

@Component({
  selector: 'app-gif-detail',
  templateUrl: './gif-detail.component.html',
  styleUrls: ['./gif-detail.component.scss']
})
export class GifDetailComponent implements OnInit {
  public gif: any = {};
  public gifUrl: any;
  private listJsonData: any = [];

  constructor(
    private dataService: DataSharingService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private metaService: MetaTagsService,
    private transferState: TransferState,
    private titleService: Title,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  ngOnInit(): void {
    
    this.loadListJson().then(listJsonLoaded => {
      if (listJsonLoaded) {
        this.route.params.subscribe(params => {
          const title = params['title'];
          if (title) {
            this.gif = this.listJsonData.find((item: any) => item.title === title);
            if (this.gif) {
              this.gifUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.gif.src);

              const metaTags = {
                title: this.gif.title,
                description: 'No description available',
                image: this.gif.gifSrc
              };

              
              this.transferState.set(META_TAGS_KEY, metaTags);

              if (isPlatformBrowser(this.platformId)) {
                this.metaService.updateMetaTags(metaTags);
              }
              if (isPlatformServer(this.platformId)) {
                this.titleService.setTitle(metaTags.title);
                this.metaService.updateMetaTags(metaTags);
              }
            } else {
           
            }
          } else {
           
          }
        });
      } else {
       
      }
    });

    if (isPlatformBrowser(this.platformId)) {
     
    }
  }

  async loadListJson(): Promise<boolean> {
    try {
      const response = await this.http.get('http://localhost:4000/list.json').toPromise();
      this.listJsonData = response;
      return true;
    } catch (error) {
      
      return false;
    }
  }
}