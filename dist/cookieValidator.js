"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieValidator = cookieValidator;
async function cookieValidator(cookies) {
    console.log('Received cookie:', cookies.testCookie);
    try {
        await externallyValidateCookie(cookies.testCookie);
    }
    catch {
        throw new Error('Invalid cookies');
    }
}
async function externallyValidateCookie(cookie) {
    if (!cookie || cookie !== 'valid-cookie') {
        throw new Error('Invalid');
    }
}
