import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  private generate  : boolean = false;
  private error    : string  = '';
  private success  : string  = '';
  private numOfQuestion : number = 5;

  private altAdditionWords       = ['+','Plus','Add'];
  private altSubtractionWords    = ['-','Subtract','Minus','take away'];
  private altMultiplicationWords = ['x','Multiply','times'];
  private altDivisionWords       = ['÷','Divide','Divided by'];

  public MaxNum: number;
  public MinNum: number;
  public operator: string = '';
  public questions: Question[] = [];

  randomNumber = () : number => {
    return Math.floor(Math.random()*(this.MaxNum - this.MinNum))+1;
  }
  randomAddOperator = () : string => {
    return this.altAdditionWords[Math.floor(Math.random()*this.altAdditionWords.length)];
  }

  randomSubtractOperator = () : string => {
    return this.altSubtractionWords[Math.floor(Math.random()*this.altSubtractionWords.length)];
  }

  randomMultiplicationOperator = () : string => {
    return this.altMultiplicationWords[Math.floor(Math.random()*this.altMultiplicationWords.length)];
  }

  randomDivisionOperator = () : string => {
    return this.altDivisionWords[Math.floor(Math.random()*this.altDivisionWords.length)];
  }

  createQuiz(){
    if(this.questions.length > 0){
      this.questions = [];
    }
    if(this.MinNum >= this.MaxNum ){
      this.error = 'Maximum Number should be greater than Minimum Number';
    }
    else {
      this.generate = true; this.error = ''; this.success = '';
      for(let i = 1; i <= this.numOfQuestion; i++) {
        let q = new Question();
        if(this.operator ==='Addition'){
          q.create(i, this.randomNumber(),this.randomAddOperator(), this.randomNumber(),null);
          q.answer=(q.num1+q.num2);
          this.insertQuestion(q);
        }

        if(this.operator ==='Subtraction'){
          q.create(i, this.randomNumber(),this.randomSubtractOperator(), this.randomNumber(),null);
          while(q.num1 < q.num2){
            q.num1=this.randomNumber();q.num2=this.randomNumber();
          }
          q.answer=(q.num1-q.num2);
          this.insertQuestion(q);
        }

        if(this.operator ==='Multiplication'){
          q.create(i, this.randomNumber(),this.randomMultiplicationOperator(), this.randomNumber(),null);
          q.answer=(q.num1*q.num2);
          this.insertQuestion(q);
        }

        if(this.operator ==='Division'){
          q.create(i, this.randomNumber(),this.randomDivisionOperator(), this.randomNumber(),null);
          while(q.num1 % q.num2 !==0){
            q.num1=this.randomNumber();
            q.num2=this.randomNumber();
          }
          q.answer=(q.num1/q.num2);
          this.insertQuestion(q);
        }

      }
    }
  }

  insertQuestion(q) {
    this.questions.push(q);
  }
}

class Question {

  public id       : number = 0;
  public num1     : number = 0;
  public operator : string = '';
  public num2     : number = 0;
  public answer   : number = 0;

  create = (id       : number,
            num1     : number,
            operator : string,
            num2     : number,
            answer   : number
  ) => {
    this.id       = id;
    this.num1     = num1;
    this.operator = operator;
    this.num2     = num2;
    this.answer   = answer;
  }
}
