import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
})
export class AppComponent implements OnInit {
  title = 'mean-docker';
  url = 'http://localhost:3000';
  people: any[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  postUser(name, age): void {
    console.log('sdf', name);
    this
      .http
      .post(`${ this.url }/users`, { name, age })
      .subscribe(() => {
        this.getUsers();
      });
  }

  getUsers(): void {
    this
      .http
      .get(`${ this.url }/users`)
      .subscribe((people: any) => {
        this.people = people;
      });
  }
}
