import { Component, OnInit, Input } from '@angular/core';

// this import closes the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// this import brings in the API calls
import { UserLoginService } from '../fetch-api-data.service';

// this import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserLoginService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
  userLogin(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      this.dialogRef.close(); // Closes modal on success
      localStorage.setItem('user', result.user.Username);
      localStorage.setItem('token', result.token);
      this.router.navigate(['movies']);
    });
  }

}
