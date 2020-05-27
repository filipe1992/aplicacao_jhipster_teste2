import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'pessoa',
        loadChildren: () => import('./pessoa/pessoa.module').then(m => m.AplicacaoTest2PessoaModule),
      },
      {
        path: 'carro',
        loadChildren: () => import('./carro/carro.module').then(m => m.AplicacaoTest2CarroModule),
      },
      {
        path: 'endereco',
        loadChildren: () => import('./endereco/endereco.module').then(m => m.AplicacaoTest2EnderecoModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class AplicacaoTest2EntityModule {}
