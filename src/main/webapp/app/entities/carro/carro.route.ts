import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICarro, Carro } from 'app/shared/model/carro.model';
import { CarroService } from './carro.service';
import { CarroComponent } from './carro.component';
import { CarroDetailComponent } from './carro-detail.component';
import { CarroUpdateComponent } from './carro-update.component';

@Injectable({ providedIn: 'root' })
export class CarroResolve implements Resolve<ICarro> {
  constructor(private service: CarroService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICarro> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((carro: HttpResponse<Carro>) => {
          if (carro.body) {
            return of(carro.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Carro());
  }
}

export const carroRoute: Routes = [
  {
    path: '',
    component: CarroComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Carros',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CarroDetailComponent,
    resolve: {
      carro: CarroResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Carros',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CarroUpdateComponent,
    resolve: {
      carro: CarroResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Carros',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CarroUpdateComponent,
    resolve: {
      carro: CarroResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Carros',
    },
    canActivate: [UserRouteAccessService],
  },
];
