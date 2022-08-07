class ErrorHandler extends Error{
    constructor(errorMessage,errorStatus){
        super(errorMessage);
        this.status = errorStatus;

        Error.captureStackTrace(this,this.constructor);
    }
};

module.exports = ErrorHandler;