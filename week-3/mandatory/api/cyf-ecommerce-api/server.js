const express = require("express");
const app = express();

const { Pool } = require("pg");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "Laura@@2009080220",
  port: 5432,
});

app.get("/customers", function (req, res) {
  pool
    .query("SELECT * FROM customers")
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

app.get("/suppliers", function (req, res) {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/products", function (req, res) {
  let findProduct = req.query.name;
  console.log(findProduct);

  pool.query(
    "select product_name ,unit_price,supplier_name,country from products as t1 inner join suppliers as t2 on t1.supplier_id = t2.id where t1.product_name like '%" +
      findProduct +
      "%'",
    (error, result) => {
      res.json(result.rows);
    }
  );
});

app.get("/customers/:customerId", function (req, res) {
  let customerId = req.params.customerId;
  console.log(customerId);

  pool.query(
    "select * from customers where id=" + customerId + "",
    (error, result) => {
      res.json(result.rows);
    }
  );
});

app.post("/customers", function (req, res) {
  const newCustomerName = req.body.name;
  const newCustomerAddress = req.body.address;
  const newCustomerCity = req.body.city;
  const newCustomerCountry = req.body.country;

  const query =
    "INSERT INTO customers (name, address, city,country) VALUES ($1, $2, $3, $4)";

  pool
    .query(query, [
      newCustomerName,
      newCustomerAddress,
      newCustomerCity,
      newCustomerCountry,
    ])
    .then(() => res.send("Customer created!"))
    .catch((e) => console.error(e));
});

app.post("/products", function (req, res) {
  const newProductName = req.body.name;
  const newUnitPrice = req.body.unitPrice;
  const newSupplierId = req.body.supplierId;

  if (!Number.isInteger(newSupplierId) || newSupplierId <= 0) {
    return res
      .status(400)
      .send("The number of supplier id should be a positive integer");
  } else if (!Number.isInteger(newUnitPrice) || newUnitPrice <= 0) {
    return res
      .status(400)
      .send("The number of unit price  should be a positive integer");
  }

  pool
    .query("select * from products where supplier_id=$1", [newSupplierId])
    .then((result) => {
      if (result.rows.length > 0) {
        return res
          .status(400)
          .send("a supplier id with the same integer already exist!");
      } else {
        const query =
          "insert into products (id,product_name,unit_price,supplier_id)values($1,$2,$3,$4)";
        pool.query(query, [newProductName, newUnitPrice, newSupplierId]);
      }
    })

    .then(() => res.send("Customer created!"))
    .catch((e) => console.error(e));
});
/* ////////////////////////////////// */
app.post("/customers/:customerId/orders", function (req, res) {
  
 const customerId=req.params.customerId
 const newOrderDate=req.body.newOrderDate
 const newOrderReference=req.body.newOrderReference

  

  if (!Number.isInteger(customerId) || customerId <= 0) {
    return res
      .status(400)
      .send("The number of customer id should be a positive integer");
  } 



  pool
    .query("select * from orders where customer_id=$1", [customerId])
    .then((result) => {
      if (result.rows.length > 0) {
        const query =
        "insert into orders (order_date,order_reference,customer_id)values($1,$2,$3)";
      pool.query(query, [newOrderDate,newOrderReference, customerId]);
       
      } else {
        return res
        .status(400)
        .send("a customer id not already exist!");
       
      }
    })

    .then(() => res.send("Order created!"))
    .catch((e) => console.error(e));
});






app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
