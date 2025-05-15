import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, OnChanges {

  @Input() userList: any;

  constructor(){}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['userList'] && changes['userList']){
      this.userList = changes['userList'].currentValue;
    }
  }

  ngOnInit(): void {
    console.log('User list:', this.userList)
  }

}
