import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { NgbModule } from 'bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProgressComponent } from './progress/progress.component';
import { ProgressStepComponent } from './progress/progress-step/progress-step.component';
import { ProgressStepDirective } from './progress/progress-step.directive';

@NgModule({
  declarations: [
    AppComponent,
    ProgressComponent,
    ProgressStepComponent,
    ProgressStepDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  //  NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
