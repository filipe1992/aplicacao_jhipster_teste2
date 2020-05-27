import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { AplicacaoTest2SharedModule } from 'app/shared/shared.module';
import { AplicacaoTest2CoreModule } from 'app/core/core.module';
import { AplicacaoTest2AppRoutingModule } from './app-routing.module';
import { AplicacaoTest2HomeModule } from './home/home.module';
import { AplicacaoTest2EntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    AplicacaoTest2SharedModule,
    AplicacaoTest2CoreModule,
    AplicacaoTest2HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    AplicacaoTest2EntityModule,
    AplicacaoTest2AppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class AplicacaoTest2AppModule {}
