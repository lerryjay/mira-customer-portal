/**
 * Utility class for validating form data
 *
 * @class Validator
 */
export default class Validator {

    /**
     * Validate an integer
     * 
     * @static
     * @param {string} text - field text to be validated
     * @returns {object} - result
     * @memberof Validator
     */
    static validateInteger(text) {
        if (typeof(text) !== 'string' && typeof(text) !== 'number') {
            return { status: false, message: 'You must enter a string or an integer' };
        }
        let numStr = text;
        if (typeof(text) !== 'string') {
            numStr = text.toString();
        }
        if (numStr.includes('.')) {
            return { status: false, message: 'The number you entered is not an integer' };
        } else {
            const num = Number(text);
            if (Number.isNaN(num)) {
                return { status: false, message: 'You must enter a valid number' };
            } else if ((num !== Math.floor(num))) {
                return { status: false, message: 'The number you entered in not an integer' };
            } else {
                return { status: true, result: num };
            }
        }
    }

    /**
     * Validate a number
     * 
     * @static
     * @param {string} text - field text to be validated
     * @returns {object} - result
     * @memberof Validator
     */
    static validateNumber(text) {
        if (typeof(text) !== 'string' && typeof(text) !== 'number') {
            return { status: false, message: 'You must enter a string or an number' };
        }
        const num = Number(text);
        if (Number.isNaN(num)) {
            return { status: false, message: 'You must enter a valid number' };
        } else {
            return { status: true, result: num };
        }
    }

    /**
     * Validate an email
     * 
     * @static
     * @param {string} text - field text to be validated
     * @returns {object} - result
     * @memberof Validator
     */
    static validateEmail(text) {
        if (typeof(text) !== 'string') {
            return { status: false, message: 'Email must be a string' };
        } else {
            const email = text.trim().split(' ').join('');
            // Email regex gotten from http://www.regexlib.com
            if (!/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(email)) {
                return { status: false, message: 'Your email address must follow the pattern ****@**.**' };
            } else {
                return { status: true, result: email };
            }
        }
    }

    /**
     * Validate a date
     * 
     * @static
     * @param {string} text - field text to be validated
     * @returns {object} - result
     * @memberof Validator
     */
    static validateDate(text) {
        const date = new Date(text);
        if (typeof(text) !== 'string') {
            return { status: false, message: 'The date must be a string' };
        } else if (Number.isNaN(date.getDate())) {
            return { status: false, message: 'The date you entered is not valid, use the format MM/DD/YYYY' };
        } else {
            return { status: true, result: date };
        }
    }

    /**
     * Validate a boolean
     * 
     * @static
     * @param {string} text - field text to be validated
     * @returns {object} - result
     * @memberof Validator
     */
    static validateBoolean(text) {
        let bool = text
        if (typeof(text) === 'string') {
            bool = text.trim();
        }
        if (bool !== 'true' && bool !== 'false' && bool !== '1' && bool !== '0' && bool !== true && bool !== false && bool !== 1 && bool !== 0) {
            return { status: false, message: 'You must enter a valid boolean' };
        } else {
            if (bool === 'true' || bool === '1' || bool === true || bool === 1) {
                bool = true;
            } else if (bool === 'false' || bool === '0' || bool === false || bool === 0) {
                bool = false;
            }
            return { status: true, result: bool };
        }
    }

