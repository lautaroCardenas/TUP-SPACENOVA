import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Sidenav } from '../sidenav/sidenav';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-user-setting',
  imports: [Sidenav, MatButtonModule, MatIconModule],
  templateUrl: './user-setting.html',
  styleUrl: './user-setting.css',
})
export class UserSetting {
  userAgent: string = '';
  private router = inject(Router);

  ngOnInit() {
    
    const userSaved = localStorage.getItem('userLogged');
    if (userSaved){
      const userObject = JSON.parse(userSaved);
      this.userAgent = userObject.username;
    }
      }

  logout() {
    localStorage.removeItem('userLogged');
    this.router.navigate(['/login']);
  }
}
