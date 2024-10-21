import React, { useState } from "react";
import axios from "axios";

function Compiler() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const handleCompileAndRun = async () => {
    try {
      const response = await axios.post("http://localhost:8080/run", { code });
      setOutput(response.data.output);
    } catch (error) {
      setOutput("Error: " + error.message);
    }
  };

  return (
    <div>
      <h1>Online Compiler</h1>
      <textarea
        rows="10"
        cols="50"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your C/C++ code here..."
      ></textarea>
      <br />
      <button onClick={handleCompileAndRun}>Compile & Run</button>
      <h2>Output:</h2>
      <pre>{output}</pre>
    </div>
  );
}

export default Compiler;
