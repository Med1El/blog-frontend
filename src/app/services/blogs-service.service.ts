import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import BlogPost from '../models/blog-post.model';

interface ApiResponse {
  success: boolean;
  data: BlogPost[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
}



@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  private apiUrl = 'http://localhost:5000/api/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<ApiResponse> {
    console.log('service');
    return this.http.get<ApiResponse>(this.apiUrl);
  }

}
