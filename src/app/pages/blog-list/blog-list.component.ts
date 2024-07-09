import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DataSharingService } from 'src/app/shared/service/data-sharing.service';
import { MetaTagsService } from 'src/app/shared/service/meta-tags.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent {
  blogs = []
  blogType: string;
  totalData = []
  page = 0;

  constructor(
    private route: ActivatedRoute,
    private dataSharingService: DataSharingService,
    private title: Title
    ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['type']) {
        this.blogType = params['type'];
        this.title.setTitle(`${this.capitalizeFirstLetter(this.blogType)} Blogs`)
        const type = params['type']
        
      }
    })
  }

  capitalizeFirstLetter(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  loadMoreBlogs(): void {
    if(this.blogs.length != this.totalData.length) {
      this.page = this.page + 1;
      const data = this.totalData.slice(9 * this.page, this.blogs.length + 9);
      this.blogs = [...this.blogs, ...data];
    }
  }
}
