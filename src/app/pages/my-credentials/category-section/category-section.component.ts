import { Component, Input, OnInit } from '@angular/core';
import { category } from '../../../models/credential-interfaces';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-category-section',
  imports: [],
  templateUrl: './category-section.component.html',
  styleUrl: './category-section.component.css'
})
export class CategorySectionComponent implements OnInit {

  @Input() treeNode: TreeNode[] = [];

  constructor(){}

  ngOnInit(): void {
    console.log('treeNode', this.treeNode)
  }
  

}
