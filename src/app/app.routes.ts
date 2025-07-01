import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './components/login/login.component';
import { register } from 'module';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ProductComponent } from './components/product/product.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';
import { DetailsComponent } from './components/details/details.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';

export const routes: Routes = [
  {path:"",component:AuthLayoutComponent,canActivate:[logedGuard],
     children:[
    {path:"",redirectTo:"login",pathMatch:"full"},
    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent},
    {path:"forget",component:ForgetPasswordComponent},

  ]},

  {path:"",component:BlankLayoutComponent
    ,canActivate:[authGuard],children:[
    {path:"home",component:HomeComponent},
    {path:"cart",component:CartComponent},
    {path:"categories",component:CategoriesComponent},
    {path:"brands",component:BrandsComponent},
    {path:"product",component:ProductComponent},
    {path:"details/:id",component:DetailsComponent}

 ]},

 {path:"**", component:NotfoundComponent}
];
