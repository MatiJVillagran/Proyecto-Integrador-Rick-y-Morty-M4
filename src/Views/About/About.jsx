import style from "./About.module.css"
const About = ()=>{
    
    return (
        <div className={style.container}>
         <h1 className={style.titulo}>Aplicacion Rick & Morty</h1>  
         <div>
         
         <p>
         <h3 className={style.fuente}>MISION: Este proyecto esta dedicado a poner en practica herramientas y conocimientos,
          vistos en el Modulo 2, de la carrera de Full Stack Development, dictada por HENRY</h3></p>
          </div>
         <img className={style.imagenHenry} src="https://blog.soyhenry.com/content/images/2021/02/HEADER-BLOG-NEGRO-01.jpg"/>
         <div>
            <h3 className={style.fuenteSobreMi}>SOBRE MI</h3>
            <p><h3 className={style.fuenteSobreMi}>Soy Matías Javier Villagrán, estudiante en Henry y resido en la provincia de Santa Fe, Argentina. 
            Durante el desarrollo de esta aplicación, me encontré con varios desafíos que me llevaron a evaluar y poner en práctica todo lo aprendido en el módulo.
            Aunque todavia queda mucho por aprender </h3></p>
         </div>
         <img className={style.imagenMe} src="https://i.ibb.co/xgfKHY4/gorickyourself.png"/>
        </div>
    );
};

export default About;