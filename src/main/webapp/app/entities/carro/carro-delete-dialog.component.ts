import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICarro } from 'app/shared/model/carro.model';
import { CarroService } from './carro.service';

@Component({
  templateUrl: './carro-delete-dialog.component.html',
})
export class CarroDeleteDialogComponent {
  carro?: ICarro;

  constructor(protected carroService: CarroService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.carroService.delete(id).subscribe(() => {
      this.eventManager.broadcast('carroListModification');
      this.activeModal.close();
    });
  }
}
