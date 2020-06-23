import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { UserService } from '../user.service';
import $ from 'jquery';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  addUserForm;
  userData;
  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.addUserForm = this.formBuilder.group({
      first_name: new FormControl('', [Validators.pattern('[a-zA-Z]*')]),
      last_name: new FormControl('', [Validators.pattern('[a-zA-Z]*')]),
      email: new FormControl('', [Validators.email]),
    });
  }

  ngOnInit(): void {
    $(".alert-success").hide();
  }

  createUser(formValue): void {
    this.userService.addUser(formValue).subscribe(user => {
      this.userData = user;
      $(".alert-success").show();
      this.addUserForm.reset();
      setTimeout(() => {
        $(".alert-success").hide();
      }, 2000);
    })
  }

}
