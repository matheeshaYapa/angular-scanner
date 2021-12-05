import {Component, Inject, OnInit} from '@angular/core';
import {MstDocumentTypeResponse} from '../../models/mst-document-type-response.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UploadingDocument} from '../../models/uploading-document.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MstDocumentService} from '../../services/mst-document.service';
import {UiService} from '../../services/ui.service';
import {DocumentDetailResponse} from '../../models/document-detail-response.model';
import {AppResponse} from '../../models/app-response';
import {SoftDocument} from '../../models/soft-document.model';
import {MestDocumentTypeService} from '../../services/mest-document-type.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {

  private moduleCode: string;
  private moduleId: number;

  // **
  public isDocumentUpload: boolean;
  public documentType: string;
  public documentName: string;
  public documentTypeId: number;
  // **

  public shouldVisibleOnlyScanAndUpload: boolean;

  public documentTypeMasterList = new Array<MstDocumentTypeResponse>();
  public addDocumentForm: FormGroup;

  public documentFileList = new Array<File>();
  public uploadingDocument: UploadingDocument = {};

  public isReadable = false;
  public isComplete = false;

  public currentUploadType: 'scan' | 'upload' | 'serviceCounterInquiry' | 'dmuInbound' = 'scan';

  public isDocumentNameAndTypeLocked = false;
  private selectedTabIndex = 0;

  public selectedDocumentList: Array<SoftDocument> = new Array<SoftDocument>();

  constructor(
    private formBuilder: FormBuilder,
    private documentTypeMasterService: MestDocumentTypeService,
    private mstDocumentService: MstDocumentService,
    private uiService: UiService,
    private dialogRef: MatDialogRef<AddDocumentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.moduleCode = data.moduleCode;
    this.moduleId = data.moduleId;
    this.shouldVisibleOnlyScanAndUpload = data.shouldVisibleOnlyScanAndUpload;

    // **
    this.isDocumentUpload = data.isDocumentUpload;
    this.documentType = data.documentType;
    this.documentName = data.documentName;
    this.documentTypeId = data.documentTypeId;
    // **

    this.initForm(false);
  }

  ngOnInit() {
    // **
    if (!this.isDocumentUpload) {
      this.currentUploadType = 'upload';
    } else if (this.isDocumentUpload) {
      this.currentUploadType = 'upload';
    }
    // **
    this.getAllMasterDocumentTypeList();
  }

  get formControls() {
    return this.addDocumentForm.controls;
  }

  onSubmit() {

    if (this.isDocumentUpload) {
      if ((!this.documentFileList || this.documentFileList.length === 0) && (this.selectedTabIndex === 0 || this.selectedTabIndex === 1)) {
        this.uiService.showErrorToastr('Missing Information', 'Please select a file');
        return;
      }

      if (this.selectedTabIndex === 2 || this.selectedTabIndex === 3) {
        this.selectedDocumentList.map(sd => sd.note = this.formControls.note.value);
        // this.updateNote().subscribe(res => {
        //   this.selectedDocumentList.forEach(doc => {
        //     doc.note = res.data.filter((n: { id: number | undefined; }) => n.id === doc.id)[0].note;
        //   });
        //   this.dialogRef.close(this.selectedDocumentList);
        // });

        return;
      }

      this.uploadingDocument.name = this.documentName;
      this.uploadingDocument.documentTypeId = this.documentTypeId;
      this.uploadingDocument.note = this.formControls.note.value ?? '-';
      this.uploadingDocument.documentList = this.documentFileList;
      // this.uploadingDocument.moduleId = this.moduleId;
      // this.uploadingDocument.moduleCode = this.moduleCode;

      this.mstDocumentService.saveDocument(this.uploadingDocument).subscribe((res: AppResponse<DocumentDetailResponse>) => {
        const arrangedResponse = this.arrangeResponse(res);
        if (arrangedResponse) {
          this.uiService.showSuccessToastr('Success', 'Document(s) Added Successfully');
          this.dialogRef.close([arrangedResponse]);
        }
      });

    } else if (!this.isDocumentUpload) {
      this.addDocumentForm.markAllAsTouched();

      if (!this.addDocumentForm.valid) {
        return;
      }

      if ((!this.documentFileList || this.documentFileList.length === 0) && (this.selectedTabIndex === 0 || this.selectedTabIndex === 1)) {
        this.uiService.showErrorToastr('Missing Information', 'Please select a file');
        return;
      }

      if (this.selectedTabIndex === 2 || this.selectedTabIndex === 3) {
        this.selectedDocumentList.map(sd => sd.note = this.formControls.note.value);
        // this.updateNote().subscribe(res => {
        //   this.selectedDocumentList.forEach(doc => {
        //     doc.note = res.data.filter((n: { id: number | undefined; }) => n.id === doc.id)[0].note;
        //   });
        //   this.dialogRef.close(this.selectedDocumentList);
        // });

        return;
      }

      this.uploadingDocument.name = this.formControls.documentName.value;
      this.uploadingDocument.documentTypeId = +this.formControls.documentType.value;
      this.uploadingDocument.note = this.formControls.note.value ?? '';
      this.uploadingDocument.documentList = this.documentFileList;
      // this.uploadingDocument.moduleId = this.moduleId;
      // this.uploadingDocument.moduleCode = this.moduleCode;

      this.mstDocumentService.saveDocument(this.uploadingDocument).subscribe((res: AppResponse<DocumentDetailResponse>) => {
        const arrangedResponse = this.arrangeResponse(res);
        if (arrangedResponse) {
          this.uiService.showSuccessToastr('Success', 'Document(s) Added Successfully');
          this.dialogRef.close([arrangedResponse]);
        }
      });
    }

  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onFilesSelect(event: Array<File>) {
    // this.selectedDocumentList = event;
    this.documentFileList = event;
  }

  onuploadedFilesSelect(event: Array<SoftDocument>) {
    this.selectedDocumentList = event;
  }

  onReadableStatusChange(event: boolean) {
    this.isReadable = event;
  }

  onCompleteStatusChange(event: boolean) {
    this.isComplete = event;
  }

  onDocumentScan(event: any) {

  }

  onSelectedUploadOptionTabChange(index: number) {
    this.selectedTabIndex = index;

    this.isDocumentNameAndTypeLocked = (index === 2 || index === 3);
    this.initForm(this.isDocumentNameAndTypeLocked);

    if (this.isDocumentNameAndTypeLocked) {
      this.addDocumentForm.get('documentType')?.clearValidators();
      this.addDocumentForm.get('documentType')?.updateValueAndValidity();

      this.addDocumentForm.get('documentName')?.clearValidators();
      this.addDocumentForm.get('documentName')?.updateValueAndValidity();
    }
  }

  onUploadTypeChange(value: number) {
    this.onSelectedUploadOptionTabChange(value - 1);
    if (value === 1) {
      this.currentUploadType = 'scan';
      return;
    }

    if (value === 2) {
      this.currentUploadType = 'upload';
      return;
    }

    if (value === 3) {
      this.currentUploadType = 'serviceCounterInquiry';
      return;
    }

    if (value === 4) {
      this.currentUploadType = 'dmuInbound';
      return;
    }
  }

  private initForm(isDocumentNameAndTypeLocked: boolean): void {
    this.addDocumentForm = this.formBuilder.group({
      documentType: [{ value: null, disabled: isDocumentNameAndTypeLocked }, {
        validators: [Validators.required],
      }],
      documentName: [{ value: null, disabled: isDocumentNameAndTypeLocked }, {
        validators: [
          Validators.required,
          Validators.maxLength(100)
        ]
      }],
      note: [null, Validators.maxLength(200)]
    });
  }

  private getAllMasterDocumentTypeList(): void {
    this.documentTypeMasterService.getListForAddDocument().subscribe((res: AppResponse<Array<MstDocumentTypeResponse>>) => {
      this.documentTypeMasterList = res.data ?? [];
    });
  }

  private arrangeResponse(res: AppResponse<DocumentDetailResponse>): SoftDocument | null {
    const softDocument: SoftDocument = {};

    if (!res.data as Array<any>[0] || !res.data) {
      this.uiService.showErrorToastr('Failed', 'Failed to upload the document');
      return null;
    }

    const data = res.data as Array<any>[0];

    const documentType: MstDocumentTypeResponse = {};
    documentType.id = data.document_type_id;
    const matchingDocumentType = this.documentTypeMasterList.filter(dt => dt.id === data.document_type_id)[0];
    documentType.name_eng = matchingDocumentType ? matchingDocumentType.name_eng : '-';

    softDocument.id = data.id;
    softDocument.documentType = documentType;
    softDocument.document_type = documentType.name_eng;
    softDocument.createdAt = data.created_at;
    softDocument.created_at = data.created_at;
    // softDocument.created_at = this.dateFormatService.getFormattedDateFromDateForTableCell(softDocument.createdAt); // formatDate(softDocument.createdAt, 'dd/mm/yyyy', 'en-US');
    softDocument.created_by = data.created_by;
    softDocument.document_name = data.name;
    softDocument.note = data.note;
    softDocument.isForeign = false;
    softDocument.dms_ref = data.dms_ref;

    return softDocument;
  }

  private updateNote(): void {
    const note = this.formControls.note.value;
  }

}
