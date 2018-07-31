import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatSliderModule, MatTooltipModule, MatStepperModule],
  exports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatSliderModule, MatTooltipModule, MatStepperModule],
})
export class MaterialModule { }
