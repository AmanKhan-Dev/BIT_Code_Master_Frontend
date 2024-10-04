import React, { useState } from 'react';
import { Terminal } from 'react-console-emulator';

const Console = () => {
  const [output, setOutput] = useState('');

  const runCommand = (args) => {
    // Implement the logic to run the code here
    // You can access the source code from your state and execute it
    const result = `Running: ${args.join(' ')}`;
    setOutput(result);
    return result; // Return the output to display in the terminal
  };

  return (
    <Terminal
      commands={{
        run: runCommand,
        // Add more commands as needed
      }}
      welcomeMessage={'Welcome to the interactive console!'}
      promptLabel={'>'}
      style={{ height: '400px' }}
    />
  );
};

export default Console;
