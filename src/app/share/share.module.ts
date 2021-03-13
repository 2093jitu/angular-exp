import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareViewComponent } from './share-view/share-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ShareViewComponent
  ],
  imports: [   
    CommonModule,  
    FormsModule   ,
    ReactiveFormsModule
  ],
  exports :[
    CommonModule,  
    FormsModule   ,
    ReactiveFormsModule
  ]
})
export class ShareModule { }