    /**
     * Validate a string
     * 
     * @static
     * @param {string} text - field text to be validated
     * @param {number} minLength - Minimum length
     * @param {number} maxLength - Maximum length
     * @param {boolean} acceptSpecialChars - Whether or not certain special characters should be accepted
     * @returns {object} - result
     * @memberof Validator
     */
    static validateString(text, minLength = 0, maxLength = 100, acceptSpecialChars = false) {
        if (typeof(text) !== 'string') {
            return { status: false, message: 'You must enter a string' };
        } else {
            const str = text.trim();
            const cleanRegex = /^[a-z ,.'-]+$/i;
            if (str.length < minLength) {
                return { status: false, message: `The minimum number of characters permitted is ${minLength}` };
            } else if (maxLength && str.length > maxLength) {
                return { status: false, message: `The maximum number of characters permitted is ${maxLength}` };
            } else if (!acceptSpecialChars && !cleanRegex.test(str)) {
                return { status: false, message: 'You cannot enter any special characters except ",", ".", "\'", and "-"' };
            } else if (str.includes('<') ||
                str.includes('>') ||
                str.includes('[') ||
                str.includes(']') ||
                str.includes('{') ||
                str.includes('}')) {
                    return { status: false, message: 'You must not include special characters like "<", ">", "[", or "]"'};
                } else {
                    return { status: true, result: str };
                }
        }
    }

    /**
     * Validate a string against a defined set of values
     *
     * @static
     * @param {string} text - field text to be validated
     * @param {array} validArray - List of valid values
     * @returns {object} - result
     * @memberof Validator
     */
    static validateEnum(text, validArray = []) {
        let str = text;
        if (typeof(str) === 'string') {
            str = text.trim().split(' ').join('');
        } 
        if (!Array.isArray(validArray)) {
            return { status: false, message: 'You need to pass in a valid array of values' };
        } else if (!validArray.includes(str)) {
            return { status: false, message: 'The text you entered in not included in the array of valid data sets' };
        } else {
            return { status: true, result: str };
        }
    }

    /**
     * Validate a password
     *
     * @static
     * @param {string} pwd - password to be validated
     * @param {number} [minimumLength=6] - Minimum length of password
     * @param {boolean} [mustContainNum=true] - Whether or not password must have at least 1 number
     * @param {boolean} [mustContainUppercase=true] - Whether or not password must contain uppercase
     * @param {boolean} [mustContainLowercase=true] - Whether or not password must contain lowercase
     * @param {boolean} [mustContainSpecialChars=true] - Whether or not password must contain special characters
     * @returns {object} - result
     * @memberof Validator
     */
    static validatePassword(pwd, minimumLength = 6, mustContainNum = true, mustContainUppercase = true, mustContainLowercase = true, mustContainSpecialChars = true) {
        // Regex gotten from http://buildregex.com
        const regNum = /[0-9]/;
        const regSymbol = /[^a-zA-Z0-9]/;

        if (!pwd) {
            return { status: false, message: 'Password cannot be empty' };
        } else if (typeof(pwd) !== 'string') {
            return { status: false, message: 'Password must be a string' };
        } else if (pwd.length < minimumLength) {
            return { status: false, message: `Password must be more than ${minimumLength} characters` };
        } else if (mustContainNum && !regNum.test(pwd)) {
            return { status: false, message: 'Password must contain at least one (1) number' };
        } else if (mustContainUppercase && (pwd === pwd.toLowerCase())) {
            return { status: false, message: 'Password must contain at least one (1) uppercase letter' };
        } else if (mustContainLowercase && (pwd === pwd.toUpperCase())) {
            return { status: false, message: 'Password must contain at least one (1) lowercase letter' };
        } else if (mustContainSpecialChars && !regSymbol.test(pwd)) {
            return { status: false, message: 'Password must contain at least one (1) symbol' };
        } else {
            return { status: true, result: pwd };
        }
    }

    /**
     * Validate a url
     *
     * @static
     * @param {string} url - url to be validated
     * @returns {object} - result
     * @memberof Validator
     */
    static validateUrl(url) {
        if (typeof(url) !== 'string') {
            return { status: false, message: 'URL must be a string' };
        } else {
            // Regex gotten from https://urlregex.com/
            const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
            if (!urlRegex.test(url)) {
                return { status: false, message: 'Invalid url' };
            } else {
                return { status: true, result: url.trim().split(' ').join('') };
            }
        }
    }

    /**
     * Validate an address
     *
     * @static
     * @param {string} address - address to be validated
     * @returns {object} - result
     * @memberof Validator
     */
    static validateAddress(address) {
        if (typeof(address) !== 'string') {
            return { status: false, message: 'Address must be a string' };
        } else if (address.includes('<') || 
            address.includes('>') || 
            address.includes('[') || 
            address.includes(']') ||
            address.includes('{') ||
            address.includes('}')) {
            return { status: false, message: 'The address you entered is not valid' };
        } else {
            return { status: true, result: address.trim() };
        }
    }

    /**
     * Validate an IP address
     *
     * @static
     * @param {string} ip - IP address to be validated
     * @returns {object} - result
     * @memberof Validator
     */
    static validateIp(ip) {
        // Regex gotten from https://www.regexpal.com/22
        if (typeof(ip) !== 'string') {
            return { status: false, message: 'IP address must be a string' };
        } else {
            const ipAddress = ip.trim().split(' ').join('');
            const ipRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm;
            if (!ipRegex.test(ipAddress)) {
                return { status: false, message: 'The IP address is invalid' };
            } else {
                return { status: true, result: ipAddress}
            }
        }
    }

    /**
     * Validate a phone number
     *
     * @static
     * @param {string} phone - phone number to be validated
     * @returns {object} - result
     * @memberof Validator
     */
    static validatePhone(phone) {
        if (typeof(phone) !== 'string') {
            return { status: false, message: 'Phone number must be a string' };
        } else {
            const phoneNumber = phone.trim().split(' ').join('').split('-').join('').split('(').join('').split(')').join('');
            // Regex gotten from https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
            const regPhone = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}|[a-zA-Z0-9]{4,8}$/im;
            if (!regPhone.test(phoneNumber)) {
                return { status: false, message: 'The phone number is invalid' };
            } else {
                return { status: true, result: phoneNumber };
            }
        }
    }

}
