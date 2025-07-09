import dotenv from 'dotenv'

dotenv.config()

class cookieParser
{   
    UserCookie (request:any)
    {
        const Data: { [key: string]: string } = {};
        const rc = request.headers.cookie;

        if(rc!==undefined && rc !=="")
        {
            rc && rc.split(';').forEach(function (cookie :string) 
            {
                const parts = cookie.split('=');
                Data[parts.shift()?.trim() as string] = decodeURI(parts.join('='));
            })

            if(Data[process.env.COOKIE_USER as string] !== undefined && Data[process.env.COOKIE_USER as string] !=="")
            {
                return Data[process.env.COOKIE_USER as string];
                
            }
            else
            {
                return null
            }
        }
        else
        {
            return null
        }
        
        
    }

    Box_Cricket (request:any)
    {
        const Data: { [key: string]: string } = {};
        const rc = request.headers.cookie;

        if(rc!==undefined && rc !=="")
        {
            rc && rc.split(';').forEach(function (cookie :string) 
            {
                const parts = cookie.split('=');
                Data[parts.shift()?.trim() as string] = decodeURI(parts.join('='));
            })

            if(Data[process.env.BOX as string] !== undefined && Data[process.env.BOX as string] !=="")
            {
                return Data[process.env.BOX as string];
                
            }
            else
            {
                return null
            }
        }
        else
        {
            return null
        }
        
        
    }

}

export const CookieParser = new cookieParser()
// parseDoctorCookies (request) {
//     var list = {},
//     rc = request.headers.cookie;
//     if(rc !== undefined && rc !== ""){
//         rc && rc.split(';').forEach(function( cookie ) {
//             var parts = cookie.split('=');
//             list[parts.shift().trim()] = decodeURI(parts.join('='));
//         });
//         if(list[process.env.DOCTOR_AUTH_COOKIE] !== undefined && list[process.env.DOCTOR_AUTH_COOKIE] !== "")
//             return list[process.env.DOCTOR_AUTH_COOKIE];
//         else
//             return null
//     }else{
//         return null
//     }
//}
