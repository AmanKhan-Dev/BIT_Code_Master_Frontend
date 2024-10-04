import React, { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const GCCConsole = () => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const clientRef = useRef(null);

    useEffect(() => {
        // Initialize WebSocket client
        clientRef.current = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
            debug: (str) => { console.log(str); },
            onConnect: () => {
                console.log('Connected to WebSocket');
                // Subscribe to the output topic
                clientRef.current.subscribe('/topic/output', (message) => {
                    if (message.body) {
                        setOutput(message.body);
                    }
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });

        // Connect to WebSocket
        clientRef.current.activate();

        return () => {
            clientRef.current.deactivate();
        };
    }, []);

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const handleRunCode = () => {
        // Send the code to the server
        clientRef.current.publish({
            destination: '/app/execute',
            body: code,
        });
    };

    return (
        <div>
            <h1>GCC Interactive Console</h1>
            <textarea
                rows="10"
                cols="50"
                value={code}
                onChange={handleCodeChange}
                placeholder="Write your C code here"
            />
            <br />
            <button onClick={handleRunCode}>Run Code</button>
            <h2>Output:</h2>
            <pre>{output}</pre>
        </div>
    );
};

export default GCCConsole;
