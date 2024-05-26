import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './shared/components/navigation/navigation.component';

@Component({
  standalone: true,
  imports: [RouterModule, NavigationComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
