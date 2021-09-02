import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-global-label',
  templateUrl: './global-label.component.html',
  styleUrls: ['./global-label.component.scss']
})
export class GlobalLabelComponent implements OnInit {

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;


  @Input() inputLabel: string;
  @Input() inputValue: any;
  @Input() inputHighlight: boolean;
  @Input() inputPill: boolean;
  @Input() inputPillWarn: boolean;
  @Input() asteriskMarkVisible: boolean;
  @Input() inputNoteTrim: boolean;
  @Input() inputWaring: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  public openMyMenu() {
    this.trigger.openMenu();
  }
  public closeMyMenu() {
    this.trigger.closeMenu();
  }

  copyInputMessage() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.inputValue;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
