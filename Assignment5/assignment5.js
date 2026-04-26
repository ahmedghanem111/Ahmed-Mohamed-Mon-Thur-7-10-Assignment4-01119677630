const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());


//                              Part 1

const readUsers = () => {
    const data = fs.readFileSync("./users.json", 'utf-8');
    return JSON.parse(data);
};

const writeUsers = (users) => {
    fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));
};

// 1 Post
app.post('/user', (req, res) => {
    const { name, age, email } = req.body;
    const users = readUsers();
    
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: "Email already exists." }); 
    }
    
    const newUser = { id: users.length + 1, name, age, email };
    users.push(newUser);
    writeUsers(users);
    res.status(201).json({ message: "User added successfully." });
});

// 2 Patch
app.patch('/user/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, email } = req.body;
    let users = readUsers();
    const userIndex = users.findIndex(u => u.id == id);
    
    if (userIndex === -1) {
        return res.status(404).json({ message: "User ID not found." }); 
    }
    
    if (name) users[userIndex].name = name;
    if (age) users[userIndex].age = age;
    if (email) users[userIndex].email = email;
    
    writeUsers(users);
    res.json({ message: "User updated successfully." }); 
});

// 3 Delete
app.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    let users = readUsers();

    const newUsers = users.filter(u => u.id != id);

    if (newUsers.length === users.length) {
        return res.status(404).json({ message: "User ID not found." });
    }

    writeUsers(newUsers);
    res.json({ message: "User deleted successfully." });
});

// 4 Get by name
app.get('/user/:name', (req, res) => {
    const { name } = req.params;
    const users = readUsers();
    const user = users.find(u => u.name.toLowerCase() === name.toLowerCase());
    
    if (!user) {
        return res.status(404).json({ message: "User name not found." }); 
    }
    res.json(user);
});

// 5 Get all
app.get('/users', (req, res) => {
    const users = readUsers();
    res.json(users); 
});

// 6 Get by age filter
app.get('/user/filter/:minAge', (req, res) => {
    const { minAge } = req.params;
    const users = readUsers();
    const filteredUsers = users.filter(u => u.age >= minAge);
    
    if (filteredUsers.length === 0) {
        return res.status(404).json({ message: "no user found" });
    }
    res.json(filteredUsers); 
});

// 7 Get by id
app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    const users = readUsers();
    const user = users.find(u => u.id == id);
    
    if (!user) {
        return res.status(404).json({ message: "User not found." }); 
    }
    res.json(user); 
});

app.listen(3000, () => console.log('Server is running on port 3000'));


//                         Part 2 
// look at the photo
// it's the same question1 in assignment4
