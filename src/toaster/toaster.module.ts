import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToasterComponent } from './containers/toaster/toaster.component';
import { ToasterService } from './containers/toaster/toaster.service';


@NgModule({
  declarations: [
    ToasterComponent
  ],
  imports: [
    CommonModule
  ],
  providers:[
    ToasterService
  ],
  exports:[
    ToasterComponent
  ]
})
export class ToasterModule { }
