import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userCurrent;
  registered

  constructor(
      private route: ActivatedRoute,
      private userService: UserService,
  ) { }

  ngOnInit() {
    const userSubscribe = this.userService.getUserById(this.route.snapshot.params['id']).subscribe(
        (user) => {
          this.userCurrent = user;
          console.log('date string', this.userCurrent.registered)
          this.registered = new Date(Date.parse(this.userCurrent.registered));
          console.log('date', this.registered)
        }
    );
  }

}
