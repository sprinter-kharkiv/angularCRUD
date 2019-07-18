import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {IUser} from '../../../store/models/user.model';
import {Router} from '@angular/router';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  constructor(
      private router: Router,
      private modalService: NgbModal,
      private userService: UserService,
      private fb: FormBuilder,
  ) {
  }

  @ViewChild('modalForm', {static: false}) modalForm: ElementRef;

  title = 'angular-CRUD';
  closeResult: string;

  users$: Observable<IUser[]>;

  isLoadingForm = false;
  formTitle;
  saveBtnText;
  userForUpdate = {};

  usersForm: FormGroup;

  emptyUser = {
    'id': '',
    'guid': '',
    'isActive': false,
    'balance': '',
    'picture': 'http://placehold.it/32x32',
    'age': 0,
    'eyeColor': '',
    'name': '',
    'gender': '',
    'company': '',
    'email': '',
    'phone': '',
    'address': '',
    'about': '',
    'registered': '',
    'latitude': 0,
    'longitude': 0,
    'tags': []
  };

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private viewDetail(e, id): void {
    e.preventDefault();
    this.router.navigate(['/detail', id]);
  }

  private getAllUsers(): void {
    this.users$ = this.userService.getUsers();
  }

  private createUser(): void {
    this.userForUpdate = null;
    this.formTitle = 'Create new user';
    this.saveBtnText = 'Create';
    this.openModal(false);
  }

  private editUser(e, user): void {
    this.userForUpdate = user;
    e.stopPropagation();
    this.formTitle = 'Update user';
    this.saveBtnText = 'Update';
    this.openModal(user);
  }

  private deleteUser(e, id): void {
    e.stopPropagation();
    const subscribeUserDel = this.userService.deleteUser(id).subscribe(
        (data) => {
          this.successHandler('User was deleted successfully!');
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

    this.isLoadingForm = true;

    console.log('c', this.emptyUser);

    if (userForUpdate) {
      console.log('UPD ', userForUpdate);

      this.applayFormDataTo(userForUpdate);

      const subscribeUserUpdate = this.userService.updateUser(userForUpdate).subscribe(
          data => this.successHandler('User was update successfully!')
      );
    } else {
      console.log('CREATe ');

      this.applayFormDataTo(this.emptyUser);

      this.emptyUser.id = this.getUniqueId();
      this.emptyUser.registered = (new Date()).toISOString();

      const subscribeUserCreate = this.userService.createUser(this.emptyUser).subscribe(
          data => this.successHandler('User was saved successfully!')
      );
    }
  }
  private applayFormDataTo(user): void {
    for (const control in this.usersForm.controls) {
      if (this.usersForm.controls.hasOwnProperty(control)) {
        user[control] = this.usersForm.controls[control].value;
      }
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
      name: [null, [
        Validators.required,
        Validators.pattern(/[a-zA-z]+/)
      ]],
      company: [null, [
        Validators.required
      ]],
      email: [null, [
        Validators.required,
        Validators.email
      ]],
      phone: [null, [
        Validators.required
      ]],
    });
  }

  updateForm(user): void {
    for (const control of Object.keys(this.usersForm.controls)) {
      this.usersForm.controls[control].patchValue(user[control]);
    }
  }

  ngOnInit() {
    this.getAllUsers();
  }
}
