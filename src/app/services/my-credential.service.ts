import { Injectable } from '@angular/core';
import { HttpSerivceService } from './http-serivce.service';
import { CredentialInterfaces } from '../models/credential-interfaces';
import { resolve } from 'path';
import { promises } from 'dns';
import { rejects } from 'assert';

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

  getAll(endPoint: string): Promise<any> {
    return new Promise<any>((resolve, rejects) => {
      this.httpService
        .get(endPoint)
        .toPromise()
        .then((res: any) => resolve(res))
        .catch((err) => rejects(err));
    });
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

  getCredentialById(credentialId: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.httpService
        .getById('credentialStore/byCredential', credentialId)
        .toPromise()
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  updateCredentialById(credentialId: number, data: Credential): Promise<any> {
    return new Promise<any>((resolve, reject) =>
      this.httpService
        .updateById(`credentialStore/${credentialId}`, data)
        .toPromise()
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    );
  }
}
