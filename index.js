const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const students = [];
const professors = [];

//to confirm if it is running 
app.get('/', (req, res) => {
  res.send('Welcome to the Student and Professor API');
});

//add student and have attributes listed 
app.post('/api/setStudents', (req, res) => {
  const { name, id, email, phone, subject, timeline } = req.body;
  const student = { name, id, email, phone, subject, timeline };
  students.push(student);
  res.status(201).send(student);
});
//add professor and have attributes listed 
app.post('/api/setProfessors', (req, res) => {
  const { name, id, email, phone, subject, timeline } = req.body;
  const professor = { name, id, email, phone, subject, timeline };
  professors.push(professor);
  res.status(201).send(professor);
});


// API to get student and professor to have matching subject and timeline 
app.get('/api/SearchBySubject/:subject', (req, res) => {
  //getsubject from URL
  const subject = req.params.subject;

  //goes through array to find students with specific subject 
  const filteredStudents = students.filter(student => student.subject === subject);

  //goes through array to find professors with specific subject and same timeline 
  const filteredProfessors = professors.filter(professor => {
    return professor.subject === subject && 
           filteredStudents.some(student => 
            //Checking if there is any overlap in the timeline between the professor and students
             student.timeline.some(t => professor.timeline.includes(t))
           );
  });

  res.send({
    students: filteredStudents,
    professors: filteredProfessors
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



// Test cases
// STUDENTS POST

// http://localhost:3000/api/setStudents

// {
//   "name": "John Doe",
//   "id": "1",
//   "email": "john.doe@example.com",
//   "phone": "1234567890",
//   "subject": "Mathematics",
//   "timeline": ["2016", "2021"]
// }

// PROFESSORS POST
// http://localhost:3000/api/setProfessors

// {
//   "name": "John Doe PROFESSOR",
//   "id": "1",
//   "email": "john.doe@example.com",
//   "phone": "1234567890",
//   "subject": "Mathematics",
//   "timeline": ["2016", "2021"]
// }

// GET
// http://localhost:3000/api/SearchBySubject/Mathematics


// {
//   "name": "Sanya Hegde",
//   "id": "1",
//   "email": "sanyahegde7@gmail.com",
//   "phone": "0987654321",
//   "subject": "English",
//   "timeline": ["2023"]
// }
