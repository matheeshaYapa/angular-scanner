import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MstDocumentTypeResponse} from '../models/mst-document-type-response.model';
import {AppResponse} from '../models/app-response';

@Injectable({
  providedIn: 'root'
})
export class MestDocumentTypeService {

  ADMIN_URL = environment.BASE_META_URL;
  META_URL = environment.BASE_META_URL;
  DATA_URL = environment.BASE_DATA_URL;
  constructor(private httpClient: HttpClient) {

  }

  getListForAddDocument(): Observable<AppResponse<MstDocumentTypeResponse[]>> {
    return this.httpClient.get<AppResponse<MstDocumentTypeResponse[]>>
      (this.ADMIN_URL + environment.ADMIN_URIS.MST_DOCUMENT_TYPE_FOR_ADD_DOCUMENT);
  }

}
