import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-posts',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit {
  favorites: any = [];

  constructor(private favoriteService: FavoriteService) { }

  ngOnInit() {
    this.favoriteService
        .getAllFavorites()
        .subscribe(posts => {
          this.favorites = posts;
    });
  }

  createFavorite(formValue: any) {
    console.log(formValue);
    this.favoriteService.
        createFavorite(formValue)
        .subscribe(
          data => console.log(data),
          err => console.error(err)          
        );
  }

  deleteFavorite(favoriteId) {
    this.favoriteService
        .deleteFavorite(favoriteId)
        .subscribe(
          data => {
            console.log(data);
          },
          err => {
            console.log(err);
          }         
        );
  }
}
