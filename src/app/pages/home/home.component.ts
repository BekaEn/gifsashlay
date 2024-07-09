import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BlogPost } from 'src/app/shared/interfaces/blog-post.interface';
import { DataSharingService } from 'src/app/shared/service/data-sharing.service';
import { MetaTagsService } from 'src/app/shared/service/meta-tags.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private isBrowser: boolean = false;
  blogs: BlogPost[] = [];
  totalData: BlogPost[] = [];
  trendingBlogs: BlogPost[] = [];
  sportsBlogs: BlogPost[] = [];
  entertainmentBlogs: BlogPost[] = [];
  gifs: { title: string, src: string }[] = [];
  isLoading = true;
  totalSkeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  private apiUrl = environment.apiUrl;

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: false,
    center: true,
    dots: false,
    nav: true,
    autoHeight: true,
    autoWidth: true,
    navText: [
      '<i class="fa-sharp fa-solid fa-angle-left"></i>',
      '<i class="fa-sharp fa-solid fa-angle-right"></i>'
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      }
    }
  };
  page = 0;

  constructor(
    private dataSharingService: DataSharingService,
    private metaService: MetaTagsService,
    private http: HttpClient,
    private router: Router, // Inject Router
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    const metaObject = {
      title: 'Gifs Ashlay - Your Source for Quick and Informative Content',
      description: 'Explore Gifs  for concise and insightful articles on a wide range of topics. Get your daily dose of knowledge and stay informed with informative content.',
      keywords: 'Gifs Ashlay, Blog posts, Sports News, Game Analysis, Athlete Profiles, Sports Highlights, Team Updates, Sports Commentary, Match Previews, Sports Predictions, Player Statistics, Sporting Events, Financial Insights, Investment Tips, Market Analysis, Personal Finance, Economic News, Stock Market Trends, Financial Planning, Wealth Management, Portfolio Strategies, Tax Strategies, Nifty Forecast, Bank Nifty Analysis, Stock Index Predictions, Market Volatility, Trading Strategies, Technical Analysis, Market Trends, Options Trading, Investment Forecast, Market Sentiment'
    };
   
    this.fetchGifs();
  }

  fetchGifs(): void {
    this.http.get<{ title: string, src: string, uploadDate: string }[]>(`${this.apiUrl}/gifs`).subscribe(gifs => {
      this.gifs = gifs.sort((a, b) => {
        const dateA = new Date(a.uploadDate);
        const dateB = new Date(b.uploadDate);
        return dateB.getTime() - dateA.getTime();
      });
    });
  }

  redirectToGif(gif: { title: string, src: string }) {
    this.router.navigate(['/gifs', gif.title]);
  }
}
