import { Routes } from '@angular/router';
import { BlogDetailsComponent } from './components/blog-details/blog-details/blog-details.component';
import { BlogsComponent } from './components/welcome-page/blogs/blogs.component';

export const routes: Routes = [
    { path: 'blogs', component: BlogsComponent },
    { path: '', redirectTo: '/blogs', pathMatch: 'full' },
    { path: 'blog/:id', component: BlogDetailsComponent }
];
