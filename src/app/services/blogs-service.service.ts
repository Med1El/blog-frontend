import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import BlogPost from '../models/blog-post.model';

interface ApiResponse1 {
  success: boolean;
  data: BlogPost[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
}

interface ApiResponse2 {
  success: boolean;
  data: BlogPost;
}



@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  private apiUrl = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) { }

  getPosts(page: number, limit: number): Observable<ApiResponse1> {
    return this.http.get<ApiResponse1>(this.apiUrl + 'posts?page=' + page + '&limit=' + limit);
  }


  getPost(postId: string | null): Observable<ApiResponse2> {
    return this.http.get<ApiResponse2>(this.apiUrl + 'posts/' + postId);
  }

}
