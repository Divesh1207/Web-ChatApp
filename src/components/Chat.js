import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";//it uses to store the value in firebase database
import { auth, db } from "../firebase-config";

import "../Styles/Chat.css"
export const Chat = (props) => {
    const { room } = props;

    const [newMessage, setNewMessage] = useState("");

    const messageref = collection(db, "messages");//ye reference k jaise kaam krega ki kaun sa message kiske liye hai
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const queryMessages = query(messageref, where("room", "==", room)
        ,orderBy("createdAt")
        );

        const unsucscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });


            setMessages(messages);

        });

        return () => unsucscribe();//it uses to clean effect
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();//prevent from automatic page reload
        if (newMessage === " ") return;


        await addDoc(messageref, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,


        });
        setNewMessage("");//this is use to empty the input field after all the operation


    };
    return <div className="chat-app">
        <div className="header">
            <h1>Welcome to:{room.toUpperCase()}</h1>
        </div>
        <div className="messages">
            {" "}
            {messages.map((message) =>
                <div className="message" key={message.id}>
                    <span className="user">{message.user} 
                    <p className="text-weight">
                    { message.text}</p>
                    </span>

                </div>

            )}
        </div>
        <form onSubmit={handleSubmit} className="new-message-form">
            <input className="new-message-input"
                placeholder="Type your message here"
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}//so if we change to empty the input field also changes
            />
            <button type="submit" className="send-button">Send</button>

        </form>
    </div>;
};