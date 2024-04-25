function success(message,data) {
return{
    message,
    data,
    type:"success"
};
}
function error(message,data=null,errors=[]) {
return{
    data,
    errors,
    message,
    type: "error"
}
}
function response(message="success",data) {
return{
    data,
    type:"success",
    message
}
}

module.exports={
    success,
    error,
    response
}
