import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'list-item',
  styleUrls: ['list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'list-item.component.html'
})

export class ListItemComponent implements OnInit {

  @Input()
  item: any;

  constructor() { }

  getRoute(item: any) {
    return [
      `../articles`,
      item.id
    ]
  }

  ngOnInit() { }
}