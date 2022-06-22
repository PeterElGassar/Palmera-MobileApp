import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DropdownValue } from 'src/app/core/guards/Utilities/Dropdown';

@Component({
  selector: 'app-form-dropdown',
  templateUrl: './form-dropdown.component.html',
  styleUrls: ['./form-dropdown.component.scss'],
})
export class FormDropdownComponent implements OnInit {
  @Input() values: any[];

  @Input() value: string[];

  @Input() dropdownLabel: string;

  @Output() valueChange: EventEmitter<any>;

  constructor(private elementRef: ElementRef) {
    this.valueChange = new EventEmitter();
  }

  ngOnInit() {}

  onSelect(event: any) {
    debugger;
    this.valueChange.emit(event.target.value);
  }
}
