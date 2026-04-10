const fs = require("fs");
const zlib = require("zlib");
const { pipeline } = require("stream");

const http = require("http");
const filePath = "./users.json";

//                                                 Part 1

// 1
const readStream1 = fs.createReadStream("big.txt", "utf8");

readStream1.on("data", (chunk) => {
  console.log("Chunk:", chunk);
});
readStream1.on("end", () => {
  console.log("Finished reading file.");
}); 

// 2
const readStream2 = fs.createReadStream("./source.txt");
const writeStream = fs.createWriteStream("./dest.txt");

readStream2.pipe(writeStream);
writeStream.on("finish", () => {
  console.log("File has been copied successfully.");
});

// 3
pipeline(
  fs.createReadStream("./data.txt"),
  zlib.createGzip(),
  fs.createWriteStream("./data.txt.gz"),
  (err) => {
    if (err) {
      console.error("Pipeline failed", err);
    } else {
      console.log("File compressed successfully");
    }
  },
);



//                                                 Part 2


const readUsers = () => {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

const writeUsers = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const server = http.createServer((req, res) => {
    const { url, method } = req;

    if (url === "/users" && method === "GET") {
        const users = readUsers();
        res.end(JSON.stringify(users));
    }

else if (url.startsWith("/users/") && method === "GET") {
    const id = Number(url.split("/")[2]);
    const users = readUsers();

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.end(JSON.stringify({ message: "User not found" }));
    }

    return res.end(JSON.stringify(user));
}

else if (url === "/users" && method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
        body += chunk;
    });

    req.on("end", () => {
        const data = JSON.parse(body);
        const { name, age, email } = data;

        const users = readUsers();
 
        const exists = users.find(user => user.email === email);
        if (exists) {
            return res.end(JSON.stringify({ message: "Email already exists" }));
        }

        const newUser = {
            id: users.length ? users[users.length - 1].id + 1 : 1,
            name,
            age,
            email,
        };

        users.push(newUser);

        writeUsers(users);

        return res.end(JSON.stringify({
            message: "User added successfully",
            user: newUser
        }));
    });
}

else if (url.startsWith("/users/") && method === "PATCH") {

    const id = Number(url.split("/")[2]);

    let body = "";

    req.on("data", (chunk) => {
        body += chunk;
    });

    req.on("end", () => {

        let data;
        try {
            data = JSON.parse(body);
        } catch {
            return res.end(JSON.stringify({ message: "Invalid JSON" }));
        }

        const { name, age, email } = data;

        const users = readUsers();

        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            return res.end(JSON.stringify({ message: "User not found" }));
        }

        if (email) {
            const emailExists = users.find(user => user.email === email && user.id !== id);
            if (emailExists) {
                return res.end(JSON.stringify({ message: "Email already exists" }));
            }
        }

        if (name) users[userIndex].name = name;
        if (age) users[userIndex].age = age;
        if (email) users[userIndex].email = email;

        writeUsers(users);

        return res.end(JSON.stringify({
            message: "User updated",
            user: users[userIndex]
        }));
    });
}

else if (url.startsWith("/users/") && method === "DELETE") {

    const id = Number(url.split("/")[2]);

    const users = readUsers();

    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return res.end(JSON.stringify({ message: "User not found" }));
    }

    users.splice(userIndex, 1);

    writeUsers(users);

    return res.end(JSON.stringify({
        message: "User deleted successfully"
    }));
}

});
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});




//                                           Part 3



// 1
// Event loop is a mechanism that allows Node.js to handle multiple operations concurrently without blocking the main thread 

// 2
// Libuv is a multi platform library that provides an event loop and asynchronous operations for Node.js

// 3 
// By sending it to libuv, which will handle the operation in a separate thread and notify Node.js when it is done
// send it in queue and make the event loop to pick it up when it is ready to be processed

// 4
// Call Stack implement the current code 
// Event Queue wait the callback function 
// Event Loop transfer from Queue to Stack

// 5
// Thread Pool is a collection of threads that can be used to perform tasks concurrently
// you can set it by UV_THREADPOOL_SIZE=8 node app.js 

// 6
// Blocking fs.readFileSync()
// Non-blocking fs.readFile("file.txt", () => {});

