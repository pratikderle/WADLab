const dbConnect = require("./mongodb");
const express = require("express");
const app = express();

// Middleware to parse JSON
app.use(express.json());

// GET data
app.get("/getData", async (req, resp) => {
    let result = await dbConnect();
    result = await result.find().toArray();
    resp.send(result);
});

// POST (insert) data
app.post("/insertData", async (req, resp) => {
    let result = await dbConnect();
    console.log(req.body);
    result = await result.insertOne(req.body);
    resp.send("Data inserted Successfully");
});

// PUT (update) data by name
app.put("/updateData/:name", async (req, resp) => {
    let result = await dbConnect();
    result = await result.updateOne(
        { name: req.params.name },
        { $set: req.body }
    );
    resp.send("Data updated successfully");
});

// DELETE data by name
app.delete("/deleteData/:name", async (req, resp) => {
    let result = await dbConnect();
    result = await result.deleteOne({ name: req.params.name });
    resp.send("Data Deleted Successfully");
});

// Start server
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
