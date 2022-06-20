import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  Self,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  FormGroup,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => FormInputComponent),
  //     multi: true,
  //   },
  // ],
})
export class FormInputComponent implements OnInit, ControlValueAccessor {
  @ViewChild('inputRef', { static: true }) inputRefElement: ElementRef;
  @Input() type: string = 'text';
  @Input() label: string = 'text';

  @Input() public paremnForm: FormGroup;
  @Input() public fildName: string;

  public value: string;
  public changed: (value: string) => void;
  onTouched = () => {};

  public setDisabled: boolean;

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {}

  get getFormFiled(): FormControl {
    let x = this.paremnForm?.get(this.fildName) as FormControl;

    return x;
  }

  onChange(event: Event) {
    const value: string = (<HTMLInputElement>event.target).value;
    this.changed(value);
  }

  writeValue(val: string): void {
    this.value = val;

    // this.inputRefElement.nativeElement.value = obj || '';
  }

  registerOnChange(fn: any): void {
    this.changed = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
