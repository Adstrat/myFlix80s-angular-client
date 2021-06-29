import { Component, OnInit } from '@angular/core';

// Fetch API data
import {
  GetAllMoviesService,
  AddFavoriteMovieService,
} from '../fetch-api-data.service';

// Angular Material
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Components
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiDataGetMovies: GetAllMoviesService,
    public fetchApiDataAddFav: AddFavoriteMovieService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  /**
  * Runs the getMovies() function on initialization
  */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Gets a list of all movies in an array
   */
  getMovies(): void {
    this.fetchApiDataGetMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Opens modal with movie genre data
   * @param {string} name 
   * @param {string} description 
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: { name, description },
      width: '320px',
    });
  }

  /**
   * Opens modal with movie director data
   * @param {string} name
   * @param {string} bio
   * @param {Date} birth
   * @param {Date} death
   */
  openDirectorDialog(name: string, bio: string, birth: Date, death: Date): void {
    this.dialog.open(DirectorViewComponent, {
      data: { name, bio, birth, death },
      width: '320px',
    });
  }

  /**
   * Opens modal with movie synopsis data
   * @param {string} title
   * @param {string} description
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: { title, description },
      width: '420px',
    });
  }

  /**
   * adds movie to favorites
   * @param {string} _id 
   * @param {string} title
   */
  addFavoriteMovie(_id: string, title: string): void {
    this.fetchApiDataAddFav.addFavoriteMovie(_id).subscribe(() => {
      this.snackBar.open(
        `${title} has been added to your favourites.`, "OK", {
        duration: 2000,
      }
      );
    });
  }

}
