import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICarro } from 'app/shared/model/carro.model';
import { CarroService } from './carro.service';
import { CarroDeleteDialogComponent } from './carro-delete-dialog.component';

@Component({
  selector: 'jhi-carro',
  templateUrl: './carro.component.html',
})
export class CarroComponent implements OnInit, OnDestroy {
  carros?: ICarro[];
  eventSubscriber?: Subscription;

  constructor(protected carroService: CarroService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.carroService.query().subscribe((res: HttpResponse<ICarro[]>) => (this.carros = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCarros();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICarro): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCarros(): void {
    this.eventSubscriber = this.eventManager.subscribe('carroListModification', () => this.loadAll());
  }

  delete(carro: ICarro): void {
    const modalRef = this.modalService.open(CarroDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.carro = carro;
  }
}
