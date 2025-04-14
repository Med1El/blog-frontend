import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';

import { BlogComponent } from "../blog/blog.component";
import { BlogsService } from '../../../services/blogs-service.service';
import { PaginationComponent } from '../pagination/pagination.component';
import BlogPost from '../../../models/blog-post.model';

@Component({
  selector: 'app-blogs',
  imports: [
    CommonModule,
    MatListModule,
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
  pageSize: number = 10; // Initial page size
  totalPosts: number = 0;
  errorMessage: string = '';

  constructor(private blogsService: BlogsService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  async loadPosts(): Promise<void> {
    this.loading = true;
    this.blogsService.getPosts(this.currentPage, this.pageSize).subscribe({
      next: async (res: any) => {
        this.posts = res.data;
        this.totalPosts = res.totalPosts;
        this.loading = false;
      },
      error: (error: Error) => {
        this.errorMessage = 'Error fetching posts: ' + error;
        console.error(error);
        this.loading = false;
      }
    });
  }

  async processImageUrl(url: string): Promise<string> {
    if (url.startsWith('https://api.pexels.com/v1/')) {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: 'YFZFIm5lhv8B1Ep2v77DxxM1uPIIkUuP37Ag8OuNYaj2aHsZSrytyfVF' // Replace with your actual API key
          }
        });

        if (!response.ok) {
          console.error(`Unsplash API error: ${response.status} - ${response.statusText}`);
          return url; // Return original URL on error
        }

        const json = await response.json();
        return json.urls.small;
      } catch (error) {
        console.error('Error fetching or parsing image URL with header:', error);
        return url; // Return original URL on error
      }
    }
    return url;
  }

  onPageFired(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadPosts();
  }

}