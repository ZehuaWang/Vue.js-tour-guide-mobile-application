// Use this debug tool to bind each action and the error
class ActionStack {
  
    constructor() {
    this.actionsSoFar = [];
  }
  
  executeAction(actionDescription, action) {
    try {
       this.actionsSoFar.push(actionDescription);
       action();
    } catch (e) {
      this.actionsSoFar.pop();
      let errorMessage = `Failed during action "${actionDescription}", due to error: ${e}\n`;
      errorMessage += 'Actions leading up to failure:\n';
      for (let i = this.actionsSoFar.length >= 3 ? this.actionsSoFar.length - 3 : 0;
           i < this.actionsSoFar.length; i++) {
        errorMessage += '"' + this.actionsSoFar[i] + '"\n';
      }
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  }}

module.exports = ActionStack;

// Usage Example 
// page.click('.up-ds-modal__footer-buttons > .up-ds-button--primary-base')
// await as.executeAction('Click the submit button', () => page.click('.up-ds-modal__footer-buttons > .up-ds-button--primary-base'));