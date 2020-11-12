const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');
const e = require("express");

const app = express();

app.use(express.json());
app.use(cors());

function validadeRepositorieId(request, response, next){
  const {id} = request.params;
  if(!isUuid(id)) return response.status(400).json({error:'Invalid Repositorie Id.'})

  return next()
}

app.use("/repositories/:id",validadeRepositorieId);

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  const repositorie = {id:uuid(), title, url, techs, likes:0};

  repositories.push(repositorie);

  return response.json(repositorie); 
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body;
  const repositorieIndex = repositories.findIndex((element)=>element.id===id);
  
  if(repositorieIndex<0) return response.status(400).json({error: 'Repositorie ID not found.'});
  
  //const {likes} = repositories[repositorieIndex];

  repositorie = {id, title, url, techs, likes: repositories[repositorieIndex].likes};

  repositories[repositorieIndex] = repositorie;

  return response.json(repositories[repositorieIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const repositorieIndex = repositories.findIndex((element)=>element.id===id);
  
  if(repositorieIndex<0) return response.status(400).json({error: 'Repositorie ID not found.'});

  repositories.splice(repositorieIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const repositorieIndex = repositories.findIndex((element)=>element.id===id);
  
  if(repositorieIndex<0) return response.status(400).json({error: 'Repositorie ID not found.'});

 // let {title, url, techs, likes} = repositories[repositorieIndex];
 // likes++;
  
  //repositorie = {id, title, url, techs, likes};

  //repositories[repositorieIndex] = repositorie;

  repositories[repositorieIndex].likes++;

  return response.json(repositories[repositorieIndex]);

});

module.exports = app;
