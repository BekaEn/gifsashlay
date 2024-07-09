import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface IMetaTags {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MetaTagsService {
  constructor(private meta: Meta, private titleService: Title) { }

  updateMetaTags(tags: IMetaTags) {
    this.titleService.setTitle(tags.title);
    this.meta.updateTag({ name: 'description', content: tags.description });
    if (tags.keywords) {
      this.meta.updateTag({ name: 'keywords', content: tags.keywords });
    }
    if (tags.image) {
      this.meta.updateTag({ property: 'og:image', content: tags.image });
      this.meta.updateTag({ property: 'og:url', content: tags.image });
      this.meta.updateTag({ property: 'og:title', content: tags.title });
      this.meta.updateTag({ property: 'og:description', content: tags.description });
    }
  }
}