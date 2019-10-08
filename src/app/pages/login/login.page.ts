import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  protected email:string;
  protected senha:string;

  constructor() { }

  ngOnInit() {
  }

  onsubmit(form){

  }
}
