import { Component, OnInit } from '@angular/core';
import { ConfigModel } from '../model/config.model';
@Component({
  selector: 'app-default',
  templateUrl: './default.page.html',
  styleUrls: ['./default.page.scss'],
})
export class DefaultPage {
  constructor(){
    
  }
  ngOnInit() {
    console.log('default by1','000');
  }
  test(){
    ConfigModel.test = '888';
  }
}
