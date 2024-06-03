import { Injectable } from '@angular/core';
import { ID, account } from '@lib/appwrite';
import { BehaviorSubject, catchError, from, of, switchMap, tap } from 'rxjs';
import { User } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly activeUserSubject = new BehaviorSubject<User | null>(null);

  getActiveUser() {
    return this.activeUserSubject.asObservable().pipe(
      switchMap(user => {
        if (user) {
          return of(user);
        }
        return from(account.get()).pipe(
          tap(user => {
            if (user) {
              this.activeUserSubject.next(user);
            }
          }),
          catchError(err => {
            throw err;
          })
        );
      })
    );
  }

  async login(email: string, password: string) {
    await account.createEmailPasswordSession(email, password);
    const user = await account.get();
    this.activeUserSubject.next(user);
  }

  async register(email: string, password: string, name: string) {
    await account.create(ID.unique(), email, password, name);
    this.login(email, password);
    const user = await account.get();
    this.activeUserSubject.next(user);
  }

  async logout() {
    await account.deleteSession('current');
    this.activeUserSubject.next(null);
  }
}
