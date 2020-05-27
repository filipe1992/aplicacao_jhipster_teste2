import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { EnderecoService } from 'app/entities/endereco/endereco.service';
import { IEndereco, Endereco } from 'app/shared/model/endereco.model';

describe('Service Tests', () => {
  describe('Endereco Service', () => {
    let injector: TestBed;
    let service: EnderecoService;
    let httpMock: HttpTestingController;
    let elemDefault: IEndereco;
    let expectedResult: IEndereco | IEndereco[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(EnderecoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Endereco(0, 'AAAAAAA', currentDate, 0, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            estado: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Endereco', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            estado: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            estado: currentDate,
          },
          returnedFromService
        );

        service.create(new Endereco()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Endereco', () => {
        const returnedFromService = Object.assign(
          {
            pais: 'BBBBBB',
            estado: currentDate.format(DATE_TIME_FORMAT),
            bairro: 1,
            rua: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            estado: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Endereco', () => {
        const returnedFromService = Object.assign(
          {
            pais: 'BBBBBB',
            estado: currentDate.format(DATE_TIME_FORMAT),
            bairro: 1,
            rua: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            estado: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Endereco', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
