const express = require("express");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const path = require("path");
const os = require("os");

const app = express();

var corsOptions = {
   origin: "*",
   optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Database
const db = require("./model/index.js");
// db.connection.sync();

// Swagger setup
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const env = (process.env.NODE_ENV || "localhost").trim();
const portnumber = process.env.PORT || 3000;

const getSwaggerServers = () => {
  if (env === "production" || env === "sandbox") {
    return [
      {
        url: `https://api-vwa.gov.sr:${portnumber}`,
        description: 'Productie/Sandbox omgeving'
      }
    ];
  }
  return [
    {
      url: `http://localhost:${portnumber}`,
      description: 'Lokale ontwikkelomgeving'
    }
  ];
};

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'volksgezondheid subsysteem (Ministerie van Volksgezondheid - Gezondheidsregister)',
      version: '1.0.0',
      description: 'REST API voor beheer van gezondheidsdossiers, zorgverleners, zorginstellingen en medische gegevens',
      contact: {
        name: 'volksgezondheid Admin',
        email: 'admin@volksgezondheid.egov.com'
      }
    },
    servers: getSwaggerServers()
  },
  apis: [path.join(__dirname, 'routes', '*.js')] // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI endpoint
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Simple test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to volksgezondheid API application - Gezondheidsregister Systeem." });
});

// OpenAPI spec endpoint voor X-Road
app.get('/api/openapi.json', (req, res) => {
  res.json(swaggerSpec);
});

// Import routes
require("./routes/medische_keuringen.route.js")(app);

const hostname = process.env.HOST || "localhost";
const prod_hostname = os.hostname() + ".gov.sr";

// SSL configuratie
const sslKeyPath = process.env.SSL_KEY || '/etc/ssl/volksgezondheid/privkey.pem';
const sslCertPath = process.env.SSL_CERT || '/etc/ssl/volksgezondheid/fullchain.pem';

if (env === "production" || env === "sandbox") {
  // HTTPS server voor productie
  try {
    const sslOptions = {
      key: fs.readFileSync(sslKeyPath),
      cert: fs.readFileSync(sslCertPath)
    };
    
    https.createServer(sslOptions, app).listen(portnumber, () => {
      console.log(`HTTPS Server is running on https://${prod_hostname}:${portnumber}/`);
      console.log(`API Documentation: https://${prod_hostname}:${portnumber}/api/docs`);
    });
  } catch (err) {
    console.error('SSL certificaat niet gevonden, start HTTP server:', err.message);
    app.listen(portnumber, () => {
      console.log(`HTTP Server is running on http://${prod_hostname}:${portnumber}/`);
    });
  }
} else {
  // HTTP server voor development
  app.listen(portnumber, hostname, () => {
    console.log(`Server is running on http://${hostname}:${portnumber}/, For documentation and testing http://${hostname}:${portnumber}/api/docs`);
  });
}

module.exports = app;
