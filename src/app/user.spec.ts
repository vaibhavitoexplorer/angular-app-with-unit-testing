import { UserService } from './user.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { allUsers } from 'src/assets/allUserMock';
import { mockAddUser } from 'src/assets/userMock';

describe('User', () => {
  let service: UserService;
  let pageCount: Number = 1;
  let addUserData: any = {
    "first_name": "vaibhav",
    "last_name": "chandole",
    "email": "vaibhav.a.chandole@gmail.com",
    "id": "784",
    "createdAt": "2020-04-06T10:11:30.605Z"
  };

  let allUserData: any = {
    "page": 1,
    "per_page": 6,
    "total": 12,
    "total_pages": 2,
    "data": [{
      "id": 1,
      "email": "george.bluth@reqres.in",
      "first_name": "George",
      "last_name": "Bluth",
      "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"
    }, {
      "id": 2,
      "email": "janet.weaver@reqres.in",
      "first_name": "Janet",
      "last_name": "Weaver",
      "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"
    }, {
      "id": 3,
      "email": "emma.wong@reqres.in",
      "first_name": "Emma",
      "last_name": "Wong",
      "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg"
    }, {
      "id": 4,
      "email": "eve.holt@reqres.in",
      "first_name": "Eve",
      "last_name": "Holt",
      "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
    }, {
      "id": 5,
      "email": "charles.morris@reqres.in",
      "first_name": "Charles",
      "last_name": "Morris",
      "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
    }, {
      "id": 6,
      "email": "tracey.ramos@reqres.in",
      "first_name": "Tracey",
      "last_name": "Ramos",
      "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
    }],
    "ad": {
      "company": "StatusCode Weekly",
      "url": "http://statuscode.org/",
      "text": "A weekly newsletter focusing on software development, infrastructure, the server, performance, and the stack end of things."
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.get(UserService);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });

  it('should call getUsers', () => {
    const httpClientsStub: HttpClient = TestBed.get(HttpClient);
    spyOn(httpClientsStub, 'get').and.callThrough();
    service.getUsers(pageCount);

    expect(httpClientsStub.get).toHaveBeenCalled();
  })

  it('should call addUser', () => {
    const httpClientsStub: HttpClient = TestBed.get(HttpClient);
    spyOn(httpClientsStub, 'post').and.callThrough();
    service.addUser({});

    expect(httpClientsStub.post).toHaveBeenCalled();
  })

  it("should be able to get status code 200 for getUsers method", () => {
    const httpTestingController = TestBed.get(HttpTestingController);

    service.getUsers(pageCount).subscribe(res => {
      expect(res).toEqual(allUsers);
    });

    const req = httpTestingController.expectOne(
      new HttpResponse({ body: allUserData, status: 200 })
    );
    expect(req.request.method).toEqual("GET");
    req.flush(allUserData);
    httpTestingController.verify();
  });

  it("should be able to get status code 201 for addUser method", () => {
    const httpTestingController = TestBed.get(HttpTestingController);

    service.addUser(addUserData).subscribe(res => {
      expect(res).toEqual(mockAddUser);
    });

    const req = httpTestingController.expectOne(
      new HttpResponse({ body: allUsers, status: 201 })
    );
    expect(req.request.method).toEqual("POST");
    req.flush(mockAddUser);
    httpTestingController.verify();
  });
});
