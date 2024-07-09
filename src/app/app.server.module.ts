import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { MetaTagsService } from './shared/service/meta-tags.service';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    
  ],
  providers: [
    MetaTagsService 
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
