import { Component, OnInit } from '@angular/core';
import { BlogComponent } from "../blog/blog.component";
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

import { BlogsService } from '../../services/blogs-service.service';

import BlogPost from '../../models/blog-post.model';

@Component({
  selector: 'app-blogs',
  imports: [
    BlogComponent,
    CommonModule,
    MatListModule
  ],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent implements OnInit {

  constructor(private blogsService: BlogsService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  posts: BlogPost[] = [];
  errorMessage: string = '';

  loadPosts(): void {
    this.blogsService.getPosts().subscribe({
      next: (data) => {
        console.log(data);
        this.posts = data.data;
      },
      error: (error) => {
        this.errorMessage = 'Error fetching posts: ' + error;
        console.error(error);
      }
    });
  }


}