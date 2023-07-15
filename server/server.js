const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");

app.use(express.json());
app.use(cors());

mercadopago.configure({
  access_token:
    "TEST-5498276219457300-071510-280348ab9136d3df0f1218bc11078708-190228080",
});

app.get("/", function (req, res) {
  res.send("el servidor de mercado pago funciona! :)");
});

app.post("/create_preference", (req, res) => {
  let preference = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price), //precio desde el front
        quantity: Number(req.body.quantity), //cantidad desde el front
      },
    ],
    back_urls: {
      //url que vuelve mp una vez finalizada la compra
      success: "http://localhost:5173", //si es exitosa
      failure: "http://localhost:5173", //si falla
      pending: "",
    },
    auto_return: "approved", //autorretorno y vuelve a la pagina
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(8080, () => {
  console.log("the server is now running on port 8080");
});
