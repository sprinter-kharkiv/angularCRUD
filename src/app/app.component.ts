import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from './services/user.service';
import {IUser} from './store/models/user.model';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private fb: FormBuilder,
  ) {  }

  @ViewChild('modalForm', {static: false}) modalForm: ElementRef;

  title = 'angular-CRUD';
  closeResult: string;

  users$: Observable<IUser[]>;
  userForUpdate: {};
  isLoadingForm = false;
  formTitle;
  saveBtnText;
  userForUpdate = {};

  usersForm: FormGroup;

  testUser = {
    "id": '',
    "guid": '',
    "isActive": false,
    "balance": '',
    "picture": "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "age": 0,
    "eyeColor": '',
    "name": '',
    "gender": '',
    "company": '',
    "email": '',
    "phone": '',
    "address": '',
    "about": '',
    "registered": '',
    "latitude": 0,
    "longitude": 0,
    "tags": []
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

  private getAllUsers(): void {
    this.users$ = this.userService.getUsers();
  }

  private createUser(): void {
    this.formTitle = 'Create new user';
    this.saveBtnText = 'Create';
    this.openModal(false);
  }

  private editUser(e, user): void {
    e.stopPropagation();
    this.formTitle = 'Update user';
    this.saveBtnText = 'Update';
    // this.userForUpdate = user;
    this.openModal(user);
  }

  private deleteUser(e, id): void {
    e.stopPropagation();
    const subscribeUserDel = this.userService.deleteUser(id).subscribe(
      (data) => {
        console.log('User was deleted successfully!');
        this.getAllUsers();
      },
      (errors) => {
        console.log('Error: ', errors);
      }
    );
  }

  private saveData(userForUpdate) {

    if (this.usersForm.invalid) {
      console.log('ERRORS IN THE FORM');
      return false;
    }

    for (const control in this.usersForm.controls) {
      if (this.usersForm.controls.hasOwnProperty(control)) {
        this.testUser[control] = this.usersForm.controls[control].value;
      }
    }

    this.testUser.id = this.getUniqueId();
    this.testUser.registered = new Date();
    this.isLoadingForm = true;

    console.log('c', this.testUser);

    if ( userForUpdate ) {
      console.log('UPDATE' );
    } else {
      const subscribeUserCreate = this.userService.createUser(this.testUser).subscribe(
        (data) => {
          this.successHandler('User was saved successfully!');
        }
      );
    }
  }

  private successHandler(msg): void {
    this.isLoadingForm = false;
    this.modalService.dismissAll();
    console.log(msg);
    this.getAllUsers();
  }

  private getUniqueId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  openModal(user) {
    this.initForm();
    this.userForUpdate = user ? user : {};

    if (user) {
      this.updateForm(user);
    }

    this.modalService.open(this.modalForm, {ariaLabelledBy: this.formTitle}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log('saved', this.closeResult);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log('closed', this.closeResult);
    });
  }

  initForm(): void {
    this.usersForm = this.fb.group({
      name: [ null, [
        Validators.required,
        Validators.pattern(/[a-zA-z]+/)
      ]],
      company: [ null, [
        Validators.required
      ]],
      email: [ null, [
        Validators.required,
        Validators.email
      ]],
      phone: [ null, [
        Validators.required
      ]],
    });
  }

  updateForm(user): void {
    console.log('start', user);
    for (const control of Object.keys(this.usersForm.controls) ) {
      console.log('contr', user[control])
      // this.controls[name].patchValue(value[name], {onlySelf: true, emitEvent});
      this.usersForm.controls[control].patchValue( user[control]);
    }
  }

  ngOnInit() {
    this.getAllUsers();
  }

}
