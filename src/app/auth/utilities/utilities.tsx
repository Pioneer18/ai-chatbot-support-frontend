const AuthUtils = {
    validateEmail:  (emailValue: string): void => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            throw new Error('Invalid email format');
        }
        return;
    }
}

export default AuthUtils;
