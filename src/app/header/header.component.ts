import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, iif } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showMenu = false;
  showDropdownMenu = false;
  signedin$: BehaviorSubject<boolean>;
  loggedinUser$: BehaviorSubject<{}>;

  constructor(private userService: UserService) {
    this.signedin$ = this.userService.signedin$;
    this.loggedinUser$ = this.userService.loggedinUser$;
  }

  ngOnInit(): void { }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  updateClass() {
    if (this.showMenu) {
      return ['show'];
    } else {
      return [];
    }
  }

  toggleDropdownMenu() {
    this.showDropdownMenu = !this.showDropdownMenu;
  }

}
