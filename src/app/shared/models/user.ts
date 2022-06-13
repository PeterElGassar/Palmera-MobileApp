export class User {
  /**
   *
   */
  constructor(
    uid,
    email,
    name,
    password,
    phone,
    organizationCode,
    employeeNumber,
    roleId
  ) {
    (this.uid = uid),
      (this.email = email),
      (this.name = name),
      (this.password = password),
      (this.phone = phone),
      (this.organizationCode = organizationCode),
      (this.employeeNumber = employeeNumber),
      (this.roleId = roleId);
  }

  uid: string;
  email: string;
  name: string;
  password: string;
  phone: string;
  organizationCode: string;
  employeeNumber: number;
  roleId: string;
  isDataComplete: boolean;
}
