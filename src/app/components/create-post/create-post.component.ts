import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BlogsService } from '../../services/blogs-service.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
declare const cloudinary: any;

@Component({
  selector: 'app-create-post',
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {

  blogPostForm: FormGroup;
  extraSmallImageUrls: string[] = [];

  constructor(private fb: FormBuilder, private blogsService: BlogsService, private dialog: MatDialog, private router: Router) {
    this.blogPostForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      mainImage: [null],
      extraSmallImages: [[]],
      tags: [''],
      category: ['', Validators.required]
    });
  }

  openMainImageUploadWidget(): void {
    const myWidget = cloudinary.createUploadWidget(
      {
        cloudName: 'dqifwvbhk',
        uploadPreset: 'angular-dev-upload'
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          console.log('Main Image Upload Result:', result.info.secure_url);
          this.blogPostForm.patchValue({ mainImage: result.info.secure_url });
        }
      }
    );
    myWidget.open();
  }

  openExtraSmallImagesUploadWidget(): void {
    const myWidget = cloudinary.createUploadWidget(
      {
        cloudName: 'dqifwvbhk',
        uploadPreset: 'angular-dev-upload',
        multiple: true
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          console.log('Extra Small Image Upload Result:', result.info.secure_url);
          this.extraSmallImageUrls.push(result.info.secure_url);
          this.blogPostForm.patchValue({ extraSmallImages: this.extraSmallImageUrls });
        } else if (result && result.event === 'close') {
          console.log('All extra small images uploaded:', this.extraSmallImageUrls);
          this.blogPostForm.patchValue({ extraSmallImages: this.extraSmallImageUrls });
        }
      }
    );
    myWidget.open();
  }

  get title() {
    return this.blogPostForm.get('title');
  }

  get content() {
    return this.blogPostForm.get('content');
  }

  get mainImage() {
    return this.blogPostForm.get('mainImage');
  }

  get extraSmallImages() {
    return this.blogPostForm.get('extraSmallImages');
  }

  get tags() {
    return this.blogPostForm.get('tags');
  }

  get category() {
    return this.blogPostForm.get('category');
  }

  onSubmit(): void {
    if (this.blogPostForm.valid) {
      const mainImageToSend = this.mainImage?.value ? this.mainImage.value : 'https://picsum.photos/1000/1000';
      const extraSmallImagesToSend = !this.extraSmallImages?.value.length ? ['https://picsum.photos/1000/1000', 'https://picsum.photos/1000/1000', 'https://picsum.photos/1000/1000'] : this.extraSmallImages.value;

      this.blogsService.createPost(
        this.title?.value,
        this.content?.value,
        mainImageToSend,
        extraSmallImagesToSend,
        this.tags?.value.split(','),
        this.category?.value,
        localStorage.getItem('id') || '',
        localStorage.getItem('username') || ''
      ).subscribe({
        next: (res: any) => {
          this.dialog.open(DialogComponent, {
            data: { 'errorMsg': 'The post was created successfully' }
          });
          this.router.navigateByUrl('blog/' + res.data._id);
        },
        error: error => {
          this.dialog.open(DialogComponent, {
            data: { 'errorMsg': error }
          });
        }
      });
    }
  }
}