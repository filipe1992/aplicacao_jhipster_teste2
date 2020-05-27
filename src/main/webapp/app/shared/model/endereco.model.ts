import { Moment } from 'moment';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { ICarro } from 'app/shared/model/carro.model';

export interface IEndereco {
  id?: number;
  pais?: string;
  estado?: Moment;
  bairro?: number;
  rua?: number;
  pessoa?: IPessoa;
  carros?: ICarro[];
}

export class Endereco implements IEndereco {
  constructor(
    public id?: number,
    public pais?: string,
    public estado?: Moment,
    public bairro?: number,
    public rua?: number,
    public pessoa?: IPessoa,
    public carros?: ICarro[]
  ) {}
}
