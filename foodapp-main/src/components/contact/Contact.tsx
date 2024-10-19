import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ContactPage.css'; // Import CSS file for styling

const ContactPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        // Clear input values
        setName('');
        setEmail('');
        setDescription('');
        
        // Display success toast
        toast.success('Message sent successfully!');
    }

    return (
        <div className="contact-page">
            <h1>Contact Us</h1>
            <div className="contact-form">
                <label htmlFor="name">Name:</label>
                <input 
                    type="text" 
                    id="name" 
                    className="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />

                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    className="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />

                <label htmlFor="description">Description:</label>
                <textarea 
                    id="description" 
                    className="description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                ></textarea>

                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default ContactPage;
