//import jwt from 'jsonwebtoken';
function TestGuard(to, from, next){
    
    let token= localStorage.getItem('session');
    
    if(!token) return next.redirect("/")
    if(token && to.location.pathname === "/") return next.redirect('/users');
    //let user_session= jwt.verify(localStorage.getItem('session'),"secretKey")
    if(to.meta.role==="UNKNOW") return next.redirect("/");
    if(to.meta.role==='ADMIN') return next();
    return  next.redirect('/');
}
export default TestGuard;