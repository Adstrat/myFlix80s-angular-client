import { Component, OnInit, Inject } from '@angular/core';

// Angular Material
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})
export class DirectorViewComponent implements OnInit {
  /**
   * Data from the movie-card component
   * @param data
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      bio: string;
      birth: Date;
      death: Date;
    }
  ) { }

  ngOnInit(): void {
  }

}
