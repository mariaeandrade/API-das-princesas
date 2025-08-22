import express from "express";
import princesas  from "./src/data/princesas.js";

const serverPort = 3000;
const app = express();



//Rota principal

app.get('/', (req, res) => {
    res.send('Bem-vindos(as) ao reino mágico das Princesas da Disney')
});

app.get('/princesas', (req, res) => {
    res.json(princesas);
});

app.get("/princesa/:id", (req, res) => {

    let id = parseInt(req.params.id);

    const princesa = princesas.find(p => p.id === id);

    if(princesa) {
        res.status(200).json(princesa);
    } else {
        res.status(404).json({
            erro: `Nenhuma princesa encontrada com o id ${id}`
        })
    }
})

app.get('/princesa/nome/:nome', (req, res) => {
    let nome = req.params.nome.toLowerCase();

    const princesaChamada = princesas.filter(p => p.nome.toLowerCase().
    includes(nome)
);
if (princesaChamada.length > 0) {
    res.status(200).json(princesaChamada); 
} else {
    res.status(404).json({
        erro:"Nenhuma princesa encontrada com esse nome"
    });
} 
})

app.get('/princesa/reino/:reino', (req, res) => {
     
    let reino = req.params.reino;

    const princesaDoReino = princesas.filter(p => p.reino.toLowerCase() === reino.toLowerCase());

    if (princesaDoReino.length > 0) {
        res.status(200).json(princesaDoReino);
    } else {
        res.status(404).json({
            erro: "Nenhuma princesa desse reino encontrada."
        })
    }
});

app.get("/princesas/ativa/sim", (req, res) => {
    const resultado = princesas.filter((p) => p.ativa);

    if(resultado) {
        res.status(200).json(resultado);
    } else {
        res.status(404).json({
            erro: " Nenhuma princesa morta encontrada."
        });
    }
})
app.listen(serverPort, () => {
    console.log(`Servidor funcionando em ${serverPort}`)
});

