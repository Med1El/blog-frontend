import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import BlogPost from '../models/blog-post.model';
import { AbstractControl } from '@angular/forms';

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

  createPost(title: string, content: string, mainImage: string, extraSmallImages: string[], tags: string[], category: string, id: string, username: string) {

    const token = localStorage.getItem('token'); // Or sessionStorage.getItem('authToken') or your service

    if (!token) {
      console.error('No authentication token found.');
      // Optionally return an error observable or handle this case as needed
      return new Observable((subscriber) => subscriber.error('No token'));
    }

    if (!id || !username) {
      console.error('No user credentials found.');
      // Optionally return an error observable or handle this case as needed
      return new Observable((subscriber) => subscriber.error('No user credentials'));
    }

    // 2. Create HttpHeaders
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Or whatever content type your API expects
      'Authorization': `Bearer ${token}` // 3. Add the Authorization header
    });

    return this.http.post<ApiResponse2>(this.apiUrl + 'posts', {
      'title': title,
      'content': content,
      'mainImage': mainImage,
      'extraSmallImages': extraSmallImages,
      'tags': tags,
      'category': category,
      'author': {
        'id': id,
        'name': username
      }
    },
      { 'headers': headers });
  }


}
