// Not Found Error Handler 


const notFound=(req,res,next)=>{
    const error=new Error(`Route Not Found ${req.originalUrl}`)
    res.status(404)
    next(error)
}

// Error Handler 

const handleError=(err,req,res,next)=>{
    const statuscode=res.statusCode?res.statusCode:500;
    res.status(statuscode);
    res.json({
        sucess:false,
        message:err?.message,
    })
}

module.exports={
    notFound,
    handleError
}