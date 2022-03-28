import { TestBed, waitForAsync } from '@angular/core/testing';
import { ClientIpService } from './client-ip.service';
import { Nullable } from '../models/nullable';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { environment } from 'src/environments/environment';

describe('ClientIpService', () => {
  let service: ClientIpService;
  let _result: Nullable<string>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{ provide: HttpClient, useclass: HttpClient }],
    });
    service = TestBed.inject(ClientIpService);
  });

  it('should be created', () => {
    givenAService();
    thenExists();
  });

  it(
    'getClientIp should return an IP or null ',
    waitForAsync(async () => {
      givenAService();
      await whenGetClientIp();
      thenReturnIpOrNull();
    }),
  );

  function givenAService() {
    service = TestBed.inject(ClientIpService);
  }

  function thenExists() {
    expect(service).toBeTruthy();
  }

  async function whenGetClientIp() {
    _result = await service.getClientIp().toPromise();
    console.log('AAAAA', _result);
  }

  function thenReturnIpOrNull() {
    expect(_result).toBeDefined();
  }
});
