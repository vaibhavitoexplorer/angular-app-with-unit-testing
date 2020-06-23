import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListingComponent } from './user-listing.component';
import { UserService } from '../user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { allUsers } from 'src/assets/allUserMock';

describe('UserListingComponent', () => {
  let component: UserListingComponent;
  let fixture: ComponentFixture<UserListingComponent>;
  let service: UserService;

  beforeEach(() => {
    const mockUserService = () => ({
      userList: [],
      getUsers: () => ({ subscribe: () => ({}) })
    });

    TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useFactory: mockUserService }
      ],
      declarations: [UserListingComponent],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    service = TestBed.get(UserService);
    fixture = TestBed.createComponent(UserListingComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  })

  it('should call loadUsers', () => {
    const spy = spyOn(component['userService'], 'getUsers').and.returnValue(of({}));
    component.loadUsers(1);

    expect(spy).toHaveBeenCalled();
  });

  it('should get the first record with first_name as "George"', () => {

    const mockUserService: UserService = fixture.debugElement.injector.get(
      UserService
    );

    const spy = spyOn(
      mockUserService,
      "getUsers"
    ).and.returnValue(of(allUsers));
    component.loadUsers(1);
    expect(component.userList[0].first_name).toEqual('George');
  });

  /* it("should return status code 200", () => {
    const httpTestingController = TestBed.get(HttpTestingController);

    service.getUsers(1).subscribe(res => {
      expect(res.data[0].first_name).toEqual(allUsers.data[0].first_name);
    }) ;

    const req = httpTestingController.expectOne(
      new HttpResponse({ body: allUsers, status: 200 })
    );

    expect(req.request.method).toEqual("GET");
    req.flush({});
    httpTestingController.verify();
  }); */
});
