import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent implements OnInit {
  @Input() text?: string;
  @Output() onClick = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  click() {
    this.onClick.emit(this.text);
  }
}
