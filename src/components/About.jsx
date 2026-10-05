import React, { useContext, useEffect } from "react";

const About = () => {

    return (
        <div className="container my-3">
            <p>
                <h2>About iNotebook</h2>
                Welcome to iNotebook, your digital notebook on the cloud. This application is designed to offer a seamless, secure, and intuitive environment for organizing your thoughts, ideas, tasks, and important information. Whether you are a student managing academic notes or a professional jotting down daily tasks, iNotebook keeps your data synchronized and accessible across devices.

                <h2>Key Features</h2>
                • Cloud Persistence: Save and retrieve your notes securely from any device with an internet connection.
                • Full CRUD Operations: Easily Create, Read, Update, and Delete your personal notes.
                • Secure Authentication: Robust user registration and login system utilizing JSON Web Tokens (JWT) and password hashing to ensure complete data privacy.
                • Responsive User Interface: Clean, modern, and mobile-friendly design styled with Bootstrap or Material UI.

                <h2>Tech Stack</h2>
                 • Frontend: React.js, HTML5, CSS3, Bootstrap
                 • Backend: Node.js, Express.js
                 • Database: MongoDB
                 • Authentication: JWT (JSON Web Tokens) & bcrypt
            </p>
        </div>
    );
};

export default About;