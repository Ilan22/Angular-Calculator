import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  text: string = '0';
  actualNumber: number = 0;
  operationNumber: number = 0;
  operating: boolean = false;
  operator!: string;
  operated: boolean = false;

  writeCaracter(caracter: string) {
    if (this.operated) {
      this.reset();
      this.operated = false;
    }
    if (this.text.length < 13) {
      if (caracter != '.')
        if (this.text == '0') this.text = caracter;
        else this.text += caracter;
      else if (!this.text.includes('.')) this.text += caracter;
      this.operating
        ? (this.operationNumber = Number(this.text))
        : (this.actualNumber = Number(this.text));
    }
  }

  reset() {
    this.text = '0';
    this.actualNumber = 0;
    this.operationNumber = 0;
    this.operator = '';
    this.operating = false;
  }

  operation(operator: string) {
    this.text = '0';
    this.operator = operator;
    this.operating = true;
    this.operated = false;
  }

  equal() {
    switch (this.operator) {
      case '+':
        this.actualNumber += this.operationNumber;
        break;
      case '-':
        this.actualNumber -= this.operationNumber;
        break;
      case '*':
        this.actualNumber *= this.operationNumber;
        break;
      case '/':
        this.actualNumber /= this.operationNumber;
        break;
    }
    if (this.actualNumber.toString().includes('.')) {
      this.text = this.actualNumber.toString().substring(0, 13);
    } else if (this.actualNumber.toString().length > 13) {
      this.text =
        this.actualNumber.toString().substring(0, 1) +
        'e' +
        this.actualNumber
          .toString()
          .substring(1, this.actualNumber.toString().length).length;
    } else this.text = this.actualNumber.toString();
    this.operating = false;
    this.operated = true;
  }
}
