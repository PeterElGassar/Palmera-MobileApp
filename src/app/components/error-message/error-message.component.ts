import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {
  @Input() message: string;
  @Input() fild: FormGroup;
  @Input() error: string;

  constructor() {}

  ngOnInit() {}

  shouldShowComponent() {
    if (this.fild.touched && this.fild.errors?.[this.error]) return true;

    return false;
  }
}
