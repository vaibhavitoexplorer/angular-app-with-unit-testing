import { AddUserComponent } from "./add-user.component";
import { UserService } from '../user.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { mockAddUser } from 'src/assets/userMock';

describe('AddUserComponent', () => {
    let component: AddUserComponent;
    let fixture: ComponentFixture<AddUserComponent>;
    let service: UserService;

    let userData: any = {
        "first_name": "vaibhav",
        "last_name": "chandole",
        "email": "vaibhav.a.chandole@gmail.com",
        "id": "784",
        "createdAt": "2020-04-06T10:11:30.605Z"
    };

    beforeEach(() => {
        const mockUserService = () => ({
        addUser: () => ({ subscribe: () => ({}) })
      });

      TestBed.configureTestingModule({
        providers: [
            { provide: UserService, useFactory: mockUserService }
        ],
        declarations: [AddUserComponent],
        imports: [HttpClientTestingModule, ReactiveFormsModule],
        schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    service = TestBed.get(UserService);
    fixture = TestBed.createComponent(AddUserComponent);
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

    it('should call addUser', () => {
        const spy = spyOn(component['userService'], 'addUser').and.returnValue(of({}));
        component.createUser(mockAddUser);

        expect(spy).toHaveBeenCalled();
    });

    it('should get the first record with first_name as "vaibhav"', () => {
        const mockUserService: UserService = fixture.debugElement.injector.get(
          UserService
        );
    
        const spy = spyOn(
          mockUserService,
          "addUser"
        ).and.returnValue(of({userData}));
        component.createUser(mockAddUser); 
        expect(component.userData.userData.first_name).toEqual("vaibhav");
      });
});