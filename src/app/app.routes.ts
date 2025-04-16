import { Routes } from '@angular/router';
import { BlogDetailsComponent } from './components/blog-details/blog-details/blog-details.component';
import { BlogsComponent } from './components/welcome-page/blogs/blogs.component';
import { SignupComponent } from './components/signup/signup/signup.component';
import { LoginComponent } from './components/login/login/login.component';
import { CreatePostComponent } from './components/create-post/create-post.component';

export const routes: Routes = [
    { path: '', redirectTo: '/blogs', pathMatch: 'full' },
    { path: 'blogs', component: BlogsComponent },
    { path: 'blog/:id', component: BlogDetailsComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'createPost', component: CreatePostComponent },
];
