import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination', imports: [
    MatPaginatorModule
  ],
  templateUrl: './pagination.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PaginationComponent {
  @Input() totalPosts: number = 0;
  @Input() pageSize: number = 10;
  @Input() currentPage: number = 1;
  @Input() loading: boolean = false;
  @Output() pageChanged = new EventEmitter<PageEvent>();

  totalPages: number = 1;
  pages: number[] = [];


  triggerParentLoading(pe: PageEvent): void {
    this.pageChanged.emit(pe);
  }

}
