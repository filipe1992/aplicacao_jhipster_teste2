import { IEndereco } from 'app/shared/model/endereco.model';
import { ICarro } from 'app/shared/model/carro.model';

export interface IPessoa {
  id?: number;
  nome?: string;
  cpf?: string;
  email?: string;
  telefone?: string;
  endereco?: IEndereco;
  carros?: ICarro[];
}

export class Pessoa implements IPessoa {
  constructor(
    public id?: number,
    public nome?: string,
    public cpf?: string,
    public email?: string,
    public telefone?: string,
    public endereco?: IEndereco,
    public carros?: ICarro[]
  ) {}
}
