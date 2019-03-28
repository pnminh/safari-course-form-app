import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  @ViewChild("signupForm") signupForm: NgForm;
  questions: { key: string; value: string }[] = [
    { key: "pet", value: "What is your first pet" },
    { key: "teacher", value: "What is your first teacher" }
  ];
  genders: string[] = ["Male", "Female"];
  defaultQuestionOption = this.questions[0].key;
  questionAnswer: string;
  isSubmitted = false;
  user: {
    name: string;
    username: string;
    password?: string;
    email: string;
    question: string;
    answer: string;
    gender: string;
  };
  constructor() {}

  ngOnInit() {
    console.log(this.defaultQuestionOption);
  }
  onSubmit() {
    console.log(this.signupForm);
    this.isSubmitted = true;
    this.user = {
      username: this.signupForm.value.username,
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      question: this.signupForm.value.questionAnswer.secretQuestion,
      answer:this.signupForm.value.questionAnswer.secretAnswer,
      gender:this.signupForm.value.gender
    };
    this.signupForm.reset();
    console.log(this.user);
  }
  setSuggestedUsername() {
    this.signupForm.form.patchValue({
      name: "hero87"
    });


  }
}
