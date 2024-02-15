

const validation = ({email, password}, errors, setErrors)=>{
    
       let newErrors = {...errors};

    if (!email || !email.trim()) {
        newErrors.email = "El email está vacío";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/.test(email)) {
        newErrors.email = "El usuario tiene que ser un correo válido"; //formato de email@mail.com
    } else if (email.length > 35) {
        newErrors.email = "El email no debe superar los 35 caracteres";
    } else {
        newErrors.email = "";
    }

    if (!(/\d/.test(password))) {
        newErrors.password = "La contraseña debe contener al menos un número";
    } else if (!(password.length >= 6 && password.length <= 10)) {
        newErrors.password = "La contraseña debe tener una longitud entre 6 y 10 caracteres";
    } else {
        newErrors.password = "";
    }

    setErrors(newErrors);
}

export default validation;