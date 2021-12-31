const express = require("express");
const router = express.Router();
const app = express();

router.get('/landkreise',(request,response) => {
//code to perform particular action.
//To access GET variable use req.query() and req.params() methods.
});

// add router in the Express app.
app.use("/", router)
app.listen(3000,() => {
    console.log("Started on PORT 3000");
    })