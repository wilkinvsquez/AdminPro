import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  public user: User;
  public picture: File;
  public imgTemp: any;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _fUploadService: FileUploadService
  ) {
    this.user = this._userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this._fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  updateUser() {
    this._userService.updateProfile(this.profileForm.value).subscribe({
      next: () => {
        const { name, email } = this.profileForm.value;
        this.user.name = name;
        this.user.email = email;
        Swal.fire('Great', 'User succesfully updated', 'success');
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Oh No!', 'Something went wrong!', 'warning');
      },
    });
  }

  changeImg(event: any) {
    this.picture = event.target.files[0];
    if (!event.target.files[0]) {
      return (this.imgTemp = null);
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
    return;
  }

  uploadImg() {
    this._fUploadService
      .updatePicture(this.picture, 'users', this.user.uid!)
      .then((img) => {
        this.user.img = img;
        Swal.fire('Great', 'Profile picture succesfully updated', 'success');
      });
  }
}
