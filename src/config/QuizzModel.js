const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

   export const quizzAIModel = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "give me 10 question of c++ programming easy level and also give its 4 options and also having one right ans give me all data into json format\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"question\": \"What is the correct syntax for declaring a variable named 'age' of type 'int' in C++?\",\n    \"options\": [\n      \"int age;\",\n      \"age int;\",\n      \"var age = int;\",\n      \"int = age;\"\n    ],\n    \"answer\": \"int age;\"\n  },\n  {\n    \"question\": \"What is the output of the following C++ code snippet?\\n```c++\\ncout << 5 + 3 * 2;\\n```\",\n    \"options\": [\n      \"10\",\n      \"11\",\n      \"16\",\n      \"8\"\n    ],\n    \"answer\": \"11\"\n  },\n  {\n    \"question\": \"Which operator is used for modulus (remainder) in C++?\",\n    \"options\": [\n      \"*\",\n      \"/\",\n      \"%\",\n      \"^\"\n    ],\n    \"answer\": \"%\"\n  },\n  {\n    \"question\": \"What is the purpose of the 'cin' object in C++?\",\n    \"options\": [\n      \"To display output on the console\",\n      \"To read input from the user\",\n      \"To define a variable\",\n      \"To execute a program\"\n    ],\n    \"answer\": \"To read input from the user\"\n  },\n  {\n    \"question\": \"Which data type is used to store a single character in C++?\",\n    \"options\": [\n      \"char\",\n      \"string\",\n      \"int\",\n      \"float\"\n    ],\n    \"answer\": \"char\"\n  },\n  {\n    \"question\": \"What is the output of the following C++ code snippet?\\n```c++\\ncout << \\\"Hello\\\" << \\\" World!\\\" << endl;\\n```\",\n    \"options\": [\n      \"Hello World!\",\n      \"Hello\\\" World!\",\n      \"Hello\\\"World!\",\n      \"Hello World\"\n    ],\n    \"answer\": \"Hello World!\"\n  },\n  {\n    \"question\": \"Which keyword is used to declare a constant variable in C++?\",\n    \"options\": [\n      \"const\",\n      \"static\",\n      \"final\",\n      \"var\"\n    ],\n    \"answer\": \"const\"\n  },\n  {\n    \"question\": \"What is the correct way to write a comment in C++?\",\n    \"options\": [\n      \"/* This is a comment */\",\n      \"// This is a comment\",\n      \"'This is a comment'\",\n      \"/* This is a comment //\"\n    ],\n    \"answer\": \"// This is a comment\"\n  },\n  {\n    \"question\": \"What is the difference between '==' and '=' in C++?\",\n    \"options\": [\n      \"'==' is used for assignment, '=' is used for comparison\",\n      \"'=' is used for assignment, '==' is used for comparison\",\n      \"Both are used for assignment\",\n      \"Both are used for comparison\"\n    ],\n    \"answer\": \"'=' is used for assignment, '==' is used for comparison\"\n  },\n  {\n    \"question\": \"Which of the following is a valid C++ identifier?\",\n    \"options\": [\n      \"123abc\",\n      \"abc123\",\n      \"abc-123\",\n      \"abc$123\"\n    ],\n    \"answer\": \"abc123\"\n  }\n]\n```"},
          ],
        },
      ],
    });
  
