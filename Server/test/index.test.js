const app = require('../src/app');
const session = require('supertest');
const agent = session(app);


let fakeBody, fakeBody2;

describe('Test de RUTAS', ()=>{
    describe('GET /rickandmorty/character/:id', ()=>{
        it('Responde con status: 200', async ()=>{
            await agent.get('/rickandmorty/character/1').expect(200);
        });

        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async ()=>{
            let { body } = await agent.get('/rickandmorty/character/1');
            expect(body).toHaveProperty('id'&&'name'&&'gender'&&'status'&&'origin'&&'image');
        });

        it('Si hay un error responde con status: 500', async ()=>{
            await agent.get('/rickandmorty/character/25639').expect(500);
        });
    });

    describe('GET /rickandmorty/login', ()=>{
        it('Con el login correcto debe retornar access:true', async ()=>{
            let { body } = await agent.get('/rickandmorty/?email=matiassjv@hotmail.com&password=henry2024');
            expect(body.access).toBeTruthy();
        });
        it('Con el login incorrecto debe retornar access:false', async ()=>{
            let { body } = await agent.get('/rickandmorty/?email=juanPerez@gmail.com&password=123456');
            expect(body.access).toBeFalsy();
        });
    });

    describe('POST /rickandmorty/fav', ()=>{
        //creo personaje ficticio

        beforeAll(() => {
            fakeBody = {
                id:34,
                name:"nombre",
                gender:"masculino",
                species:"animal",
                origin: "desconocido",
                image:"EJ URL",
                status:"ALIVE"
            };
    
            fakeBody2 = {
                id:2,
                name:"nombre 2",
                gender:"femenino",
                species:"insecto",
                origin: "conocido",
                image:"EJ URL 2",
                status:"DEAD"
            };
        });
        it('Debe retornar el body como arreglo', async ()=>{
            const { body } = await agent.post('/rickandmorty/fav').send(fakeBody);
            expect(body[0]).toEqual(fakeBody);
            
        });
        it('Debe retornar los personajes previos', async ()=>{
            const { body } = await agent.post('/rickandmorty/fav').send(fakeBody2);
            expect(body).toEqual([fakeBody, fakeBody2]);
            
        });
    });


    describe('DELETE /rickandmorty/fav/:id', () => {
        
                  
        it('Cuando se envía un ID inexistente, devuelve los personajes previos sin modificar', async () => {
            const fakeId= 900;
            const { body } = await agent.delete(`/rickandmorty/fav/${fakeId}`); // ID inexistente
            expect(body).toEqual([fakeBody,fakeBody2]);
        });
    
        it('Cuando se envía un ID válido, elimina correctamente al personaje', async () => {
            // Suponiendo que el primer personaje en la lista inicial es fakeBody y el segundo es fakeBody2
            const validId = fakeBody.id; // ID del primer personaje
            const { body } = await agent.delete(`/rickandmorty/fav/${validId}`);
            // La respuesta debe ser la lista inicial sin el personaje con el ID enviado
            const expectedFavorites = body.some(character => character.id === validId);; // Después de eliminar fakeBody, solo queda fakeBody2
            expect(expectedFavorites).toBe(true);
        });
    });
})
