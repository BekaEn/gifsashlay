import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-load-more-btn',
  templateUrl: './load-more-btn.component.html',
  styleUrls: ['./load-more-btn.component.scss']
})
export class LoadMoreBtnComponent {
  @Output() emitLoadMore = new EventEmitter();

  loadMore(): void {
    this.emitLoadMore.emit();
  }
  
}
