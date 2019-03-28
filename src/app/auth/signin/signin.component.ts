import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  genders = ["Male", "Female"];
  forbiddenUserNames = ["Mai", "Minh"];
  existingUsernames = ["hero", "jimmy"];
  isFormValid = false;
  credientialsForm = new FormGroup({
    username: new FormControl(
      null,
      [Validators.required, this.validateName.bind(this)],
      this.asyncValidateExistingName.bind(this)
    ),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6)
    ])
  });
  signinForm = new FormGroup({
    credentialsForm: this.credientialsForm,
    gender: new FormControl("Male"),
    hobbies: new FormArray([])
  });
  constructor() {}

  ngOnInit() {
    this.signinForm.statusChanges.subscribe(status => {
      console.log(status);
      this.isFormValid = status === "VALID";
    });
  }
  onSubmit() {
    console.log(this.signinForm);
  }
  addHobby() {
    (this.signinForm.get("hobbies") as FormArray).push(new FormControl(null));
  }
  validateName(control: FormControl) {
    return this.forbiddenUserNames.includes(control.value)
      ? { nameIsForbidden: true }
      : null;
  }
  asyncValidateExistingName(
    control: FormControl
  ): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (this.existingUsernames.includes(control.value)) {
          resolve({ usernameExists: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
  }
  get formData() { return <FormArray>this.signinForm.get('hobbies'); }
  getSampleSignInInfo() {
   /*  let hobbiesFormArray = new FormArray([
      new FormControl("Tennis"),
      new FormControl("Reading"),
      new FormControl("Coffee")
    ]); */

    this.signinForm.setValue({
      credentialsForm: {
        username: "jane_doe",
        password: "jane_doe"
      },
      gender: "Female",
      hobbies: [
      ]
    });
    (this.signinForm.get('hobbies') as FormArray).push(new FormControl("Tennis"));
    (this.signinForm.get('hobbies') as FormArray).push(new FormControl("Reading"));
    (this.signinForm.get('hobbies') as FormArray).push(new FormControl("Coffee"));
  }
}
