import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICarro, Carro } from 'app/shared/model/carro.model';
import { CarroService } from './carro.service';
import { IEndereco } from 'app/shared/model/endereco.model';
import { EnderecoService } from 'app/entities/endereco/endereco.service';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { PessoaService } from 'app/entities/pessoa/pessoa.service';

type SelectableEntity = IEndereco | IPessoa;

@Component({
  selector: 'jhi-carro-update',
  templateUrl: './carro-update.component.html',
})
export class CarroUpdateComponent implements OnInit {
  isSaving = false;
  enderecos: IEndereco[] = [];
  pessoas: IPessoa[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    placa: [],
    enderecos: [],
    pessoa: [],
  });

  constructor(
    protected carroService: CarroService,
    protected enderecoService: EnderecoService,
    protected pessoaService: PessoaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ carro }) => {
      this.updateForm(carro);

      this.enderecoService.query().subscribe((res: HttpResponse<IEndereco[]>) => (this.enderecos = res.body || []));

      this.pessoaService.query().subscribe((res: HttpResponse<IPessoa[]>) => (this.pessoas = res.body || []));
    });
  }

  updateForm(carro: ICarro): void {
    this.editForm.patchValue({
      id: carro.id,
      nome: carro.nome,
      placa: carro.placa,
      enderecos: carro.enderecos,
      pessoa: carro.pessoa,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const carro = this.createFromForm();
    if (carro.id !== undefined) {
      this.subscribeToSaveResponse(this.carroService.update(carro));
    } else {
      this.subscribeToSaveResponse(this.carroService.create(carro));
    }
  }

  private createFromForm(): ICarro {
    return {
      ...new Carro(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      placa: this.editForm.get(['placa'])!.value,
      enderecos: this.editForm.get(['enderecos'])!.value,
      pessoa: this.editForm.get(['pessoa'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICarro>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: IEndereco[], option: IEndereco): IEndereco {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
