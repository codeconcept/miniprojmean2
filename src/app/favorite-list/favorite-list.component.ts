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
    this.favoriteService.getAllFavorites().subscribe(posts => {
      this.favorites = posts;
    });
  }
}
