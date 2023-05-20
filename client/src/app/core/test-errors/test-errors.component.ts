import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.scss'],
})
export class TestErrorsComponent {
  baseUrl = environment.baseUrl;
  validationErrors: [] = [];

  constructor(private http: HttpClient) {}

  get500Error() {
    this.http.get(this.baseUrl + 'Buggy/servererror').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.error(err),
    });
  }

  get404Error() {
    this.http.get(this.baseUrl + 'Buggy/notfound').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.error(err),
    });
  }

  get400Error() {
    this.http.get(this.baseUrl + 'Buggy/badRequest').subscribe({
      next: (res) => console.log(res),
      error: (err) => console.error(err),
    });
  }

  get400ValidationError() {
    this.http.get(this.baseUrl + 'Buggy/badRequest/forty').subscribe({
      next: (res) => console.log(res),
      error: (err) => (this.validationErrors = err.errors),
    });
  }
}
