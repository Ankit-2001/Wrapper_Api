import express from "express";
import customerRoutes from "./routes/customer.routes.js"


const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/customApi", customerRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
