const { constants } = require("../constants");

const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.NOT_FOUND:
            res.json({title:"Not Found",message:err.message,stackTrace:err.stack})
            break;
        case constants.FORBIDDEN:
            res.json({title:"FORBIDDEN",message:err.message,stackTrace:err.stack})
            break;
    case constants.UNAUTHORIZED:
        res.json({title:"Unauthorized",message:err.message,stackTrace:err.stack})
        break;
    case constants.BAD_REQUEST:
        res.json({title:"BAD_REQUEST",message:err.message,stackTrace:err.stack})
        break;
        case constants.INTERNAL_SERVER_ERROR:
        res.json({title:"INTERNAL_SERVER_ERROR",message:err.message,stackTrace:err.stack})
        default:
            console.log(err);
            break;
    }

}

module.exports=errorHandler