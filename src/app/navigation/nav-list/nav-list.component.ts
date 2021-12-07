import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.css'],
})
export class NavListComponent implements OnInit, OnDestroy {
  @Output() sideNavButton = new EventEmitter<void>();
  isAuth!: boolean;
  authSubscription!: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
      }
    );
  }

  onLogout() {
    this.authService.logout();
    this.onCloseSideNav();
  }
  onCloseSideNav() {
    this.sideNavButton.emit();
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
