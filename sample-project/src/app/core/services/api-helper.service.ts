import { Injectable } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';

import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiHelperService {

  constructor(
  
  ) { }

  throwAPIError(err: HttpErrorResponse) {

  }

  isNotNullOrNotUndefined(item: string) {
    return !(item === undefined || item === null);
  }

  getAPIEndpoint(endString: string) {
    // return environment.apiUrl + environment.api_version  + '/' + endString;
  }

  downloadFile(data: any, filename: string, mime: string) {

  }
}
