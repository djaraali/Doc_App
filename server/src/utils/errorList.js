exports.errors = {
    UNKNOWN_ERROR: {
        code: 504,
        text: 'Unknown error! Please contact the admin.',
        hints: [],
        info: ''
    },

    NOT_FOUND: {
        code: 404,
        text: 'Not found!',
        hints: [
        ],
        info: ''
    },

    AUTH_FAILED: {
        code: 401,
        text: 'Authentication Failed.',
        hints: [
            'Email or password you entered does not matched or wrong.'
        ],
        info: ''
    },

    USER_IS_NOT_EXIST: {
        code: 401,
        text: 'User is not exist with this email address.',
        hints: [
            'User is not exist with this email adddress'
        ],
        info: ''
    },

    EMAIL_IS_ALREADY_EXIST: {
        code: 409,
        text: 'Email address is already exist. Please try with another one.',
        hints: [
            'Another user is exist with the email address'
        ],
        info: ''
    },

    PASSWORD_HASHING_FAILED: {
        code: 500,
        text: 'Password Hashing Problem',
        hints: [
            'bcrypt password hashing failed.'
        ],
        info: ''
    },

    INVALID_EMAIL_ADDRESS: {
        code: 422,
        text: 'Email Address is not valid',
        hints: [
            'Can not parse email domain as its invalid'
        ],
        info: ''
    },

    PASSWORD_CHECK_FAILED: {
        code: 500,
        text: 'Password Checking Failed.',
        hints: [
            'bcrypt password compare error.'
        ],
        info: ''
    },

    WRONG_PASSWORD: {
        code: 401,
        text: 'The password you entered is incorrect',
        hints: [
            'You typed wrong password'
        ],
        info: ''
    },

    
    INVALID_ACCESS_TOKEN: {
        code: 401,
        text: 'Access token is not valid!',
        hints: [
            'Access token is expired',
            'Access token is invalid',
        ],
        info: ''
    },

    

    REQUEST_NOT_VALID: {
        code: 400,
        text: 'Request is not valid!',
        hints: [
        ],
        info: ''
    },


    ITEM_IS_ALREADY_EXIST: {
        code: 409,
        text: 'The item is already exist.',
        hints: [
            'The item is already exist.'
        ],
        info: ''
    },
}