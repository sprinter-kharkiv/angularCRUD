import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from './services/user.service';
import {IUser} from './store/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private userService: UserService
  ) {  }

  @ViewChild('modalForm', {static: false}) modalForm: ElementRef;

  title = 'angular-CRUD';
  closeResult: string;
  usersList;

  isLoadingForm = false;
  formTitle;
  saveBtnText;

  testUser = {
    "_id": "5c35cd617d6ad9306b978de9",
    "guid": "687e94aa-1923-4be0-8fce-8e011b8e9a88",
    "isActive": false,
    "balance": "testUser",
    "picture": "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "age": 36,
    "eyeColor": "green",
    "name": "testUser testUser",
    "gender": "male",
    "company": "ORBIFLEX",
    "email": "scottmann@orbiflex.com",
    "phone": "+1 (904) 497-2520",
    "address": "828 Williamsburg Street, Walland, Michigan, 487",
    "about": "Aliqua aliquip quis nostrud aute nostrud ut quis aute mollit. Eu et esse voluptate nulla cupidatat eu ut laborum consequat tempor ad do. Velit occaecat cupidatat laboris ea deserunt.\r\n",
    "registered": "2014-09-18T08:46:45 -03:00",
    "latitude": 26.9417,
    "longitude": 53.353221,
    "tags": [
      "reprehenderit",
      "ut",
      "sit",
      "esse",
      "aliquip",
      "tempor",
      "ipsum"
    ]
  };

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  private viewUser(i): void {
    console.log('redirect to', i );
  }

  private createUser(): void {
    this.formTitle = 'Create new user';
    this.saveBtnText = 'Create';
    this.openModal(false);
  }

  private editUser(e, i): void {
    e.stopPropagation();
    this.formTitle = 'Update user';
    this.saveBtnText = 'Update';
    this.openModal(i);
  }

  private deleteUser(e, i): void {
    e.stopPropagation();
    console.log('deleteUser ', i );
  }

  private saveData(isUpdate): void {
    this.isLoadingForm = true;
    if ( isUpdate ) {
      console.log('UPDATE' );
    } else {
      this.userService.createUser(this.testUser);
      console.log('CREATE ' );
    }
  }

  openModal(id) {
    if (id) {
      console.log('UPDATE', id );
    } else {
      console.log('CREATE' );
    }

    this.modalService.open(this.modalForm, {ariaLabelledBy: this.formTitle}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log('saved', this.closeResult);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log('closed', this.closeResult);
    });
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      (users: IUser[]) => this.usersList = users,
      (err) => console.log(err)
    );
    console.log('data', this.usersList);
  }

}
