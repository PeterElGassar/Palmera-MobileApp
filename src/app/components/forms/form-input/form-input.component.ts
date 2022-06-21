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
import { FormInputTypes } from 'src/app/core/guards/Enums/form-enum';

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
  @Input() label: string = 'text';
  @Input() public paremnForm: FormGroup;
  @Input() public fildName: string;

  formInput = FormInputTypes;
  showPassword: boolean = false;
  passwordToggalicon: string = 'eye-outline';

  public value: string;
  public changed: (value: string) => void;
  onTouched = () => {};

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    console.log('Name: ' + this.fildName);
    console.log('Enum Name: ' + this.formInput[this.fildName]);
  }

  get getFormFiled(): FormControl {
    return this.paremnForm?.get(this.fildName) as FormControl;
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
