import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearPoesiaPageRoutingModule } from './crear-poesia-routing.module';

import { CrearPoesiaPage } from './crear-poesia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearPoesiaPageRoutingModule
  ],
  declarations: [CrearPoesiaPage]
})
export class CrearPoesiaPageModule {}
