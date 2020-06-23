import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListingComponent } from './user-listing/user-listing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'add-user', component: AddUserComponent },
  { path: 'user-list', component: UserListingComponent },
  {
    path: '', redirectTo: '/user-list',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    UserListingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
