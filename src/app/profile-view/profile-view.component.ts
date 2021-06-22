import { Component, OnInit } from '@angular/core';

// Fetch API data
import {
  GetUserService,
  GetAllMoviesService,
  DeleteFavoriteMovieService,
} from '../fetch-api-data.service';

// Angular Material
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

// Components
import { UpdateViewComponent } from '../update-view/update-view.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})

export class ProfileViewComponent implements OnInit {
  user: any = {};
  movies: any = [];
  favorites: any = [];

  constructor(
    public fetchApiDataGetUser: GetUserService,
    public fetchApiDataGetMovies: GetAllMoviesService,
    public fetchApiDataDeleteFav: DeleteFavoriteMovieService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  /**
   * Gets the user object from the database
   */
  getUserInfo(): void {
    this.fetchApiDataGetUser.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.getFavouriteMovies();
    });
  }

  /**
   * Opens the dialog box where the user can update their information
   */
  openUpdateViewDialog(): void {
    this.dialog.open(UpdateViewComponent, {
      width: '280px',
    });
  }

  /**
   * Gets all movies and filters favourite movies
   */
  getFavouriteMovies(): void {
    this.fetchApiDataGetMovies.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.filterFavorites();
    });
  }

  /**
   * Filters all movies into users favourites
   * @returns {array}
   */
  filterFavorites(): void {
    this.favorites = this.movies.filter((movie: any) =>
      this.user.FavouriteMovies.includes(movie._id)
    );
    return this.favorites;
  }

  /**
     * Removes movie from the users favourites
     * @param id 
     * @param title 
     */
  removeFromFavorites(_id: string, title: string): void {
    this.fetchApiDataDeleteFav.deleteFavoriteMovie(_id).subscribe(() => {
      this.snackBar.open(
        `${title} has been removed`, 'OK', {
        duration: 2000,
      }
      );
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    });
  }

}
