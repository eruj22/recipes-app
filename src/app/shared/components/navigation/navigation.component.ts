import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types/user.type';

type ViewData = {
  activeUser: null | User;
  isMobileMenuOpen: boolean;
};

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  readonly viewData$: Observable<ViewData>;

  private readonly authService = inject(AuthService);
  private readonly isMobileMenuOpenSubject = new BehaviorSubject(false);

  constructor() {
    this.viewData$ = combineLatest([
      this.authService.activeUser,
      this.isMobileMenuOpenSubject,
    ]).pipe(
      map(([user, isMobileMenuOpen]) => ({
        activeUser: user,
        isMobileMenuOpen,
      }))
    );
  }

  async logout() {
    await this.authService.logout();
    this.onMobileMenuClose();
  }

  onHamburgerClick() {
    this.isMobileMenuOpenSubject.next(!this.isMobileMenuOpenSubject.value);
  }

  onMobileMenuClose() {
    if (this.isMobileMenuOpenSubject.value) {
      this.isMobileMenuOpenSubject.next(false);
    }
  }
}
