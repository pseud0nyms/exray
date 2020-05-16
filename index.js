const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" },
];

/*
app.get("/", (req,res) => {
    res.send("welcome to node.js")
});

app.get("/api/post/:year/:month", (req,res) => {
    res.send(req.params.id); //     /api/courses/id
    res.send(req.params);   //      /api/post/:year/:month
    res.send(req.query)    //       /api/post/:year/:month?sortBy=name
});
*/

app.get("/api/courses", (req,res) => {
    // res.send([1,2,3]);
    res.send(courses);
});

app.get("/api/courses/:id", (req,res) => {
   const course =  courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with the given ID was not found");
    res.send(course);
});

app.post("/api/courses", (req,res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(courses);
});

app.put("/api/courses/:id", (req,res) => {
    const course =  courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with the given ID was not found");

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);

    course.name = req.body.name;
    res.send(courses);

});

app.delete("/api/courses/:id", (req,res) => {
    const course =  courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with the given ID was not found");

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(courses);
})

// PORT
const port = process.env.PORT || 3000 
app.listen(port, () => {
    console.log(`listen on port ${port}..`);
});

// Validation required name and minimum 3 char.
function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return result = Joi.validate(course, schema);
}