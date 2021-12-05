import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SelectionModel} from '@angular/cdk/collections';
import {MstDocumentService} from '../services/mst-document.service';
import {UiService} from '../services/ui.service';
import {SoftDocument} from '../models/soft-document.model';
import {AddDocumentComponent} from './add-document/add-document.component';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  @Input() title = 'Document Details';
  @Input() isServiceRequestDocumentAvailable = false;
  @Input() isAttachToEmployerAvailable = false;
  @Input() isAttachToPersonAvailable = false;
  @Input() shouldVisibleOnlyScanAndUpload = false;
  @Input() isViewOutboundAvailable = false;
  @Input() isAddDocumentAvailable = true;

  @Input() moduleCode = '';
  @Input() moduleId = 0;

  @Input() data = new Array<SoftDocument>();

  @Output() documentRemove = new EventEmitter<SoftDocument>();
  @Output() documentDownload = new EventEmitter<SoftDocument>();
  @Output() addDocumentDialogOpen = new EventEmitter();
  @Output() documentAdd = new EventEmitter<Array<SoftDocument>>();
  // @Output() pageChange = new EventEmitter<number>();
  // @Output() rowsPerPageChange = new EventEmitter<number>();

  @ViewChild(MatSort, { static: false }) sort: MatSort | undefined;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator | undefined;

  public dataSource = new MatTableDataSource<SoftDocument>([]);
  public selection = new SelectionModel();
  public pageSize = 10;
  public expandedElement: any | null;

  public dialogRef: MatDialogRef<AddDocumentComponent> | undefined;

  public displayedColumns: Array<string> = [
    'index',
    'createdAt',
    // 'createdBy',
    'documentType',
    'documentName',
    // 'serviceRequestDocument', // DYNAMIC
    // 'note',
    // 'isAttachToEmployer', // DYNAMIC
    // 'isAttachToPerson', // DYNAMIC
    'functions'
  ];

  constructor(
    private mstDocumentService: MstDocumentService,
    private uiService: UiService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.initiateTheDataSource();
  }

  get isTableVisible() {
    return this.dataSource && this.dataSource.data && this.dataSource.data.length > 0;
  }

  onRemoveDocumentClick(softDocument: SoftDocument, index: number) {
    const currentData = this.dataSource.data;

    const currentDataIndex = currentData.indexOf(softDocument) as number;
    currentData.splice(currentDataIndex, 1);

    this.dataSource.data = currentData;
    this.cdr.detectChanges();
    // this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator as MatPaginator;

    this.documentRemove.emit(softDocument);
    this.uiService.showSuccessToastr('Removed', 'Document removed successfully');
  }

  onDownloadDocumentClick(softDocument: SoftDocument) {
    this.mstDocumentService.downloadDocument(softDocument.dms_ref as string);

    this.documentDownload.emit(softDocument);
  }

  public getDocumentList(): Array<SoftDocument> {
    if (!this.dataSource || !this.dataSource.data || this.dataSource.data.length === 0) {
      return new Array<SoftDocument>();
    }

    return this.dataSource.data;
  }

  public getForeignDocumentList(): Array<SoftDocument> {
    if (!this.dataSource || !this.dataSource.data || this.dataSource.data.length === 0) {
      return new Array<SoftDocument>();
    }

    return this.dataSource.data.filter(d => d.isForeign);
  }

  public getLocalDocumentList(): Array<SoftDocument> {
    if (!this.dataSource || !this.dataSource.data || this.dataSource.data.length === 0) {
      return new Array<SoftDocument>();
    }
    return this.dataSource.data.filter(d => !d.isForeign);
  }

  public setData(data: Array<SoftDocument>): void {
    data.map(d => !d.isNewlyAdded ? d.isForeign = true : false);
    data.map(d => d.createdAt = new Date(d.created_at as string));
    // data.map(d => d.created_at = this.dateFormatService.getFormattedDateFromStringForTableCell(d.created_at));
    this.dataSource.data = data;
    this.cdr.detectChanges();
    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;
  }

  public getDetails(element: any) {
  }

  public openAddDocumentPopup() {
    this.dialogRef = this.dialog.open(AddDocumentComponent, {
      disableClose: true,
      width: '60rem',
      data: {
        moduleCode: this.moduleCode,
        moduleId: this.moduleId,
        shouldVisibleOnlyScanAndUpload: this.shouldVisibleOnlyScanAndUpload
      },
      panelClass: 'custom-modalbox'
    });

    this.addDocumentDialogOpen.emit();

    this.dialogRef.afterClosed().subscribe((data: Array<SoftDocument>) => {
      if (!data) { return; }

      data = data.map(item => {
        item.isAttachToEmployer = this.isAttachToEmployerAvailable;
        item.isAttachToPerson = this.isAttachToPersonAvailable;
        item.isServiceRequestDocument = this.isServiceRequestDocumentAvailable;
        return item;
      });

      let sourceData = this.dataSource.data;
      sourceData.push(...data);

      // data.map(d => d.createdAt = new Date(d.created_at));
      // sourceData.map(sd => sd.created_at = this.dateFormatService.getFormattedDateFromStringForTableCell(sd.created_at));

      sourceData = sourceData.sort((d1, d2) => new Date(d2.createdAt as Date).getTime() - new Date(d1.createdAt as Date).getTime());

      this.dataSource.data = sourceData;
      this.cdr.detectChanges();
      // this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator as MatPaginator;

      this.documentAdd.emit(data);
    });
  }

  private initiateTheDataSource(): void {
    // This function will initiate the datasource and table columns as requested
    if (this.data) {
      this.data.map(d => d.isForeign = true);
      this.data.map(d => d.createdAt = new Date(d.created_at as string));
      // this.data.map(d => d.created_at = this.dateFormatService.getFormattedDateFromStringForTableCell(d.created_at));

      this.dataSource = new MatTableDataSource<SoftDocument>(this.data);
      this.cdr.detectChanges();
      this.dataSource.sort = this.sort as MatSort;
      this.dataSource.paginator = this.paginator as MatPaginator;
    }

    this.displayedColumns =
      !this.isServiceRequestDocumentAvailable ?
        this.displayedColumns.filter(e => e !== 'serviceRequestDocument') :
        this.displayedColumns;

    this.displayedColumns =
      !this.isAttachToEmployerAvailable ?
        this.displayedColumns.filter(e => e !== 'attachToEmployer') :
        this.displayedColumns;

    this.displayedColumns =
      !this.isAttachToPersonAvailable ?
        this.displayedColumns.filter(e => e !== 'attachToPerson') :
        this.displayedColumns;
  }

}
