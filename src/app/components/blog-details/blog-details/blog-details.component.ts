import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { BlogsService } from '../../../services/blogs-service.service';
import BlogPost from '../../../models/blog-post.model';

@Component({
  selector: 'app-blog-details',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent {

  postId: string | null = '';
  loading: boolean = false;
  postDetail: BlogPost = {
    _id: "",
    title: "",
    content: "",
    mainImage: "",
    extraSmallImages: [],
    tags: [],
    category: "",
    author: {
      id: "",
      name: ""
    }
  };

  constructor(private route: ActivatedRoute, private blogsService: BlogsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.postId = params.get('id');
      if (this.postId) {
        this.loadBlogDetails(this.postId);
      }
    });
  }

  loadBlogDetails(id: string): void {
    this.loading = true;
    this.blogsService.getPost(this.postId).subscribe({
      next: async (res) => {
        this.postDetail = res.data;
        this.loading = false;
      },
      error: (error: Error) => {
        this.loading = false;
        console.error(error);
      },
    });
  }

}
