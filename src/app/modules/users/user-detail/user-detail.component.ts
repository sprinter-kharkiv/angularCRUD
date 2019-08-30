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
  private readonly onDestroy = new Subject<void>();

  constructor(
    private storeUsers: Store<usersReducers.State>,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.storeUsers.dispatch(new actions.GetUserById(this.route.snapshot.params['id']));
    this.storeUsers.select(state => state.users)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.isLoading = false;
        this.userCurrent = res.user;
      });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  clear(str: string): string {
    return str.replace(/\s/g, '');
  }

  syntaxHighlight(jsonObj: {[key: string]: any}): string {
    let json = JSON.stringify(jsonObj, undefined, 2);

    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) =>  {
      let cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  }

}
