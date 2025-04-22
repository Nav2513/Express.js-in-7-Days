"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieValidator = cookieValidator;
async function cookieValidator(cookie) {
    console.log('Recieved Cookie:', cookie.testCookie);
    try {
        await externallyValidatorCookie(cookie.testCookie);
    }
    catch {
        throw new Error("Invalid Cookies");
    }
}
async function externallyValidatorCookie(cookie) {
    if (!cookie || cookie !== 'valid-cookie') {
        throw new Error('Invalid');
    }
}
