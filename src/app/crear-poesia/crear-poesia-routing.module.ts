import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearPoesiaPage } from './crear-poesia.page';

const routes: Routes = [
  {
    path: '',
    component: CrearPoesiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearPoesiaPageRoutingModule {}
