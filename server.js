// Master file for backend

//------------------------------------ ---------MODULES---------------------------------------------
const express = require("express");
const cors = require("cors");
const { swaggerServe, swaggerSetup } = require('./config/swaggerConfig')

//---------------------------------------------VARIABLES--------------------------------------------
const PORT = process.env.PORT || 8000;

//---------------------------------------------INSTANCE---------------------------------------------
const app = express();



// const allowedOrigins = ["http://localhost:3000"];

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: "GET, POST, PUT, DELETE",
//   allowedHeaders: "Content-Type, Authorization",
// };

// app.use(cors(corsOptions));
app.use(cors());

// middleware

app.use(express.json());

app.use("/api-docs", swaggerServe, swaggerSetup); 

app.use(express.urlencoded({ extended: true }));

//---------------------------------------------MIDDLEWARES------------------------------------------
const rssLinkrouter = require("./routes/rssLinkRouter.js");
const articlerouter = require("./routes/articleRouter.js");
const countryrouter = require("./routes/countryRouter.js");
const newspaperRouter = require("./routes/newspaperRouter.js");

app.use("/api", rssLinkrouter);
app.use("/api/article", articlerouter);
app.use("/api/country", countryrouter);
app.use("/api/newspaper", newspaperRouter);


//---------------------------------------------SERVER------------------------------------------
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

app.get("/", (req, res) =>
  res.json(`Kutniti backend is running on port ${PORT}`)
);
