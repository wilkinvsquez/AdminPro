import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrls: ['./promises.component.css'],
})
export class PromisesComponent implements OnInit {
  ngOnInit(): void {
    // const promise = new Promise((resolve, reject) => {
    //   if (false) {
    //     resolve('Hola mundo');
    //   } else {
    //     reject('Something went wrong');
    //   }
    // });
    // promise
    //   .then((mensaje) => {
    //     console.log(mensaje);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // console.log('Fin init');
    // const users = this.getUsers().then((users) => {
    //   return users;
    // });
    // console.log(users);
    this.getUsers().then((users) => {
      console.log(users);
    });
  }

  getUsers() {
    const promise = new Promise((resolve) => {
      fetch('https://reqres.in/api/users')
        .then((res) => res.json())
        .then((body) => resolve(body.data));
    });
    return promise;
  }
}
