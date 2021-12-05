import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {UploadingDocument} from '../models/uploading-document.model';
import {DocumentDetailResponse} from '../models/document-detail-response.model';
import {AppResponse} from '../models/app-response';

@Injectable({
  providedIn: 'root'
})
export class MstDocumentService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  DATA_URL = environment.BASE_DATA_URL;

  public saveDocument(uploadingDocument: UploadingDocument): Observable<AppResponse<DocumentDetailResponse>> {
    const formData = new FormData();
    formData.append('documentTypeId', (uploadingDocument.documentTypeId as number).toString());
    formData.append('name', uploadingDocument.name as string);
    formData.append('note', uploadingDocument.note as string);

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < (uploadingDocument.documentList as Array<File>).length; i++) {
      formData.append('documentList', (uploadingDocument.documentList as Array<File>)[i], (uploadingDocument.documentList as Array<File>)[i].name);
    }

    const url = `${this.DATA_URL}${environment.BUSSINESS_URIS.DOCUMENT.UPLOAD}`;
    return this.httpClient.post<AppResponse<DocumentDetailResponse>>(url, formData)
      .pipe(map(response => response));
  }

  public async downloadDocument(dmsRef: string): Promise<void> {
    const url = `${this.DATA_URL}${environment.BUSSINESS_URIS.DOCUMENT.DOWNLOAD}`;
    // const token = await this.authService.getToken();
    const token = '';
    const parameterizedUrl = `${url}/${dmsRef}?access_token=${token}`;
    window.open(parameterizedUrl);
  }

  public scanDocument(): Observable<any> {
    const headers = new HttpHeaders('');
    return this.httpClient.post('http://localhost:8888', null, {headers});
  }
}
