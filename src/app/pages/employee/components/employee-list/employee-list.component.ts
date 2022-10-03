import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [
    {
      uid: '16515-4654',
      name: 'Peter Nagy',
      department: 'Dvelopment',
      description: 'Lorem ipsum dolor sit amet.',
      imageUrl: 'https://ionicframework.com/docs/demos/api/list/avatar-rey.png',
    },
    {
      uid: '16555-4654',
      name: 'Ahemd Hassan',
      department: 'Human Resources',
      description: 'Lorem ipsum dolor sit amet.',
      imageUrl:
        'https://ionicframework.com/docs/demos/api/list/avatar-luke.png',
    },
    {
      uid: '16515-4654',
      name: 'Mohamed Mubarak',
      department: 'Constraction & Decoration',
      description: 'Lorem ipsum sit amet consectetur.',
      imageUrl: 'https://ionicframework.com/docs/demos/api/list/avatar-poe.png',
    },
    {
      uid: '16515-4654',
      name: 'Mohamed Attala',
      department: 'Salses',
      description: 'Lorem ipsum dolor sit amet consectetur.',
      imageUrl: 'https://ionicframework.com/docs/demos/api/list/avatar-rey.png',
    },
    {
      uid: '16515-4654',
      name: 'Peter Nagy',
      department: 'Dvelopment',
      description: 'Lorem ipsum dolor sit amet.',
      imageUrl: 'https://ionicframework.com/docs/demos/api/list/avatar-rey.png',
    },
    {
      uid: '16555-4654',
      name: 'Ahemd Hassan',
      department: 'Human Resources',
      description: 'Lorem ipsum dolor sit amet.',
      imageUrl:
        'https://ionicframework.com/docs/demos/api/list/avatar-luke.png',
    },
    {
      uid: '16515-4654',
      name: 'Mohamed Mubarak',
      department: 'Constraction & Decoration',
      description: 'Lorem ipsum sit amet consectetur.',
      imageUrl: 'https://ionicframework.com/docs/demos/api/list/avatar-poe.png',
    },
    {
      uid: '16515-4654',
      name: 'Mohamed Attala',
      department: 'Salses',
      description: 'Lorem ipsum dolor sit amet consectetur.',
      imageUrl: 'https://ionicframework.com/docs/demos/api/list/avatar-rey.png',
    },
    {
      uid: '16515-4654',
      name: 'Peter Nagy',
      department: 'Dvelopment',
      description: 'Lorem ipsum dolor sit amet.',
      imageUrl: 'https://ionicframework.com/docs/demos/api/list/avatar-rey.png',
    },
    {
      uid: '16555-4654',
      name: 'Ahemd Hassan',
      department: 'Human Resources',
      description: 'Lorem ipsum dolor sit amet.',
      imageUrl:
        'https://ionicframework.com/docs/demos/api/list/avatar-luke.png',
    },
    {
      uid: '16515-4654',
      name: 'Mohamed Mubarak',
      department: 'Constraction & Decoration',
      description: 'Lorem ipsum sit amet consectetur.',
      imageUrl: 'https://ionicframework.com/docs/demos/api/list/avatar-poe.png',
    },
    {
      uid: '16515-4654',
      name: 'Mohamed Attala',
      department: 'Salses',
      description: 'Lorem ipsum dolor sit amet consectetur.',
      imageUrl: 'https://ionicframework.com/docs/demos/api/list/avatar-rey.png',
    },
    {
      uid: '16515-4654',
      name: 'Peter Nagy',
      department: 'Dvelopment',
      description: 'Lorem ipsum dolor sit amet.',
      imageUrl: 'https://ionicframework.com/docs/demos/api/list/avatar-rey.png',
    },
    {
      uid: '16555-4654',
      name: 'Ahemd Hassan',
      department: 'Human Resources',
      description: 'Lorem ipsum dolor sit amet.',
      imageUrl:
        'https://ionicframework.com/docs/demos/api/list/avatar-luke.png',
    },
    {
      uid: '16515-4654',
      name: 'Mohamed Mubarak',
      department: 'Constraction & Decoration',
      description: 'Lorem ipsum sit amet consectetur.',
      imageUrl: 'https://ionicframework.com/docs/demos/api/list/avatar-poe.png',
    },
    {
      uid: '16515-4654',
      name: 'Mohamed Attala',
      department: 'Salses',
      description: 'Lorem ipsum dolor sit amet consectetur.',
      imageUrl: 'https://ionicframework.com/docs/demos/api/list/avatar-rey.png',
    },
  ];
  constructor() {}

  ngOnInit() {}
}
