import { useState } from "react";
import style from "./Form.module.css"
import validation from "./validation";

const Form= ({login})=>{

    const [userData, setUserData]= useState ({email:"",password:""});
    const [errors, setErrors]= useState ({email:"",password:""}); 

    const handleChange= (event)=>{
        const property= event.target.name;
        const value= event.target.value;

        setUserData ({...userData, [property]:value});
        validation({...userData, [property]:value}, errors, setErrors);
    }

    const submitHandler= (event)=>{
        event.preventDefault();
        login(userData);

    }

    return(
        <form className={style.container} onSubmit={submitHandler}>
           <img className={style.img} src="https://static.wikia.nocookie.net/villains/images/e/ed/CROMULON.png" alt=""/> 
           <div className={style.inputContainer}>
            <label className={style.label} htmlFor="email">Email:</label>
            <input className={style.casilla} type="email" name="email" value={userData.email} onChange={handleChange}/>
            <span className={style.errorMail}>{errors.email}</span>
           </div>
           <div className={style.inputContainer}> 
            <label className={style.label} htmlFor="password">Password:</label>
            <input className={style.casilla} type="password" name="password" value={userData.password} onChange={handleChange}/>
            <span className={style.errorPassword}>{errors.password}</span>
            </div>  
            <button className={style.Btn} type="submit">Submit</button>
        </form>

    )
}

export default Form;