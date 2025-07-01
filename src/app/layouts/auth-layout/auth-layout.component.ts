import { Component } from '@angular/core';
import { NavOuthComponent } from "../../components/nav-outh/nav-outh.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [NavOuthComponent,RouterOutlet,FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
