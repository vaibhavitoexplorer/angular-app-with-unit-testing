import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss']
})
export class UserListingComponent implements OnInit {
  userList;
  pageCount: Number = 1;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUsers(this.pageCount);
  }

  loadUsers(pageCount): void {
    this.userService.getUsers(pageCount).subscribe(users => {
      this.userList = users.data;
    })
  }

}
