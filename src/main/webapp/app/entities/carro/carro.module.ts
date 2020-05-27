import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AplicacaoTest2SharedModule } from 'app/shared/shared.module';
import { CarroComponent } from './carro.component';
import { CarroDetailComponent } from './carro-detail.component';
import { CarroUpdateComponent } from './carro-update.component';
import { CarroDeleteDialogComponent } from './carro-delete-dialog.component';
import { carroRoute } from './carro.route';

@NgModule({
  imports: [AplicacaoTest2SharedModule, RouterModule.forChild(carroRoute)],
  declarations: [CarroComponent, CarroDetailComponent, CarroUpdateComponent, CarroDeleteDialogComponent],
  entryComponents: [CarroDeleteDialogComponent],
})
export class AplicacaoTest2CarroModule {}
