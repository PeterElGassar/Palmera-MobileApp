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
    isDataComplete,
    roleId
  ) {
    uid !== undefined ? (this.uid = uid) : (this.uid = ''),
      email !== undefined ? (this.email = email) : (this.email = ''),
      name !== undefined ? (this.name = name) : (this.name = ''),
      password !== undefined ? (this.password = email) : (this.password = ''),
      phone !== undefined ? (this.phone = email) : (this.phone = ''),
      organizationCode !== undefined
        ? (this.organizationCode = email)
        : (this.organizationCode = ''),
      employeeNumber !== undefined
        ? (this.employeeNumber = employeeNumber)
        : (this.employeeNumber = 0),
      isDataComplete !== undefined
        ? (this.isDataComplete = isDataComplete)
        : (this.isDataComplete = false),
      roleId !== undefined ? (this.roleId = roleId) : (this.roleId = '');
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

export class UserInqury {
  id?: number;
  employeeId?: number;
  employeeNO?: string;
  employeeNameSl?: string;
  employeeNameFl?: string;
  isActive?: boolean;
  isCivilId?: boolean;
  isAuthorizeLogs?: boolean;
  expireDate?: Date;
  isEndOfContract?: boolean;
  username?: string;
  password?: string;
  civilId?: string;
  userNameTypeId?: number;
  userNameTypeFl?: string;
  userNameTypeSl?: string;
}
