import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {forkJoin, Observable} from "rxjs";
import {ClaimBeneficiaryBankAccountDetailsGRRV1} from "../../models/claim-beneficiary-bank-account-details-grrv1.model";
import {SampleServiceService} from "../../services/sample-service.service";
import {BeneficiaryBankDetailGRRV1} from "../../models/beneficiary-bank-detail-grrv1.model";
import {BeneficiaryBankAccountDetailCRV1} from "../../models/beneficiary-bank-account-detail-crv1.model";
import {AppResponse} from "../../../../../core/models/response-models/app-response";

@Component({
  selector: 'app-sample-page',
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.scss']
})
export class SamplePageComponent implements OnInit {

  public personData: BeneficiaryBankDetailGRRV1;
  public defaultBankData: ClaimBeneficiaryBankAccountDetailsGRRV1;

  public bankForm: FormGroup;

  constructor(
    private sampleService: SampleServiceService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.setPageLoadData();
  }

  get formControls() {
    return this.bankForm.controls;
  }

  onRadioButtonChange(value: 'local' | 'foreign'): void {
    this.setFormValidations(value);
    this.updateFormValuesOnRadioChange(value);
  }

  onAccountNoInputChange(): void {
    if (this.formControls.accountNo.invalid) {
      this.formControls.reEnterAccountNo.patchValue(null);
      this.formControls.reEnterAccountNo.disable();
    } else {
      this.formControls.reEnterAccountNo.enable();
    }
  }

  onSave(): void {
    if (this.bankForm.invalid) {
      this.bankForm.markAllAsTouched();
      return;
    }
    this.callSaveAPI();
  }

  onCancel(): void {
  }

  private initializeForm(): void {
    this.bankForm = new FormGroup({
        localOrForeignBank: new FormControl(null, {validators: [
            Validators.required
          ]}),
        currencyType: new FormControl(null, {validators: []}),
        bankName: new FormControl(null, {validators: [
            Validators.required
          ]}),
        branchNameDropdown: new FormControl(null, {validators: []}),
        branchNameInput: new FormControl(null, {validators: []}),
        branchAddressLine1: new FormControl(null, {validators: []}),
        branchAddressLine2: new FormControl(null, {validators: []}),
        branchAddressLine3: new FormControl(null, {validators: []}),
        branchCity: new FormControl(null, {validators: []}),
        accountNo: new FormControl(null, {validators: [
            Validators.required, Validators.maxLength(50), Validators.pattern(/^\S[a-zA-Z0-9]*$/)
          ]}),
        reEnterAccountNo: new FormControl({value: null, disabled: true}, {validators: [
            Validators.required
          ]}),
        accountType: new FormControl(null, {validators: []}),
        country: new FormControl(null, {validators: []}),
        swiftCode: new FormControl(null, {validators: []}),
        ibnNo: new FormControl(null, {validators: []}),
        claimNote: new FormControl(null, {validators: []}),
      },
      {
        validators: this.accountNoMustMatchValidator('accountNo', 'reEnterAccountNo')
      });
  }

  private setPageLoadData(): void {
    const personData$ = this.retrievePersonData(135);
    const defaultBankData$ = this.retrieveDefaultBankDetails(641);

    forkJoin( [
      personData$, defaultBankData$
    ])
      .subscribe(
        response => {
          this.personData = (response[0] as AppResponse<BeneficiaryBankDetailGRRV1>).data;

          this.defaultBankData = (response[1] as AppResponse<ClaimBeneficiaryBankAccountDetailsGRRV1>).data;

          this.setDefaultFormValues(this.defaultBankData ?? null, true);

        }, () => {
          console.log('Error retrieving data');
        }
      );
  }

  private retrievePersonData(claimBeneficiaryId: number): Observable<any> {
    return this.sampleService.retrievePersonDetails(claimBeneficiaryId);
  }

  private retrieveDefaultBankDetails(bankAccountId: number): Observable<any> {
    return this.sampleService.retrieveDefaultBankDetails(bankAccountId);
  }

  private setDefaultFormValues(data: ClaimBeneficiaryBankAccountDetailsGRRV1, isUpdate: boolean): void {
    this.bankForm.patchValue({
      localOrForeignBank: isUpdate ? (data.account_category === 0 ? 'local' : 'foreign') : 'local',
      bankName: isUpdate ? data.bank_id : null,
      currencyType: 'USD',
      accountNo: isUpdate ? data.account_no : null,
    });
    if (isUpdate) {
      if (this.formControls.localOrForeignBank.value === 'local') {
        this.bankForm.patchValue({
          branchNameDropdown: data.local_branch_id ?? null,
          branchAddressLine1: data.local_address1 ?? null,
          branchAddressLine2: data.local_address2 ?? null,
          branchAddressLine3: data.local_address3 ?? null,
          branchCity: data.local_address_city ?? null,
          accountType: data.account_type_code ?? null,
        });
      } else if (this.formControls.localOrForeignBank.value === 'foreign') {
        this.bankForm.patchValue({
          branchNameInput: data.foreign_branch_name ?? null,
          branchAddressLine1: data.foreign_branch_address1 ?? null,
          branchAddressLine2: data.foreign_branch_address2 ?? null,
          branchAddressLine3: data.foreign_branch_address3 ?? null,
          branchCity: data.foreign_branch_address_city ?? null,
          country: data.country_id ?? null,
          swiftCode: data.swift_code ?? null,
          ibnNo: data.ibn_no ?? null
        });
      }

      this.formControls.reEnterAccountNo.enable();
    }
    this.setFormValidations(this.formControls.localOrForeignBank.value);
  }

