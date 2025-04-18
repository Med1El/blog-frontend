import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { HttpErrorResponse } from '@angular/common/http';

import { BlogComponent } from "../blog/blog.component";
import { PaginationComponent } from '../pagination/pagination.component';
import BlogPost from '../../../models/blog-post.model';
import { BlogsService } from '../../../services/blogs-service.service';

@Component({
  selector: 'app-blogs',
  imports: [
    CommonModule,
    BlogComponent,
    PaginationComponent,
    MatPaginatorModule
  ],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent implements OnInit {

  posts: BlogPost[] = [];

  loading: boolean = false;
  currentPage: number = 1;
  pageSize: number = 5; // Initial page size
  totalPosts: number = 0;
  errorMessage: string = '';

  constructor(private blogsService: BlogsService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.loading = true;
    this.blogsService.getPosts(this.currentPage, this.pageSize).subscribe({
      next: async (res: any) => {
        this.posts = res.data;
        this.totalPosts = res.totalPosts;
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => { // Type the error as HttpErrorResponse
        this.loading = false;
        console.error('Error fetching posts:', error);

        if (error.error instanceof ErrorEvent) {
          // Client-side error or network error
          this.errorMessage = 'Error fetching posts: ' + error.error.message;
        } else {
          // Backend returned an unsuccessful response code
          this.errorMessage = `Error fetching posts: Server returned code ${error.status}, message was: ${error.message} `;
        }
      }
    });
  }


  onPageFired(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadPosts();
  }

}