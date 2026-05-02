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
    this.userAgent = navigator.userAgent;
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
