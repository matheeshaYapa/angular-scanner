import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.scss']
})
export class UploadDocumentComponent implements OnInit {

  @Output() fileSelect = new EventEmitter<Array<File>>();

  public selectedDocumentName = '';
  public acceptedFileFormatList = new Array<string>();

  constructor() { }

  ngOnInit() {
    this.acceptedFileFormatList = ['.png', '.jpg', '.jpeg', '.gif', '.tiff', '.doc', '.docx', '.xls', '.xlsx', '.pdf', '.ppt', '.pptx', '.txt', '.zip', '.csv'];
  }

  onFileInput(event: any) {
    this.selectedDocumentName = event.target.value;
    this.fileSelect.emit(event.target.files);
  }

  onAddClick() {

  }

}
