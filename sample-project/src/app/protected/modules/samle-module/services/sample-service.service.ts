import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {BeneficiaryBankAccountDetailCRV1} from "../models/beneficiary-bank-account-detail-crv1.model";

@Injectable({
  providedIn: 'root'
})
export class SampleServiceService {

  bearer = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI4SjViakJOSkFyZDBDMngyNzhKODZpall5Y2pYUy12ci1FdUpVVEZ5d2xRIn0.eyJleHAiOjE2MzMyMjQ1NjgsImlhdCI6MTYyNTQ0ODU2OCwianRpIjoiNDA0NzFiYzAtZDQ0OS00YTNkLWIzN2UtMmYzZjRhYzUyMTk2IiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMS4xNTc6ODA4MC9hdXRoL3JlYWxtcy9FVEZCX1JFQUxNIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImEwZDQ2YTNjLTE1NGMtNDM1Ny05MTI2LWIxYmM1MTliMTg5NSIsInR5cCI6IkJlYXJlciIsImF6cCI6IkVURkJfRkUiLCJzZXNzaW9uX3N0YXRlIjoiMjBhNjY1ZTgtYzg3Mi00MmNjLThjNjQtYWRjODY0ZjBiYWNkIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIEVURkJfQ0xJRU5UX1NDT1BFXzEiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImV0ZmJVc2VySWQiOjEzLCJuYW1lIjoiRlNUNCIsInByZWZlcnJlZF91c2VybmFtZSI6ImZzdDQiLCJnaXZlbl9uYW1lIjoiRlNUNCJ9.c8C3jcQbhW4KhhRTwxuRVCbH9IzF22-oN_o2RZ9uWdLEj8E1vEMndFtSkiPM8GlpAA-Okp9IXaPXQO4V8qRTdfMbKNoUW9pwgBUQKKR5LcuYH10RVECEsZBhlEJmeTW1GuG44L_l4OemvM2KqdzHOaweYukOyAzBKg5nmVAkGe1oqneDEUe0P-q5XCzslxh7FTVhNQrP25HApX0_QO0DVF-DQUK1YqOOhOSHgTgvWFiNrROl971ZKWrV5r911BigtlFlQPdZxfyZoMKRNiaY37c4ih8rc-KzsunBVcaDXOK-Tmqfe5hQyVcZxxPT_psfkIHoIOEhjAyzBQWCWnXf9Q`;

  constructor(private httpClient: HttpClient) { }

  retrievePersonDetails(claimBeneficiaryId: number): Observable<any> {
    const headers = new HttpHeaders({Authorization: this.bearer});
    return this.httpClient.get(
      `${environment.BASE_DATA_URL}/bu/v1/claims/claims/beneficiary-bank-details/${claimBeneficiaryId}`,
      {headers: headers}
    );
  }

  retrieveDefaultBankDetails(bankAccountId: number): Observable<any> {
    const headers = new HttpHeaders({Authorization: this.bearer});
    return this.httpClient.get(
      `${environment.BASE_DATA_URL}/bu/v1/claim/claims/beneficiary-bank-account-details/${bankAccountId}`,
      {headers: headers}
    );
  }

  saveBankDetails(request: BeneficiaryBankAccountDetailCRV1): void {
    const headers = new HttpHeaders({Authorization: this.bearer});
    this.httpClient.post(
      `${environment.BASE_DATA_URL}/bu/v1/claims/bank-account-details`,
      {data: request},
      {headers: headers}
    ).subscribe(response => {
      console.log(response);
    });
  }
}
