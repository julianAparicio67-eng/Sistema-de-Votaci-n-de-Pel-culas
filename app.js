const express = require('express');

const app = express();

const PORT = 3000;

app.use(express.json());

let movies = [
    { 
        "id": 1, 
        "title": "Inception", 
        "description": "Una película de ciencia ficción dirigida por Christopher Nolan", 
        "votes": 0 
    },
    { 
        "id": 2, 
        "title": "Titanic", 
        "description": "Historia romántica dirigida por James Cameron", 
        "votes": 0 
    },
    { 
        "id": 3, 
        "title": "The Matrix", 
        "description": "Película de acción y ciencia ficción dirigida por los hermanos Wachowski", 
        "votes": 0 
    }
];


// Ruta principal o raíz
app.get('/', (req, res) => {
    res.status(200).json({ message: "¡API de películas funcionando correctamente! Usa /movies para ver el catálogo." });
});

//ruta de peliculas GET
app.get('/movies',(req, res) =>{
    res.status(200).json({message: "estas son las peluculas" , movies});
    }
)
    
app.post('/vote/:id', (req, res) => {
   const movieId = parseInt(req.params.id);
   const movie = movies.find(m => m.id === movieId);

    //Valida si la película existe (Error 404)
    if (movie) {
        movie.votes ++
        return res.status(200).json({ message: "Voto registrado correctamente." })
    }else{
        return res.status(404).json({ message: 'Película no encontrada' });
}});

app.get('/movies/:id', (req, res) =>{
   const movieId = parseInt(req.params.id);
   const movie = movies.find(m => m.id === movieId);

if (movie) {
        return res.status(200).json(movie);
    }else{
        return res.status(404).json({ message: 'Película no encontrada' });
}});

app.get('/result', (req, res) =>{
   const pro = [... movies].sort((a, b) => b.votes - a.votes)
   return res.status(200).json(pro)
});



app.post('/movies', (req, res) => {
    const { title, description } = req.body;

    // Validación si falta algún dato
    if (!title || !description) {
        return res.status(400).json({ message: "El título y la descripción son obligatorios." });
    }

    // Crear ID único
    const newId = movies.length + 1;

    const newMovie = {
        id: newId,
        title,
        description,
        votes: 0
    };

    // Agregar al arreglo
    movies.push(newMovie);

    // Responder al cliente
    return res.status(201).json({
        message: "Película agregada correctamente.",
        movie: newMovie
    });
});

app.put('/movies/:id', (req, res) =>{
    const ola2 = parseInt(req.params.id)
    const ola = movies.find(m => m.id === ola);

    if (!movie) {
      return res.status(404).json({ message: "Película no encontrada." });
    } 
    const { title, description } = req.body;

    // 3. Actualizar solo si el usuario envió el dato
    if (title) movie.title = title;
    if (description) movie.description = description;

    // 4. Responder con éxito
    return res.status(200).json({
        message: "Película actualizada correctamente.",
        movie
    });
});


app.delete('/movies/:id', (req, res) =>{
 const movieId = parseInt(req.params.id);
    
    // 1. Buscamos el índice (la posición) de la película en el arreglo
    const movieIndex = movies.findIndex(m => m.id === movieId);

    // 2. Si no existe (findIndex devuelve -1)
    if (movieIndex === -1) {
        return res.status(404).json({ message: "Película no encontrada." });
    }

    // 3. VALIDACIÓN: Si la película tiene votos (votes > 0)
    if (movies[movieIndex].votes > 0) {
        return res.status(400).json({ 
            message: "No se puede eliminar la película porque ya tiene votos registrados." 
        });
    }

    // 4. Si pasó la validación, la eliminamos del arreglo con .splice()
    movies.splice(movieIndex, 1);

    // 5. Respondemos con éxito
    return res.status(200).json({ message: "Película eliminada correctamente." });
});



app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});






