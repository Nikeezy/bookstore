import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CatalogPageComponent } from './components/catalog-page/catalog-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'catalog', component: CatalogPageComponent },
    { path: 'cart', component: CartPageComponent, canActivate: [authGuard] },
    { path: 'product/:id', component: ProductPageComponent },
    { path: 'login', component: LoginPageComponent, canActivate: [loginGuard] },
    { path: 'registration', component: RegistrationPageComponent, canActivate: [loginGuard] },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: 'not-found' }
];
