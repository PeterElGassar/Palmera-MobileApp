import { FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ErrorMessageComponent),
      multi: true,
    },
  ],
})
export class ErrorMessageComponent implements OnInit {
  @Input() message: string;
  @Input() fild: FormGroup;
  @Input() error: string;

  constructor() {}

  ngOnInit() {}

  shouldShowRequired() {
    debugger;
    if (this.fild.dirty && this.fild.hasError('required')) return true;
    return false;
  }

  shouldShowPattern() {
    if (this.fild.dirty && this.fild.errors && this.fild.errors.pattern)
      return true;

    return false;
  }
}
