import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';

import { BlogComponent } from "../blog/blog.component";
import { BlogsService } from '../../services/blogs-service.service';
import { PaginationComponent } from '../pagination/pagination.component';
import BlogPost from '../../models/blog-post.model';

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
  pageSize: number = 2; // Initial page size
  totalPosts: number = 0;
  errorMessage: string = '';

  constructor(private blogsService: BlogsService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.blogsService.getPosts(this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        console.log(res);
        this.posts = res.data;
        this.totalPosts = res.totalPosts;
      },
      error: (error) => {
        this.errorMessage = 'Error fetching posts: ' + error;
        console.error(error);
      }
    });
    this.loading = false;
  }


  onPageFired(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadPosts();
  }

}