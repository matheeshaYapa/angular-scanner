import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private toastr: ToastrService) {}

  showSuccessToastr(header: string | undefined, message: string | undefined) {
    this.toastr.success(message, header, {
      disableTimeOut: true,
      closeButton: true,
      extendedTimeOut: 0,
      timeOut: 0
    });
  }

  showErrorToastr(header: string | undefined, message: string | undefined) {
    this.toastr.error(message, header, {
      disableTimeOut: true,
      closeButton: true,
      extendedTimeOut: 0,
      timeOut: 0
    });
  }

  showWarningToastr(header: string | undefined, message: string | undefined) {
    this.toastr.warning(message, header, {
      disableTimeOut: true,
      closeButton: true,
      extendedTimeOut: 0,
      timeOut: 3000
    });
  }

  // Scroll To Top
  scrollTop() {
    window.scrollTo(0, 0);
  }
}
