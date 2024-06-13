import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from './components/footer/footer.component';
import { CatalogPageComponent } from './components/catalog-page/catalog-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      RouterOutlet, 
      HeaderComponent, 
      FooterComponent,
      CatalogPageComponent,
      CartPageComponent,
      LoginPageComponent,
      RegistrationPageComponent,
      NotFoundComponent
    ]
})
export class AppComponent {
  title = 'Bookmania';

  ngOnInit(): void {
    setTimeout(() => {        
      initFlowbite();   
  }, 1000);
  }
}
