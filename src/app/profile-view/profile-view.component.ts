import { Component, OnInit } from '@angular/core';

// Fetch API data
import {
  GetUserService,
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

  constructor(
    public fetchApiData: GetUserService,
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
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;

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


}
