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


  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiDataGetMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Opens modal with movie genre data
   * @param name 
   * @param description 
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: { name, description },
      width: '320px',
    });
  }

  /**
   * Opens modal with movie director data
   * @param name
   * @param bio
   * @param birth
   * @param death
   */
  openDirectorDialog(name: string, bio: string, birth: Date, death: Date): void {
    this.dialog.open(DirectorViewComponent, {
      data: { name, bio, birth, death },
      width: '320px',
    });
  }

  /**
   * Opens modal with movie synopsis data
   * @param title
   * @param description
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: { title, description },
      width: '420px',
    });
  }

  /**
   * adds movie to favorites
   * @param _id 
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
