import { Component, OnInit, Input } from '@angular/core';

// Fetch API data
import { EditUserService } from '../fetch-api-data.service';

// Angular Material
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-view',
  templateUrl: './update-view.component.html',
  styleUrls: ['./update-view.component.scss']
})
export class UpdateViewComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiDataEditUser: EditUserService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateViewComponent>
  ) { }

  ngOnInit(): void {
  }

  /**
  * User edits personal data
  */
  editUserInfo(): void {
    this.fetchApiDataEditUser.editUser(this.userData).subscribe((response) => {
      this.dialogRef.close();
      localStorage.setItem('user', response.Username);
      this.snackBar.open('response', 'OK', {
        duration: 2000,
      });
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000,
      });
    });

  }
}
