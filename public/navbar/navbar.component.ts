import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';





@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
    MatListModule,
    MatCardModule,
    MatPaginatorModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  posts = [
    {
      mainImage: 'https://placehold.co/400x400',
      title: 'fake title',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi quibusdam reiciendis cumque vel atque, fugit non rerum necessitatibus in molestiae natus nisi, ex temporibus voluptates tenetur aliquid libero, dolore architecto? Doloremque voluptate, vitae natus aut veniam saepe sit similique iure enim voluptates obcaecati quasi aperiam! Soluta eius debitis recusandae cupiditate, sit, dicta facilis inventore labore aspernatur eos dignissimos quasi explicabo nostrum odio magnam voluptatem sint! Fugit voluptatibus veniam atque aspernatur quidem, reprehenderit odio iure ipsa natus incidunt id nobis molestiae, obcaecati neque, explicabo iusto aut! Animi praesentium dignissimos omnis, mollitia dolor natus vero dicta dolorum autem ea a consequuntur fugiat.'
    },
    {
      mainImage: 'https://placehold.co/400x400',
      title: 'fake title',
      content: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
    },
    {
      mainImage: 'placeholder.com/400x400',
      title: 'fake title',
      content: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
    }
  ];

  totalPosts = this.posts.length;
  pageSize = 3;
  pageIndex = 0;

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    // You would typically fetch new data here based on the pagination parameters
  }
}


