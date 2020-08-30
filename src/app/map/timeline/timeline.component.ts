import { Component, OnInit } from '@angular/core';
import { TimelineService } from '../../core/timeline.service';
import { NewsService } from '../../core/news.service';
import { NewsArticle } from '../../shared/interfaces';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: [ './timeline.component.scss' ]
})
export class TimelineComponent implements OnInit {
  public articles: NewsArticle[] = [];

  constructor(public timelineService: TimelineService, private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getArticles().subscribe(
      (articles: NewsArticle[]) => {
        this.articles = articles;
      },
      error => {
        console.log('Uh-oh' + error);
      }
    );
  }

}
