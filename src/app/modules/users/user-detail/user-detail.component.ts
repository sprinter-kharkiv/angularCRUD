import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '@services/users.service';
import { Subject } from 'rxjs';
import { IUser } from '@store/models/user.model';
import * as actions from '@store/actions/users.actions';
import * as usersReducers from '@store/reducers/users.reducer';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  userCurrent: IUser;
  registered: Date;
  private readonly onDestroy = new Subject<void>();

  constructor(
    private storeUsers: Store<usersReducers.State>,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.storeUsers.dispatch(new actions.GetUserById(this.route.snapshot.params['id']));
    this.storeUsers.select(state => state.users)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.userCurrent = res.user;
      });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

}
