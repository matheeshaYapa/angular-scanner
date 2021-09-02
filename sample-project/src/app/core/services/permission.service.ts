import { Injectable } from '@angular/core';
import {take} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(

    private router: Router,
    private route: ActivatedRoute
  ) { }

}
