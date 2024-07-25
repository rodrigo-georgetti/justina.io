const { configDotenv } = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDb = require("./config/db.js");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./utils/swagger.js");
const routes = require("./routes/index.js");

configDotenv();

// Inicio de la aplicación
console.log("Starting app");

// Estado de la conexion a MySql
connectDb();
console.log("Connecting to MySql");

const PORT = process.env.PORT || 3000;
const app = express();
// const rooturl = 'api/v1'

/// Configuración de CORS
console.log("Configuring CORS");
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Configuracion de Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/", routes);

// Middleware para manejar JSON inválido
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("Invalid JSON received");
    resFail(res, 400, "Invalid JSON received");
  } else {
    next(err);
  }
});

//Middleware para capturar todos los errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  resFail(res, 500, "Internal server error");
  next();
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Configuración de servidor
console.info("Starting server");

app.listen(PORT, () => {
  console.log("App running on http://localhost:" + PORT);
});

module.exports = { app };
