import { NextFunction, Request, Response } from "express";
import { CookieParser } from "../comman/cookies";
import { response } from "../helper/response";
import jwt from "jsonwebtoken";


class Is_Verify {

    public async verify_user (req:Request,res:Response,next:NextFunction):Promise<any>{

        let cookie_decode = CookieParser.UserCookie(req)
        console.log('Cookie = = = = = = = = = = = = = = = >',cookie_decode);
      
        
        if(!cookie_decode){
            return response.setResponse(401,{errorMessage:'Unauthorized User.'},res,req)
        }

        let token_verify:any = jwt.verify(cookie_decode,process.env.JWT_KEY as string)

        if(token_verify){ 
            next()   
        }
        else{
            console.log("Token Mis Match = = = = = = = = = =>",token_verify);
            return response.setResponse(401,{errorMessage:'Unauthorized User.'},res,req)
        }
    }
}

export const IS_Verify = new Is_Verify()