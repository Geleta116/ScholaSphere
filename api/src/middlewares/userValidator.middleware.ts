import { Request, Response } from "express"

const validator = require("../utils")

const signUpValidation = async (request: Request, response: Response, next: any) => {
    const validationRule = {
        "name": "required|string|min:3", 
        "email": "required|email", 
        "password":"required|min:6",
        "phoneNumber":"required|max:10|min:10"
    }
    await validator(request.body, validationRule, {}, (err, status) =>{
        if (!status){
            response.status(412)
            .send({
                success: false,
                    message: 'Validation failed',
                    data: err
            })
        
        } else {
            next();
        }
    }).catch(err => console.log(err))
}

const loginValidation = async (request: Request, response: Response, next: any) => {
    const validateRule = {
        "email": "required|email", 
        "password":"required|min:6",
    }

    await validator(request.body, validateRule, {}, (err, status) =>{
        if (!status){
            response.status(412)
            .send({
                success: false,
                    message: 'Validation failed',
                    data: err
            })
        
        } else {
            next();
        }
    }).catch(err => console.log(err))
}

module.exports = {
    signUpValidation, 
    loginValidation
}

