const express = require('express')
const joyas = require('./data/joyas.js')
const app = express()

const getjoyas = () =>
joyas.map((g) => {
return g
});

const getjoyasv2 = (e) =>
joyas.map((g) => {
return g
});

const filtercategory = (categoria) => {
  return joyas.filter((g) => g.category === categoria);
  };

const filterid = (id) => {
  return joyas.filter((g) => g.id === id);
  };

app.listen(3000, () => console.log('Your app listening on port 3000'))

app.get('/joyas', (req, res) => {
  res.send({
    joyas: getjoyas(),
    })
})

app.get("/v2/joyas", (req, res) => {
res.send({
joyas: getjoyasv2(),
});
});


app.get("/v2/categoria/:categoria", (req, res) => {
const categoria = req.params.categoria;
res.send({
joyas: filtercategory(categoria),
});
});
  
app.get("/v2/joya/:id", (req, res) => {
  const { id } = req.params;
  filterid(id)
  ? res.send({
  joya: filterid(id),
  })
  : res.send({
  error: "404 Not Found",
  message: "No existe una guitarra con ese ID",
});
});

app.get("/v2/joyas", (req, res) => {
  const { values } = req.query;
  if (values == "asc") return res.send(orderValues("asc"));
  if (values == "desc") return res.send(orderValues("desc"));
  if (req.query.page) {
  const { page, limits } = req.query;
  return res.send({
  joyas: getjoyasv2().slice(page * limits - limits, page * limits),
  });
  }
  res.send({
  joyas: joyasv2(),
  });
  });