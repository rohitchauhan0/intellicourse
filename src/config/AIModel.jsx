import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

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
  responseMimeType: "application/json",
};

export const GenerateCourseLayout_AI = model.startChat({
  generationConfig,

  history: [
    {
      role: "user",
      parts: [
        {
          text:
            'Generate A Course Tutorial on the following Details with fields such as Course Name, Description, Chapter Name, about, and Duration: Category: "Programming", " topic: "Python", description: "Write in details points", level: "Basic", duration: "1 hour", no. of chapters: "5", in JSON format.',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text:
            '```json\n{\n  "course_name": "Python Programming Fundamentals",\n  "description": "This course will introduce you to the basics of Python programming. You\'ll learn the fundamental concepts of programming such as variables, data types, operators, conditional statements, loops, and functions. By the end of the course, you\'ll be able to write simple Python programs to solve basic problems.",\n  "category": "Programming",\n  "topic": "Python",\n  "level": "Basic",\n  "duration": "1 hour",\n  "chapters": [\n    {\n      "chapter_name": "Introduction to Python",\n      "about": "This chapter introduces you to Python, its history, and its advantages. You will also learn how to set up your Python environment and write your first Python program.",\n      "duration": "15 minutes"\n    },\n    {\n      "chapter_name": "Variables and Data Types",\n      "about": "This chapter explains variables, different data types in Python such as integers, floats, strings, and booleans, and how to work with them.",\n      "duration": "20 minutes"\n    },\n    {\n      "chapter_name": "Operators and Expressions",\n      "about": "This chapter covers various operators in Python, such as arithmetic operators, comparison operators, logical operators, and assignment operators. You will learn how to use these operators to build expressions and manipulate data.",\n      "duration": "15 minutes"\n    },\n    {\n      "chapter_name": "Conditional Statements and Loops",\n      "about": "This chapter introduces you to conditional statements like if-else and loops like for and while loops. You will learn how to control the flow of your program based on conditions.",\n      "duration": "20 minutes"\n    },\n    {\n      "chapter_name": "Functions",\n      "about": "This chapter explains functions, their purpose, and how to define and call them. You will learn how to break down complex programs into smaller, reusable parts using functions.",\n      "duration": "10 minutes"\n    }\n  ]\n}\n```',
        },
      ],
    },
  ],
});

export const GenerateChapterContent_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text:
            "Explain the concept in Detail on Topic: Python Basic, Chapter:Variables and Data Types, in JSON Format with list of array with field as title, explanation on give chapter in detail , Code Example(Code field in <precode> format) if applicable\n\n\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text:
            '```json\n[\n  {\n    "title": "Variables",\n    "explanation": "Variables are like containers that hold data in your Python programs. You can think of them as labeled boxes where you can store information.  To create a variable, you simply give it a name and assign it a value using the \'=\' operator.",\n    "codeExample": "<precode>\\nname = \'Alice\'\\nage = 30\\nheight = 1.65\\n</precode>"\n  },\n  {\n    "title": "Variable Naming Rules",\n    "explanation": "When choosing variable names, you need to follow certain rules:\\n\\n* **Start with a letter or underscore:** Variable names can\'t begin with numbers. \\n* **Consist of letters, numbers, and underscores:** No spaces or special characters are allowed. \\n* **Case-sensitive:** \'myVar\' and \'MyVar\' are considered different variables. \\n* **Descriptive Names:** Choose names that reflect the data they store.",\n    "codeExample": "<precode>\\n# Good names\\nmy_age = 25\\nstudent_count = 100\\n\\n# Bad names\\n1st_name = \'Bob\'  # Starts with a number\\nname-last = \'Smith\'  # Contains hyphen\\n</precode>"\n  },\n  {\n    "title": "Data Types",\n    "explanation": "Data types determine the kind of data a variable can hold. Python has several built-in data types, each with its unique characteristics.",\n    "codeExample": ""\n  },\n  {\n    "title": "Integers (int)",\n    "explanation": "Integers represent whole numbers without decimal points.",\n    "codeExample": "<precode>\\nage = 25\\nnumber_of_books = 10\\n</precode>"\n  },\n  {\n    "title": "Floating-Point Numbers (float)",\n    "explanation": "Floating-point numbers represent numbers with decimal points. They are used for values that can have fractional parts.",\n    "codeExample": "<precode>\\nprice = 9.99\\nheight = 1.75\\n</precode>"\n  },\n  {\n    "title": "Strings (str)",\n    "explanation": "Strings represent sequences of characters, such as letters, numbers, and symbols. They are enclosed in single or double quotes.",\n    "codeExample": "<precode>\\nmessage = \'Hello, world!\'\\nname = \\"John Doe\\"\\n</precode>"\n  },\n  {\n    "title": "Booleans (bool)",\n    "explanation": "Booleans represent truth values, either True or False. They are used in conditional statements and logical operations.",\n    "codeExample": "<precode>\\nis_active = True\\nhas_permission = False\\n</precode>"\n  },\n  {\n    "title": "Lists",\n    "explanation": "Lists are ordered collections of items enclosed in square brackets. They can hold items of different data types.",\n    "codeExample": "<precode>\\ncolors = [\'red\', \'green\', \'blue\']\\nnumbers = [1, 2, 3, 4]\\n</precode>"\n  },\n  {\n    "title": "Tuples",\n    "explanation": "Tuples are similar to lists but are immutable, meaning their elements cannot be changed after creation. They are enclosed in parentheses.",\n    "codeExample": "<precode>\\ncoordinates = (10, 20)\\nweekdays = (\'Monday\', \'Tuesday\', \'Wednesday\')\\n</precode>"\n  },\n  {\n    "title": "Dictionaries",\n    "explanation": "Dictionaries store key-value pairs, where each key is associated with a value. They are enclosed in curly braces.",\n    "codeExample": "<precode>\\nstudent = {\'name\': \'Alice\', \'age\': 20, \'grade\': \'A\'}\\n</precode>"\n  },\n  {\n    "title": "Type Casting",\n    "explanation": "Type casting allows you to convert data from one type to another. This is useful when you need to perform operations that require specific data types.",\n    "codeExample": "<precode>\\nnumber = 10\\nstring_number = str(number)  # Convert to string\\n\\nfloat_value = 3.14\\ninteger_value = int(float_value)  # Convert to integer\\n</precode>"\n  },\n  {\n    "title": "Input and Output",\n    "explanation": "Python provides functions for taking input from the user and displaying output to the console.",\n    "codeExample": "<precode>\\nname = input(\'Enter your name: \')  # Get input from user\\nprint(\'Hello,\', name)  # Display output\\n</precode>"\n  }\n]\n```',
        },
      ],
    },
  ],
});
