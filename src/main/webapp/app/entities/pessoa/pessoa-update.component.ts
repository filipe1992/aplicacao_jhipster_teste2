import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPessoa, Pessoa } from 'app/shared/model/pessoa.model';
import { PessoaService } from './pessoa.service';
import { IEndereco } from 'app/shared/model/endereco.model';
import { EnderecoService } from 'app/entities/endereco/endereco.service';

@Component({
  selector: 'jhi-pessoa-update',
  templateUrl: './pessoa-update.component.html',
})
export class PessoaUpdateComponent implements OnInit {
  isSaving = false;
  enderecos: IEndereco[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    cpf: [],
    email: [],
    telefone: [],
    endereco: [],
  });

  constructor(
    protected pessoaService: PessoaService,
    protected enderecoService: EnderecoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pessoa }) => {
      this.updateForm(pessoa);

      this.enderecoService
        .query({ filter: 'pessoa-is-null' })
        .pipe(
          map((res: HttpResponse<IEndereco[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IEndereco[]) => {
          if (!pessoa.endereco || !pessoa.endereco.id) {
            this.enderecos = resBody;
          } else {
            this.enderecoService
              .find(pessoa.endereco.id)
              .pipe(
                map((subRes: HttpResponse<IEndereco>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IEndereco[]) => (this.enderecos = concatRes));
          }
        });
    });
  }

  updateForm(pessoa: IPessoa): void {
    this.editForm.patchValue({
      id: pessoa.id,
      nome: pessoa.nome,
      cpf: pessoa.cpf,
      email: pessoa.email,
      telefone: pessoa.telefone,
      endereco: pessoa.endereco,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pessoa = this.createFromForm();
    if (pessoa.id !== undefined) {
      this.subscribeToSaveResponse(this.pessoaService.update(pessoa));
    } else {
      this.subscribeToSaveResponse(this.pessoaService.create(pessoa));
    }
  }

  private createFromForm(): IPessoa {
    return {
      ...new Pessoa(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      cpf: this.editForm.get(['cpf'])!.value,
      email: this.editForm.get(['email'])!.value,
      telefone: this.editForm.get(['telefone'])!.value,
      endereco: this.editForm.get(['endereco'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPessoa>>): void {
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

  trackById(index: number, item: IEndereco): any {
    return item.id;
  }
}
