import { Injectable, OnDestroy } from '@angular/core';
import { ID, account } from '@lib/appwrite';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  from,
  map,
  of,
  switchMap,
  takeUntil,
} from 'rxjs';
import { User } from '../types/user.type';

@Injectable({ providedIn: 'root' })
export class AuthService implements OnDestroy {
  private readonly activeUserSubject = new BehaviorSubject<User | null>(null);
  private readonly destroySubject = new Subject<void>();

  constructor() {
    this.activeUserSubject
      .pipe(
        switchMap(user => {
          if (!user) {
            return from(account.get()).pipe(catchError(() => of(null)));
          }
          return of(null);
        }),
        map(user => {
          if (user) {
            this.activeUserSubject.next(user);
            return user;
          }
          return null;
        }),
        takeUntil(this.destroySubject)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  get activeUser(): Observable<null | User> {
    return this.activeUserSubject.asObservable();
  }

  async login(email: string, password: string) {
    await account.createEmailPasswordSession(email, password);
    const user = await account.get();
    this.activeUserSubject.next(user);
  }

  async register(email: string, password: string, name: string) {
    await account.create(ID.unique(), email, password, name);
    this.login(email, password);
  }

  async logout() {
    await account.deleteSession('current');
    this.activeUserSubject.next(null);
  }
}
