export async function cookieValidator(cookie: {testCookie?: string}): Promise<void> {
    console.log('Recieved Cookie:', cookie.testCookie);
    try{
        await externallyValidatorCookie(cookie.testCookie);
    }catch{
        throw new Error("Invalid Cookies");
    }
}


async function externallyValidatorCookie(cookie?: string): Promise<void> {
    if(!cookie || cookie !== 'valid-cookie') {
        throw new Error('Invalid');
    }
}