  private setFormValidations(localOrForeign: 'local' | 'foreign'): void {
    if (localOrForeign === 'local') {

      this.formControls.branchNameInput.clearValidators();
      this.formControls.branchAddressLine1.clearValidators();
      this.formControls.branchAddressLine2.clearValidators();
      this.formControls.branchAddressLine3.clearValidators();
      this.formControls.branchCity.clearValidators();
      this.formControls.country.clearValidators();
      this.formControls.swiftCode.clearValidators();
      this.formControls.ibnNo.clearValidators();

      this.formControls.branchNameDropdown.setValidators(Validators.required);
      this.formControls.accountType.setValidators(Validators.required);

    } else if (localOrForeign === 'foreign') {

      this.formControls.branchNameDropdown.clearValidators();
      this.formControls.accountType.clearValidators();

      this.formControls.branchNameInput.setValidators([Validators.required, Validators.maxLength(255)]);
      this.formControls.branchAddressLine1.setValidators([Validators.required, Validators.maxLength(100)]);
      this.formControls.branchAddressLine2.setValidators(Validators.maxLength(50));
      this.formControls.branchAddressLine3.setValidators(Validators.maxLength(50));
      this.formControls.branchCity.setValidators([Validators.required, Validators.maxLength(50)]);
      this.formControls.country.setValidators(Validators.required);
      this.formControls.swiftCode.setValidators([
        Validators.required, Validators.maxLength(100), Validators.pattern(/^\S[a-zA-Z0-9]*$/)
      ]);
      this.formControls.ibnNo.setValidators([
        Validators.required, Validators.maxLength(100), Validators.pattern(/^\S[a-zA-Z0-9]*$/)
      ]);

    }
    this.formControls.branchNameDropdown.updateValueAndValidity();
    this.formControls.branchAddressLine1.updateValueAndValidity();
    this.formControls.branchAddressLine2.updateValueAndValidity();
    this.formControls.branchAddressLine3.updateValueAndValidity();
    this.formControls.branchCity.updateValueAndValidity();
    this.formControls.country.updateValueAndValidity();
    this.formControls.accountType.updateValueAndValidity();
    this.formControls.branchNameInput.updateValueAndValidity();
    this.formControls.swiftCode.updateValueAndValidity();
    this.formControls.ibnNo.updateValueAndValidity();
  }

  private updateFormValuesOnRadioChange(localOrForeign: 'local' | 'foreign'): void {
    this.formControls.currencyType.patchValue(localOrForeign === 'local' ? 'LKR' : 'USD');
    this.formControls.bankName.patchValue(null);
    this.formControls.branchNameDropdown.patchValue(null);
    this.formControls.branchAddressLine1.patchValue(null);
    this.formControls.branchAddressLine2.patchValue(null);
    this.formControls.branchAddressLine3.patchValue(null);
    this.formControls.branchCity.patchValue(null);
  }

  private accountNoMustMatchValidator(controlName: string, matchingControlName: string): (formGroup: FormGroup) => any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  private callSaveAPI(): void {
    this.sampleService.saveBankDetails(this.setSaveRequest());
  }

  private setSaveRequest(): BeneficiaryBankAccountDetailCRV1 {
    return {
      account_name: null,
      account_no: this.formControls.accountNo.value,
      bank_account_category: this.formControls.localOrForeignBank.value === 'local' ? 0 : 1,
      bank_account_detail_id: 641,
      bank_account_type_code: this.formControls.localOrForeignBank.value === 'local' ?
        this.formControls.accountType.value : null,
      bank_id: this.formControls.bankName.value,
      bank_name: null,
      beneficiary_id: 135,
      claim_note: this.formControls.claimNote.value,
      currency_code: this.formControls.currencyType.value,
      foreign_bank_branch_address_details: this.formControls.localOrForeignBank.value === 'foreign' ? {
        address1: this.formControls.branchAddressLine1.value,
        address2: this.formControls.branchAddressLine2.value,
        address3: this.formControls.branchAddressLine3.value,
        city: this.formControls.branchCity.value,
        country_id: this.formControls.country.value
      } : null,
      foreign_bank_branch_name: this.formControls.localOrForeignBank.value === 'foreign' ?
        this.formControls.branchNameInput.value : null,
      ibn_no: this.formControls.localOrForeignBank.value === 'foreign' ?
        this.formControls.ibnNo.value : null,
      local_bank_branch_id: this.formControls.localOrForeignBank.value === 'local' ?
        this.formControls.branchNameDropdown.value : null,
      local_bank_branch_name: null,
      swift_code: this.formControls.localOrForeignBank.value === 'foreign' ?
        this.formControls.swiftCode.value : null
    };
  }

}
