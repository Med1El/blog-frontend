import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import BlogPost from '../../../models/blog-post.model';

@Component({
  selector: 'app-blog',
  imports: [
    RouterModule
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  @Input() post: BlogPost = {
    _id: '',
    title: '',
    content: '',
    mainImage: '',
    extraSmallImages: [],
    tags: [],
    category: '',
    author: {
      id: '',
      name: ''
    }
  };

  ngOnInit() { }
}
