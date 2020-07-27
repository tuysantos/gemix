import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrizeComponent} from './components/prize/prize.component';

const routes: Routes = [
  { path: '', redirectTo: '/prize', pathMatch: 'full'},
  {path: 'prize', component: PrizeComponent},
  { path: '**', redirectTo: '/prize'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
