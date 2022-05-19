import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

// import { FloatingChatComponent } from "./floating-chat/floating-chat.component";

@NgModule({
  // entryComponents: [NotificationComponent],
  declarations: [
    // SearchProductsComponent
    HeaderComponent,
  ],
  exports: [
    // SearchProductsComponent
    HeaderComponent,
  ],
  imports: [IonicModule, ReactiveFormsModule, CommonModule, FormsModule],
})
export class IeComponentsModule {}
