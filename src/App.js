import React, { useState } from "react";
import axios from "axios";

function App() {
  const [fileContent, setFileContent] = useState("");
  const [gptResponse, setGptResponse] = useState("");

  // Function to handle file input
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first file from the file input

    if (file) {
      const reader = new FileReader();

      // Event listener when the file is read
      reader.onload = (e) => {
        const content = e.target.result; // File content
        setFileContent(content); // Update state with file content
        parseFileContent(content);
      };

      // Read the file as text
      reader.readAsText(file);
    }
  };

  // Function to send file content to GPT for parsing
  const parseFileContent = async (content) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/chat",
        {
          // message: "give purely a json response in the format {classes:[class_name:,functions[function_name:,description:,functions_called[]]]}" + content
          message: "generate a component diagram in json format" + content
        },
      );

      setGptResponse(response.data.response);
    } catch (error) {
      console.log(error);
      setGptResponse("Failed to parse content.");
    }
  };

  // const parseFileContent = async (content) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:1234/v1/chat/completions",
  //       {
  //         messages: [
  //           {
  //             role: "user",
  //             content: "give purely a json response in the format {classes:[class_name:,functions[function_name:,functions_called[]]]}" + content
  //           },
  //         ],
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json"
  //         }
  //       }
  //     );

  //     setGptResponse(response.data.choices[0].message.content);
  //     console.log(response.data.choices[0].message.content);
  //   } catch (error) {
  //     console.log(error);
  //     setGptResponse("Failed to parse content.");
  //   }
  // };

  return (
    <div className="App">
      <h1>File Reader</h1>

      {/* File input element */}
      <input type="file" onChange={handleFileChange} />

      {/* Display file content */}
      <h2>File Content:</h2>
      <pre>{fileContent}</pre>

      {/* Display GPT response */}
      <h2>Response:</h2>
      <pre>{gptResponse}</pre>
    </div>
  );
}

export default App;
