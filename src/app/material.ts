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
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSnackBarModule,
    MatSelectModule, MatSliderModule, MatTooltipModule, MatStepperModule, MatBadgeModule, MatExpansionModule,
    MatDialogModule, MatProgressSpinnerModule, MatBottomSheetModule],
  exports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSnackBarModule,
    MatSelectModule, MatSliderModule, MatTooltipModule, MatStepperModule, MatBadgeModule, MatExpansionModule,
    MatDialogModule, MatProgressSpinnerModule, MatBottomSheetModule],
})
export class MaterialModule { }
