import { Component } from '@angular/core';
import { BlogsService } from '../../../services/blogs-service.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


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
  errorMessage: string = '';
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
        this.postDetail.mainImage = await this.processImageUrl(this.postDetail.mainImage);
        this.loading = false;
      },
      error: (error: Error) => {
        this.errorMessage = 'Error loading blog details: ' + error;
        this.loading = false;
        console.error(error);
      },
    });
  }

  async processImageUrl(url: string): Promise<string> {
    if (url.startsWith('https://api.unsplash.com/')) {
      try {
        const response = await fetch(url);
        const json = await response.json();
        return json.urls.regular;
      } catch (error) {
        console.error('Error fetching or parsing image URL:', error);
        return url; // Return original URL on error
      }
    }
    return url;
  }
}
