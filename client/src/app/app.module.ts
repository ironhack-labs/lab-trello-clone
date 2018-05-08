import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragulaModule } from 'ng2-dragula';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { CustomToastrOption } from './shared/toastr-options';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BoardComponent } from './board/board.component';
import { ListComponent } from './list/list.component';
import { CardComponent } from './card/card.component';
import { ModalComponent } from './card/modal/modal.component';

import { DragulaHandler } from './shared/dragula.service';
import { ListService } from './shared/list.service';
import { CardService } from './shared/card.service';
import { PlaceholderComponent } from './list/placeholder/placeholder.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BoardComponent,
    ListComponent,
    CardComponent,
    ModalComponent,
    PlaceholderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DragulaModule,
    NgbModule.forRoot(),
    ToastModule.forRoot()
  ],
  entryComponents: [
    ModalComponent
  ],
  providers: [
    DragulaHandler,
    ListService,
    CardService,
    { provide: ToastOptions, useValue: CustomToastrOption },
    { provide: 'BASE_ENDPOINT', useValue: environment.baseEndpoint },
    { provide: 'API_ENDPOINT', useValue: environment.apiEndpoint }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
