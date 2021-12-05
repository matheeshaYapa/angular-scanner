import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MstDocumentService} from '../../../services/mst-document.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-scan-document',
  templateUrl: './scan-document.component.html',
  styleUrls: ['./scan-document.component.scss']
})
export class ScanDocumentComponent implements OnInit {

  @Output() readableStatusChange = new EventEmitter<boolean>();
  @Output() completeStatusChange = new EventEmitter<boolean>();
  @Output() scanDocument = new EventEmitter<any>();


  public documentUrl: SafeResourceUrl | undefined;
  public isReadable = false;
  public isComplete = false;

  constructor(
    private sanitizer: DomSanitizer,
    private mstDocumentService: MstDocumentService,
  ) { }

  ngOnInit() {

  }

  onScanClick() {
    // this.documentUrl = 'https://file-examples.com/wp-content/uploads/2017/10/file_example_TIFF_1MB.tiff';
    // this.scanDocument.emit(this.documentUrl);

    this.mstDocumentService.scanDocument().subscribe(response => {
      if (response) {
        this.documentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(response.image);
      }
    });
  }

  onRedableStatusChange() {
    this.readableStatusChange.emit(this.isReadable);
  }

  onCompleteStatusChange() {
    this.completeStatusChange.emit(this.isComplete);
  }

}
