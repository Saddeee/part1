require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Person = require("./modules/person");
const app = express();

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});
app.get("/info", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      let num = 0;
      const date = new Date();
      num = persons.length;
      response.send(`<p> Phonebook has info for ${num}</p>
      <p>${date}</p> `);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id",(request,response,next)=>{
  const body = request.body
  const person={
    name:body.name,
    number:body.number
  }
  Person.findByIdAndUpdate(request.params.id,person,{new:true, runValidators:true, context:"query"}).then(
    updatedPerson=>{
      response.json(updatedNote)
    }
  ).catch(error=>next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

app.post("/api/persons", (request, response,next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'Name or number is missing' });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save()
    .then((savedPerson) => {
      response.json(savedPerson);
    }).catch((error) => {next(error)
    });
});


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }else if(error.name === "ValidationError"){
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);
const PORT = 3001;
app.listen(PORT);
console.log(`we are listening at ${PORT}`);
