import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styleUrls: ['./increaser.component.css'],
})
export class IncreaserComponent implements OnInit {
  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }
  @Input() progress: number = 40;
  @Input() btnClass: string = 'btn-primary';
  @Output() changedValue: EventEmitter<number> = new EventEmitter();

  changeValue(value: number) {
    this.progress = this.progress + value;
    if (this.progress >= 100 && value >= 0) {
      this.progress = 100;
      this.changedValue.emit(100);
    }
    if (this.progress <= 0 && value < 0) {
      this.progress = 0;
      this.changedValue.emit(0);
    }
    this.changedValue.emit(this.progress);
  }

  onChange(newValue: number) {
    if (newValue >= 100) {
      this.progress = 100;
    } else if (newValue <= 0) {
      this.progress = 0;
    } else {
      this.progress = newValue;
    }
    this.changedValue.emit(this.progress);
  }
}
