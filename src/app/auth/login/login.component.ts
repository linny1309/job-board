import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading: boolean = false;

  constructor() { }

  onLogin(form: any) {
    console.log(form.value);
  }

  ngOnInit(): void {
  }

}
