import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatStepperModule} from '@angular/material/stepper';
import {MatBadgeModule} from '@angular/material/badge';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSnackBarModule,
    MatSelectModule, MatSliderModule, MatTooltipModule, MatStepperModule, MatBadgeModule, MatExpansionModule],
  exports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSnackBarModule,
    MatSelectModule, MatSliderModule, MatTooltipModule, MatStepperModule, MatBadgeModule, MatExpansionModule],
})
export class MaterialModule { }