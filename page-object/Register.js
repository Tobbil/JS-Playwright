export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.getByPlaceholder("e-mail");
    this.passwordField = page.getByPlaceholder("password");
    this.registerButton = page.getByRole("button", { name: "register" });
  }

  async signUpAsNewUser(email, password) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.registerButton.click();
  }
}
