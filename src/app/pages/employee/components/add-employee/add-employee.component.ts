import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormInputTypes } from 'src/app/core/guards/Enums/form-enum';
import { RegisterFilds } from 'src/app/core/guards/Enums/register-fils';
import { UserInqury } from 'src/app/shared/models/user';
import { AnimationController, ModalController } from '@ionic/angular';
import { DropdownValue } from 'src/app/core/guards/Utilities/Dropdown';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  registerForm: FormGroup;
  newDropdownItemForm: FormGroup;
  @ViewChild('filterContent', { read: TemplateRef })
  filterContent: TemplateRef<any>;

  //form enum
  public formInput = FormInputTypes;
  public registerFilds = RegisterFilds;
  //form enum
  userInqury: UserInqury;
  nationalities: DropdownValue[] = [{ label: 'Egyptian', value: '131654' }];
  nationality: DropdownValue;
  isModalOpen: boolean = false;
  constructor(private fm: FormBuilder, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.createRegisterForm();
  }
  get emailField(): FormGroup {
    return this.registerForm.get(this.formInput.email) as FormGroup;
  }

  get employeeNOField(): FormGroup {
    return this.registerForm.get('employeeNO') as FormGroup;
  }

  get employeeName(): FormGroup {
    return this.registerForm.get('employeeName') as FormGroup;
  }

  get roleIdField(): FormGroup {
    return this.registerForm.get('civilId') as FormGroup;
  }

  get dropdownValue(): FormGroup {
    return this.newDropdownItemForm.get('value') as FormGroup;
  }

  createRegisterForm() {
    this.registerForm = this.fm.group({
      employeeNO: [null],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$'),
        ],
      ],

      employeeName: [null, [Validators.required, Validators.maxLength(100)]],
      civilId: [null, [Validators.required]],
      nationalityId: [null, [Validators.required]],
      religionId: [null, [Validators.required]],
      maritalStatusId: [null, [Validators.required]],
      qualificationsId: [null, [Validators.required]],
    });

    this.newDropdownItemForm = this.fm.group({
      label: [null, [Validators.required]],
      value: [null, [Validators.required]],
    });
  }

  async submitForm() {}

  onChangeDropdownValue(dropdownValue: any) {
    debugger;
    this.registerForm.get(this.registerFilds.roleId).setValue(dropdownValue);
    console.log('on change: ' + dropdownValue);
  }

  addNewNationality() {
    let item = new DropdownValue(
      this.newDropdownItemForm.get('value').value,
      this.newDropdownItemForm.get('value').value
    );
    debugger;
    this.nationalities.push(item);
    this.cancel();
  }

  isModalOpenClosed(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
