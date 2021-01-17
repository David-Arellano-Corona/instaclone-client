function isEmpty(value, name){
    name= name.replace(name[0],name[0].toUpperCase());
    return value ? '' : `${name} is required`

}

function isEmail(email, name){
    name= name.replace(name[0],name[0].toUpperCase());
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
    {
        return ''
    }
    return `${name} field is not a valid email`
}

module.exports={
    isEmpty,
    isEmail
}