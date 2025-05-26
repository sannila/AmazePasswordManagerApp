import { Injectable } from '@angular/core';
import { HttpSerivceService } from './http-serivce.service';
import { CredentialInterfaces } from '../models/credential-interfaces';
import { resolve } from 'path';

@Injectable({ providedIn: 'root' })
export class MyCredentialService {
  constructor(private httpService: HttpSerivceService) {}

  getCredentialList(credentialIdList: number[]): Promise<any> {
    return new Promise<any>((resolve, reject) =>
      this.httpService
        .getByIdList('credentialStore/byCredentialList', credentialIdList)
        .toPromise()
        .then((res: any) => resolve(res))
        .catch((err) => reject(err))
    );
  }

  //category/categoryList
  getCategoryList(categoryIdList: number[]): Promise<any> {
    return new Promise<any>((resolve, reject) =>
      this.httpService
        .getByIdList('category/categoryList', categoryIdList)
        .toPromise()
        .then((res: any) => resolve(res))
        .catch((err) => reject(err))
    );
  }
}
