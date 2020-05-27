import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IEndereco, Endereco } from 'app/shared/model/endereco.model';
import { EnderecoService } from './endereco.service';

@Component({
  selector: 'jhi-endereco-update',
  templateUrl: './endereco-update.component.html',
})
export class EnderecoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    pais: [],
    estado: [],
    bairro: [],
    rua: [],
  });

  constructor(protected enderecoService: EnderecoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ endereco }) => {
      if (!endereco.id) {
        const today = moment().startOf('day');
        endereco.estado = today;
      }

      this.updateForm(endereco);
    });
  }

  updateForm(endereco: IEndereco): void {
    this.editForm.patchValue({
      id: endereco.id,
      pais: endereco.pais,
      estado: endereco.estado ? endereco.estado.format(DATE_TIME_FORMAT) : null,
      bairro: endereco.bairro,
      rua: endereco.rua,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const endereco = this.createFromForm();
    if (endereco.id !== undefined) {
      this.subscribeToSaveResponse(this.enderecoService.update(endereco));
    } else {
      this.subscribeToSaveResponse(this.enderecoService.create(endereco));
    }
  }

  private createFromForm(): IEndereco {
    return {
      ...new Endereco(),
      id: this.editForm.get(['id'])!.value,
      pais: this.editForm.get(['pais'])!.value,
      estado: this.editForm.get(['estado'])!.value ? moment(this.editForm.get(['estado'])!.value, DATE_TIME_FORMAT) : undefined,
      bairro: this.editForm.get(['bairro'])!.value,
      rua: this.editForm.get(['rua'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEndereco>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
