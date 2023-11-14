import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ModalService } from 'src/app/services/modal.service';
import { SearchesService } from 'src/app/services/searches.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  public totalUsers: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public from: number = 0;
  loading: boolean = false;

  constructor(
    private _userService: UserService,
    private _searchService: SearchesService,
    private _modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  search(term: string) {
    if (term.length === 0) {
      this.users = this.usersTemp;
      return;
    }
    this._searchService.search('users', term).subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getUsers() {
    this.loading = true;
    this._userService.getUsers(this.from).subscribe({
      next: ({ total, users }) => {
        this.totalUsers = total;
        this.users = users;
        this.usersTemp = users;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  changePage(value: number) {
    this.from += value;
    if (this.from < 0) {
      this.from = 0;
    } else if (this.from > this.totalUsers) {
      this.from -= value;
    }
    this.getUsers();
  }

  deleteUser(user: User): any {
    if (user.uid === this._userService.uId) {
      return Swal.fire('Error', 'You can`t delete your self', 'error');
    }
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${user.name}`,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._userService.deleteUser(user.uid!).subscribe({
          next: () => {
            this.getUsers();
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          },
          error: (err) => {
            console.error(err);
            Swal.fire({
              title: 'Oh no!',
              text: 'Something went wrong.',
              icon: 'error',
            });
          },
        });
      }
    });
  }

  changeRole(user: User) {
    this._userService.saveUser(user).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          title: 'Oh no!',
          text: 'Something went wrong.',
          icon: 'error',
        });
      },
    });
  }

  showModal(user: User) {
    this._modalService.showModal();
  }
}
