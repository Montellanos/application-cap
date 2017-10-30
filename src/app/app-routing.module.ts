import { ProductsComponent } from './content/products/products.component';
import { CartsComponent } from './content/carts/carts.component';
import { NotfoundComponent } from './content/notfound/notfound.component';
import { HomeComponent } from './content/home/home.component';
import { NotificationsComponent } from './content/notifications/notifications.component';
import { CalendarComponent } from './content/calendar/calendar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component : HomeComponent
  },
  {
    path : 'calendar',
    component : CalendarComponent
  },
  {
    path : 'notifications',
    component: NotificationsComponent
  },
  {
    path : 'products',
    component : ProductsComponent
  },
  {
    path : 'carts',
    component : CartsComponent
  },
  {
    path : '**',
    component : NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
