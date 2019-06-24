// Use this debug tool to bind each action and the error
export default class ActionStack {

    constructor() {
        this.actionsSoFar = [];
    }

    async executeAction(actionDescription, action) {

        try{
            this.actionsSoFar.push(actionDescription);
            return await action();
        } catch(e) {
            this.actionsSoFar.pop();
            let errorMessage = `Failed during action "${actionDescription}", due to error: ${e} \ n`;
            errorMessage += 'Actions leading up to failuer:\n';
            for(let i = this.actionsSoFar.length >= 3 ? this.actionsSoFar.length - 3 : 0; i < this.actionsSoFar.length; i++) {
                errorMessage += '"' + this.actionsSoFar[i] + '"\n';
            }
            throw new Error(errorMessage);
        }
    }
}

// Usage Example 
// page.click('.up-ds-modal__footer-buttons > .up-ds-button--primary-base')
// await as.executeAction('Click the submit button', () => page.click('.up-ds-modal__footer-buttons > .up-ds-button--primary-base'));