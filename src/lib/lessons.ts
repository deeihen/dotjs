// A block is a paragraph (text with `inline code`) or a code example.
// Code examples run in the browser unless `html` is set.
export type Block = string | { code: string; html?: true };

export type Question = {
  q: string;
  options: string[];
  answer: number;
  why: string;
};

export type Lesson = {
  slug: string;
  title: string;
  minutes: number;
  group: string;
  summary: string;
  sections: { heading: string; blocks: Block[] }[];
  takeaways: string[];
  quiz: Question[];
};

export const lessons: Lesson[] = [
  {
    slug: "welcome",
    title: "Welcome to JavaScript",
    minutes: 6,
    group: "Start",
    summary: "What JavaScript is, and your first line of output.",
    sections: [
      {
        heading: "Why JavaScript",
        blocks: [
          "Have you ever used a website and thought, “this is really cool and interactive”? That was JavaScript. It turns static pages into dynamic ones, and it also runs games, mobile apps, servers and even AI tools.",
          "It is one of the most widely used programming languages in the world, and you need no coding knowledge to start here. Every lesson is short, and every example runs right on the page.",
        ],
      },
      {
        heading: "Output",
        blocks: [
          "Your first program prints a message. `console.log()` writes whatever you put between its brackets to the console. Press Run.",
          { code: 'console.log("Hello World!");' },
          "You can call `console.log()` as many times as you like. Each call prints on a new line.",
          { code: 'console.log("Hello World!");\nconsole.log("I am learning JavaScript.");\nconsole.log("This is fun!");' },
        ],
      },
      {
        heading: "Numbers",
        blocks: [
          "Text needs quotes. Numbers do not. Change the numbers and run it again.",
          { code: "console.log(42);\nconsole.log(3.14);\nconsole.log(-7);" },
        ],
      },
    ],
    takeaways: [
      "The console is part of the web browser. It lets you log messages, run code and see errors and warnings.",
      "`console.log()` displays text in the console, one line per call.",
      "Text goes inside quotes; numbers do not.",
    ],
    quiz: [
      {
        q: "What does console.log() do?",
        options: ["Saves a file", "Prints a value to the console", "Opens a new web page"],
        answer: 1,
        why: "console.log() writes the value you give it to the console.",
      },
      {
        q: "Which line prints the number 7?",
        options: ['console.log("seven")', "console.log(7)", "log.console(7)"],
        answer: 1,
        why: "Numbers need no quotes, and the order is console, then log.",
      },
      {
        q: "Two console.log() calls print how many lines?",
        options: ["One", "Two", "None"],
        answer: 1,
        why: "Each call prints on its own line.",
      },
    ],
  },
  {
    slug: "javascript-in-html",
    title: "JavaScript in HTML",
    minutes: 7,
    group: "Start",
    summary: "Where JavaScript lives on a real web page.",
    sections: [
      {
        heading: "The script tag",
        blocks: [
          "A web page is written in HTML. To add JavaScript, put it inside a `<script>` tag. The browser runs the code when it reaches the tag.",
          {
            html: true,
            code: '<!DOCTYPE html>\n<html>\n  <body>\n    <h1>My page</h1>\n    <script>\n      console.log("The page loaded!");\n    </script>\n  </body>\n</html>',
          },
          "Put the `<script>` tag at the end of `<body>`, so the page appears first and the code runs after it.",
        ],
      },
      {
        heading: "A separate file",
        blocks: [
          "Bigger projects keep JavaScript in its own file, ending in `.js` (that is where this site got its name). The `src` attribute links it.",
          { html: true, code: '<script src="app.js"></script>' },
          "Inside `app.js` you write plain JavaScript, with no tags. This is exactly what runs in the editors on this site:",
          { code: 'console.log("Hello from app.js");' },
        ],
      },
    ],
    takeaways: [
      "JavaScript goes inside a `<script>` tag or in a separate `.js` file.",
      "Put scripts at the end of `<body>` so the page shows first.",
      "`<script src=\"app.js\"></script>` loads code from a file.",
    ],
    quiz: [
      {
        q: "Which tag holds JavaScript in an HTML page?",
        options: ["<js>", "<script>", "<code>"],
        answer: 1,
        why: "The <script> tag holds or links JavaScript.",
      },
      {
        q: "Which attribute links an external .js file?",
        options: ["href", "link", "src"],
        answer: 2,
        why: '<script src="app.js"> loads the file named in src.',
      },
      {
        q: "Does a .js file need <script> tags inside it?",
        options: ["Yes", "No"],
        answer: 1,
        why: "A .js file contains only JavaScript. The tags belong in the HTML.",
      },
    ],
  },
  {
    slug: "simple-operations",
    title: "Simple Operations",
    minutes: 5,
    group: "Start",
    summary: "Let JavaScript do the maths.",
    sections: [
      {
        heading: "A calculator in the console",
        blocks: [
          "Put a calculation inside `console.log()` and JavaScript works out the answer before printing it.",
          { code: "console.log(2 + 3);\nconsole.log(10 - 4);\nconsole.log(6 * 7);\nconsole.log(20 / 5);" },
          "`*` means multiply and `/` means divide.",
        ],
      },
      {
        heading: "Order of operations",
        blocks: [
          "Multiplication and division happen before addition and subtraction, just like in school. Brackets change the order.",
          { code: "console.log(2 + 3 * 4);   // 14\nconsole.log((2 + 3) * 4); // 20" },
          "Anything after `//` is a comment. JavaScript ignores it; it is a note for people.",
        ],
      },
    ],
    takeaways: [
      "`+ - * /` add, subtract, multiply and divide.",
      "`*` and `/` happen before `+` and `-`; brackets go first.",
      "`//` starts a comment that JavaScript skips.",
    ],
    quiz: [
      {
        q: "What does console.log(2 + 3 * 4) print?",
        options: ["20", "14", "24"],
        answer: 1,
        why: "3 * 4 happens first (12), then 2 + 12 = 14.",
      },
      {
        q: "Which symbol multiplies?",
        options: ["x", "*", "×"],
        answer: 1,
        why: "JavaScript uses the asterisk * for multiplication.",
      },
      {
        q: "What does // do?",
        options: ["Divides twice", "Starts a comment", "Ends the program"],
        answer: 1,
        why: "Everything after // on that line is ignored.",
      },
    ],
  },
  {
    slug: "variables",
    title: "Variables",
    minutes: 7,
    group: "Values",
    summary: "Give a value a name so you can use it again.",
    sections: [
      {
        heading: "Naming a value",
        blocks: [
          "A variable is a named box for a value. Make one with `let`, give it a name, and use `=` to put a value in it.",
          { code: 'let name = "Mark";\nlet age = 20;\nconsole.log(name);\nconsole.log(age);' },
          "Variables made with `let` can change later:",
          { code: "let score = 0;\nscore = 10;\nconsole.log(score);" },
        ],
      },
      {
        heading: "Values that never change",
        blocks: [
          "Use `const` for a value that should stay the same. Trying to change it is an error. Run this and read the message.",
          { code: "const pi = 3.14;\nconsole.log(pi);\npi = 3;" },
          "Names can hold letters, digits, `_` and `$`, but cannot start with a digit. Most JavaScript uses camelCase: `firstName`, `totalScore`.",
        ],
      },
    ],
    takeaways: [
      "`let` makes a variable you can change.",
      "`const` makes one you cannot reassign.",
      "Use clear camelCase names like `totalScore`.",
    ],
    quiz: [
      {
        q: "Which keyword makes a variable you cannot reassign?",
        options: ["let", "const", "var"],
        answer: 1,
        why: "const values cannot be reassigned.",
      },
      {
        q: "Which is a valid variable name?",
        options: ["2ndPlace", "second-place", "secondPlace"],
        answer: 2,
        why: "Names cannot start with a digit or contain a hyphen.",
      },
      {
        q: "let x = 5; x = 8; console.log(x) prints…",
        options: ["5", "8", "An error"],
        answer: 1,
        why: "let variables can be given a new value.",
      },
    ],
  },
  {
    slug: "data-types",
    title: "Data Types",
    minutes: 6,
    group: "Values",
    summary: "Numbers, text, true or false, and nothing.",
    sections: [
      {
        heading: "The basic types",
        blocks: [
          "Every value has a type. The ones you will use most:",
          { code: 'let count = 12;          // number\nlet title = "JavaScript"; // string (text)\nlet isDone = false;       // boolean (true or false)\nlet nothing = null;       // null: empty on purpose\nlet notSet;               // undefined: no value yet\n\nconsole.log(count, title, isDone, nothing, notSet);' },
        ],
      },
      {
        heading: "Asking for the type",
        blocks: [
          "`typeof` tells you the type of a value.",
          { code: 'console.log(typeof 12);\nconsole.log(typeof "12");\nconsole.log(typeof true);\nconsole.log(typeof undefined);' },
          "Notice that `12` and `\"12\"` are different: one is a number, the other is text that looks like a number.",
        ],
      },
    ],
    takeaways: [
      "Common types: number, string, boolean, null and undefined.",
      "`typeof value` returns the type as text.",
      "`12` is a number; `\"12\"` is a string.",
    ],
    quiz: [
      {
        q: 'What does typeof "hello" return?',
        options: ['"text"', '"string"', '"word"'],
        answer: 1,
        why: "Text values are strings.",
      },
      {
        q: "Which value is a boolean?",
        options: ['"true"', "true", "1"],
        answer: 1,
        why: 'true without quotes is a boolean; "true" is a string.',
      },
      {
        q: "A variable declared with no value holds…",
        options: ["null", "0", "undefined"],
        answer: 2,
        why: "Variables start as undefined until you give them a value.",
      },
    ],
  },
  {
    slug: "arithmetic-operators",
    title: "Arithmetic Operators",
    minutes: 6,
    group: "Values",
    summary: "Remainders, powers, and counting up by one.",
    sections: [
      {
        heading: "Beyond + − × ÷",
        blocks: [
          "`%` gives the remainder after division. `**` raises to a power.",
          { code: "console.log(10 % 3);  // 1\nconsole.log(8 % 2);   // 0, so 8 is even\nconsole.log(2 ** 3);  // 8" },
        ],
      },
      {
        heading: "Up and down by one",
        blocks: [
          "`++` adds one to a variable and `--` takes one away. You will see these in loops.",
          { code: "let lives = 3;\nlives++;\nconsole.log(lives); // 4\nlives--;\nlives--;\nconsole.log(lives); // 2" },
        ],
      },
    ],
    takeaways: [
      "`%` is the remainder; `n % 2 === 0` means n is even.",
      "`**` is the power operator.",
      "`++` and `--` add or subtract one.",
    ],
    quiz: [
      {
        q: "What is 17 % 5?",
        options: ["3", "2", "3.4"],
        answer: 1,
        why: "17 divided by 5 is 3, remainder 2.",
      },
      {
        q: "What is 3 ** 2?",
        options: ["6", "9", "5"],
        answer: 1,
        why: "3 to the power of 2 is 9.",
      },
      {
        q: "let n = 5; n++; n is now…",
        options: ["5", "6", "4"],
        answer: 1,
        why: "++ adds one.",
      },
    ],
  },
  {
    slug: "assignment-operators",
    title: "Assignment Operators",
    minutes: 5,
    group: "Values",
    summary: "Shortcuts for changing a variable.",
    sections: [
      {
        heading: "Update in place",
        blocks: [
          "`x += 5` is short for `x = x + 5`. The same works for the other operators.",
          { code: "let coins = 10;\ncoins += 5;  // 15\ncoins -= 3;  // 12\ncoins *= 2;  // 24\ncoins /= 4;  // 6\nconsole.log(coins);" },
          "`+=` also works on text, adding to the end of it:",
          { code: 'let message = "Hello";\nmessage += " there";\nconsole.log(message);' },
        ],
      },
    ],
    takeaways: [
      "`=` assigns a value.",
      "`+= -= *= /=` change a variable using its current value.",
      "`+=` on a string adds text to the end.",
    ],
    quiz: [
      {
        q: "let a = 4; a *= 3; a is…",
        options: ["7", "12", "43"],
        answer: 1,
        why: "a *= 3 means a = a * 3.",
      },
      {
        q: "x -= 2 is the same as…",
        options: ["x = 2 - x", "x = x - 2", "x = -2"],
        answer: 1,
        why: "The variable comes first: x = x - 2.",
      },
      {
        q: 'let s = "Hi"; s += "!"; s is…',
        options: ['"Hi!"', '"!Hi"', "An error"],
        answer: 0,
        why: "+= adds the text to the end.",
      },
    ],
  },
  {
    slug: "strings",
    title: "Strings",
    minutes: 7,
    group: "Values",
    summary: "Working with text.",
    sections: [
      {
        heading: "Making strings",
        blocks: [
          "A string is text inside quotes. Single and double quotes both work; pick one and stay with it.",
          { code: "let a = \"Hello\";\nlet b = 'World';\nconsole.log(a, b);" },
          "To use a quote inside a string, use the other kind outside, or put a backslash before it:",
          { code: "console.log(\"It's working\");\nconsole.log('She said \"hi\"');\nconsole.log('It\\'s escaped');" },
        ],
      },
      {
        heading: "Useful string tools",
        blocks: [
          "Strings come with built-in tools. `.length` counts the characters.",
          { code: 'let word = "JavaScript";\nconsole.log(word.length);\nconsole.log(word.toUpperCase());\nconsole.log(word.toLowerCase());\nconsole.log(word[0]);       // first character\nconsole.log(word.includes("Script"));' },
          "Positions start at 0, so `word[0]` is the first character.",
        ],
      },
    ],
    takeaways: [
      "Strings are text in single or double quotes.",
      "`.length` counts characters; positions start at 0.",
      "`.toUpperCase()`, `.toLowerCase()` and `.includes()` are built in.",
    ],
    quiz: [
      {
        q: 'What is "code".length?',
        options: ["3", "4", "5"],
        answer: 1,
        why: "c, o, d, e: four characters.",
      },
      {
        q: 'What is "hello"[0]?',
        options: ['"h"', '"e"', "undefined"],
        answer: 0,
        why: "Counting starts at 0, so [0] is the first character.",
      },
      {
        q: 'What does "js".toUpperCase() return?',
        options: ['"Js"', '"JS"', '"js"'],
        answer: 1,
        why: "Every letter becomes uppercase.",
      },
    ],
  },
  {
    slug: "template-literals",
    title: "Template Literals",
    minutes: 5,
    group: "Values",
    summary: "Put variables straight into text.",
    sections: [
      {
        heading: "Backticks",
        blocks: [
          "A template literal uses backticks instead of quotes. Inside, `${ }` drops in any value or calculation.",
          { code: 'let name = "Mark";\nlet lessons = 21;\nconsole.log(`Hi ${name}, there are ${lessons} lessons.`);\nconsole.log(`Half way is lesson ${Math.ceil(lessons / 2)}.`);' },
          "Template literals can also span several lines:",
          { code: "let poem = `Roses are red,\nviolets are blue,\nJavaScript is fun\nand so are you.`;\nconsole.log(poem);" },
        ],
      },
    ],
    takeaways: [
      "Template literals use backticks.",
      "`${ }` inserts a value or expression.",
      "They can span multiple lines.",
    ],
    quiz: [
      {
        q: "Which quote starts a template literal?",
        options: ['"', "'", "`"],
        answer: 2,
        why: "Template literals use backticks.",
      },
      {
        q: "let n = 3; `n is ${n + 1}` gives…",
        options: ['"n is 4"', '"n is 31"', '"n is ${n + 1}"'],
        answer: 0,
        why: "The calculation inside ${ } runs first.",
      },
      {
        q: 'What does "Hi ${name}" (double quotes) print?',
        options: ["Hi and the name", "Hi ${name} exactly"],
        answer: 1,
        why: "${ } only works inside backticks.",
      },
    ],
  },
  {
    slug: "string-concatenation",
    title: "String Concatenation",
    minutes: 5,
    group: "Values",
    summary: "Joining text with +, and a classic surprise.",
    sections: [
      {
        heading: "Joining with +",
        blocks: [
          "`+` joins strings together. Remember to add the spaces yourself.",
          { code: 'let first = "Mark";\nlet last = "Concha";\nconsole.log(first + " " + last);' },
        ],
      },
      {
        heading: "Numbers and strings",
        blocks: [
          "When one side of `+` is a string, JavaScript joins instead of adding. This catches everyone once.",
          { code: 'console.log(5 + 5);     // 10\nconsole.log("5" + 5);   // "55"\nconsole.log(1 + 2 + "3"); // "33"' },
          "`Number()` turns text into a number when you need real maths:",
          { code: 'console.log(Number("5") + 5);' },
        ],
      },
    ],
    takeaways: [
      "`+` joins strings.",
      "A string on either side of `+` makes it join, not add.",
      "`Number(\"5\")` converts text to a number.",
    ],
    quiz: [
      {
        q: 'What is "3" + 4?',
        options: ["7", '"34"', "An error"],
        answer: 1,
        why: "One side is a string, so + joins them.",
      },
      {
        q: 'What is "Hi" + " " + "there"?',
        options: ['"Hithere"', '"Hi there"', '"Hi + there"'],
        answer: 1,
        why: "The middle string is a space.",
      },
      {
        q: 'Number("8") + 2 is…',
        options: ['"82"', "10"],
        answer: 1,
        why: "Number() converts the text, so this is real addition.",
      },
    ],
  },
  {
    slug: "booleans-comparisons",
    title: "Booleans & Comparisons",
    minutes: 7,
    group: "Decisions",
    summary: "Questions with a yes or no answer.",
    sections: [
      {
        heading: "Comparing values",
        blocks: [
          "A comparison answers with a boolean: `true` or `false`.",
          { code: "console.log(5 > 3);   // true\nconsole.log(5 < 3);   // false\nconsole.log(4 >= 4);  // true\nconsole.log(7 !== 7); // false" },
          "Use `===` to check if two values are equal, and `!==` for not equal. Avoid `==`: it converts types first, which leads to surprises.",
          { code: 'console.log(5 === 5);   // true\nconsole.log(5 === "5"); // false: different types\nconsole.log(5 == "5");  // true: avoid this one' },
        ],
      },
      {
        heading: "Combining conditions",
        blocks: [
          "`&&` means and, `||` means or, and `!` flips true and false.",
          { code: "let age = 19;\nlet hasTicket = true;\nconsole.log(age >= 18 && hasTicket); // both true\nconsole.log(age < 13 || hasTicket);  // at least one true\nconsole.log(!hasTicket);             // flipped" },
        ],
      },
    ],
    takeaways: [
      "`> < >= <=` compare; `===` and `!==` check equality.",
      "Prefer `===` over `==`.",
      "`&&` (and), `||` (or) and `!` (not) combine booleans.",
    ],
    quiz: [
      {
        q: 'What is 5 === "5"?',
        options: ["true", "false"],
        answer: 1,
        why: "=== also checks the type, and number is not string.",
      },
      {
        q: "true && false is…",
        options: ["true", "false"],
        answer: 1,
        why: "&& needs both sides to be true.",
      },
      {
        q: "!true is…",
        options: ["true", "false", "undefined"],
        answer: 1,
        why: "! flips the value.",
      },
    ],
  },
  {
    slug: "if-statement",
    title: "If Statement",
    minutes: 6,
    group: "Decisions",
    summary: "Run code only when something is true.",
    sections: [
      {
        heading: "Making a decision",
        blocks: [
          "`if` runs the code in its curly braces only when the condition is true. `else` runs when it is false. Change the temperature and run it.",
          { code: 'let temperature = 31;\n\nif (temperature > 30) {\n  console.log("It is hot. Drink water!");\n} else {\n  console.log("Nice weather.");\n}' },
          "The condition can be any comparison, combined with `&&` or `||` if you need:",
          { code: 'let score = 85;\nlet passedQuiz = true;\n\nif (score >= 75 && passedQuiz) {\n  console.log("Lesson complete");\n}' },
        ],
      },
    ],
    takeaways: [
      "`if (condition) { … }` runs only when the condition is true.",
      "`else { … }` runs when it is false.",
      "Indent the code inside braces so it is easy to read.",
    ],
    quiz: [
      {
        q: "let x = 2; if (x > 5) { console.log(\"big\") } prints…",
        options: ['"big"', "Nothing"],
        answer: 1,
        why: "2 > 5 is false, so the block is skipped.",
      },
      {
        q: "When does an else block run?",
        options: ["Always", "When the if condition is false", "Before the if"],
        answer: 1,
        why: "else is the other path.",
      },
      {
        q: "What goes inside the brackets after if?",
        options: ["A condition", "A function name", "A string to print"],
        answer: 0,
        why: "if checks a condition that is true or false.",
      },
    ],
  },
  {
    slug: "else-if",
    title: "Else If Statement",
    minutes: 6,
    group: "Decisions",
    summary: "Choose between more than two paths.",
    sections: [
      {
        heading: "A chain of checks",
        blocks: [
          "`else if` adds another condition. JavaScript checks from the top and runs the first block whose condition is true, then skips the rest.",
          { code: 'let grade = 82;\n\nif (grade >= 90) {\n  console.log("A");\n} else if (grade >= 80) {\n  console.log("B");\n} else if (grade >= 70) {\n  console.log("C");\n} else {\n  console.log("Keep practising");\n}' },
          "Order matters. If you checked `grade >= 70` first, an 82 would print C.",
        ],
      },
    ],
    takeaways: [
      "`else if` adds more conditions to an if.",
      "Only the first true branch runs.",
      "Put the strictest condition first.",
    ],
    quiz: [
      {
        q: "With grade = 95 in the example, what prints?",
        options: ["A", "B", "A and B"],
        answer: 0,
        why: "The first true branch runs and the rest are skipped.",
      },
      {
        q: "How many else if blocks can you add?",
        options: ["One", "Up to three", "As many as you need"],
        answer: 2,
        why: "There is no limit.",
      },
      {
        q: "Where does a final else go?",
        options: ["First", "Last", "Anywhere"],
        answer: 1,
        why: "else catches everything the conditions above missed.",
      },
    ],
  },
  {
    slug: "switch",
    title: "Switch Statements",
    minutes: 7,
    group: "Decisions",
    summary: "Match one value against many options.",
    sections: [
      {
        heading: "Matching cases",
        blocks: [
          "When you compare one value against many exact options, `switch` is easier to read than a long `else if` chain.",
          { code: 'let day = "Sat";\n\nswitch (day) {\n  case "Sat":\n  case "Sun":\n    console.log("Weekend!");\n    break;\n  case "Fri":\n    console.log("Almost there");\n    break;\n  default:\n    console.log("Weekday");\n}' },
          "`break` stops the switch. Without it, the code falls through into the next case. `default` runs when nothing matches.",
        ],
      },
    ],
    takeaways: [
      "`switch` compares one value against several `case`s using `===`.",
      "End each case with `break`.",
      "`default` handles anything that did not match.",
    ],
    quiz: [
      {
        q: "What does break do inside a switch?",
        options: ["Crashes the program", "Stops the switch", "Skips one case"],
        answer: 1,
        why: "break exits the switch so no other cases run.",
      },
      {
        q: "When does default run?",
        options: ["Always", "When no case matches", "First"],
        answer: 1,
        why: "default is the fallback.",
      },
      {
        q: 'Does case 1 match the value "1"?',
        options: ["Yes", "No"],
        answer: 1,
        why: "switch uses ===, so the types must match too.",
      },
    ],
  },
  {
    slug: "ternary",
    title: "Ternary Operators",
    minutes: 5,
    group: "Decisions",
    summary: "A one-line if and else.",
    sections: [
      {
        heading: "Condition ? yes : no",
        blocks: [
          "The ternary operator picks one of two values. If the condition is true you get the value after `?`; otherwise the one after `:`.",
          { code: 'let age = 16;\nlet status = age >= 18 ? "adult" : "minor";\nconsole.log(status);' },
          "It is great inside template literals:",
          { code: 'let items = 1;\nconsole.log(`You have ${items} ${items === 1 ? "item" : "items"}.`);' },
          "Keep ternaries short. If you need more than two paths, use `if`.",
        ],
      },
    ],
    takeaways: [
      "`condition ? a : b` returns a when true, b when false.",
      "Use it for picking a value, not for long logic.",
      "It fits neatly inside `${ }`.",
    ],
    quiz: [
      {
        q: 'true ? "yes" : "no" gives…',
        options: ['"yes"', '"no"'],
        answer: 0,
        why: "The condition is true, so the first value is used.",
      },
      {
        q: "Which symbol separates the two choices?",
        options: ["?", ":", ";"],
        answer: 1,
        why: "? follows the condition; : separates the choices.",
      },
      {
        q: "let n = 3; n > 5 ? \"big\" : \"small\" gives…",
        options: ['"big"', '"small"'],
        answer: 1,
        why: "3 > 5 is false.",
      },
    ],
  },
  {
    slug: "for-loop",
    title: "For Loop",
    minutes: 8,
    group: "Loops",
    summary: "Repeat code a set number of times.",
    sections: [
      {
        heading: "Three parts",
        blocks: [
          "A `for` loop has three parts: where to start, when to keep going, and what to change each time.",
          { code: "for (let i = 1; i <= 5; i++) {\n  console.log(`Lap ${i}`);\n}" },
          "Read it as: start `i` at 1; while `i <= 5`, run the block; after each run, add one to `i`.",
        ],
      },
      {
        heading: "Doing something useful",
        blocks: [
          "Loops can build up a result. This adds the numbers 1 to 100:",
          { code: "let total = 0;\nfor (let i = 1; i <= 100; i++) {\n  total += i;\n}\nconsole.log(total);" },
          "And this prints the 7 times table. Try another number.",
          { code: "let n = 7;\nfor (let i = 1; i <= 10; i++) {\n  console.log(`${n} x ${i} = ${n * i}`);\n}" },
        ],
      },
    ],
    takeaways: [
      "`for (start; condition; update) { … }` repeats a block.",
      "The loop stops when the condition becomes false.",
      "Use a variable outside the loop to build a total.",
    ],
    quiz: [
      {
        q: "How many times does for (let i = 0; i < 3; i++) run?",
        options: ["2", "3", "4"],
        answer: 1,
        why: "i is 0, 1 and 2; at 3 the condition is false.",
      },
      {
        q: "What does i++ do in a for loop?",
        options: ["Ends the loop", "Adds one to i after each run", "Prints i"],
        answer: 1,
        why: "It is the update step.",
      },
      {
        q: "for (let i = 10; i > 0; i--) counts…",
        options: ["Up from 10", "Down from 10 to 1", "Forever"],
        answer: 1,
        why: "i-- subtracts one until i > 0 is false.",
      },
    ],
  },
  {
    slug: "while-loop",
    title: "While Loop",
    minutes: 7,
    group: "Loops",
    summary: "Repeat until something changes.",
    sections: [
      {
        heading: "Keep going while true",
        blocks: [
          "A `while` loop repeats as long as its condition is true. Use it when you do not know in advance how many times to loop.",
          { code: "let savings = 100;\nlet months = 0;\n\nwhile (savings < 500) {\n  savings += 75;\n  months++;\n}\nconsole.log(`It takes ${months} months.`);" },
        ],
      },
      {
        heading: "Do not loop forever",
        blocks: [
          "Something inside the loop must eventually make the condition false. If not, the loop never ends. The editors here stop any program after two seconds, so you can try it safely:",
          { code: "let i = 0;\nwhile (i < 5) {\n  console.log(i);\n  // i++ is missing, so i stays 0 forever\n}" },
          "Add `i++;` inside the loop and run it again.",
        ],
      },
    ],
    takeaways: [
      "`while (condition) { … }` repeats while the condition is true.",
      "Change something inside the loop so it can stop.",
      "Use `for` when you know the count, `while` when you do not.",
    ],
    quiz: [
      {
        q: "let n = 0; while (n < 3) { n++ } — n ends as…",
        options: ["2", "3", "4"],
        answer: 1,
        why: "The loop stops once n < 3 is false, at 3.",
      },
      {
        q: "What causes an infinite loop?",
        options: ["A condition that never becomes false", "Using let", "Too many console.log calls"],
        answer: 0,
        why: "If the condition stays true, the loop never ends.",
      },
      {
        q: "while (false) { console.log(\"hi\") } prints…",
        options: ['"hi" once', "Nothing", '"hi" forever'],
        answer: 1,
        why: "The condition is false before the first run.",
      },
    ],
  },
  {
    slug: "break-continue",
    title: "Break And Continue",
    minutes: 6,
    group: "Loops",
    summary: "Leave a loop early, or skip one round.",
    sections: [
      {
        heading: "break",
        blocks: [
          "`break` leaves the loop immediately.",
          { code: 'let numbers = [4, 9, 15, 22, 30];\nfor (let i = 0; i < numbers.length; i++) {\n  if (numbers[i] > 10) {\n    console.log(`First over 10: ${numbers[i]}`);\n    break;\n  }\n}' },
          "The square brackets make a list of values, called an array. `numbers[i]` reads the item at position `i`.",
        ],
      },
      {
        heading: "continue",
        blocks: [
          "`continue` skips the rest of this round and moves to the next.",
          { code: "for (let i = 1; i <= 10; i++) {\n  if (i % 2 === 0) {\n    continue; // skip even numbers\n  }\n  console.log(i);\n}" },
        ],
      },
    ],
    takeaways: [
      "`break` exits the loop entirely.",
      "`continue` jumps to the next round.",
      "Both usually sit inside an `if`.",
    ],
    quiz: [
      {
        q: "What does continue do?",
        options: ["Ends the loop", "Skips to the next round", "Restarts from zero"],
        answer: 1,
        why: "The rest of the current round is skipped.",
      },
      {
        q: "A loop from 1 to 5 runs if (i === 3) break; before console.log(i). What prints?",
        options: ["1 2", "1 2 3", "1 2 4 5"],
        answer: 0,
        why: "At 3 the loop exits before printing.",
      },
      {
        q: "Skipping even numbers prints which from 1–6?",
        options: ["2 4 6", "1 3 5", "1 2 3"],
        answer: 1,
        why: "continue skips the even rounds.",
      },
    ],
  },
  {
    slug: "functions",
    title: "Functions",
    minutes: 7,
    group: "Functions",
    summary: "Package code under a name and reuse it.",
    sections: [
      {
        heading: "Define once, call many times",
        blocks: [
          "A function is a named block of code. Defining it does not run it; calling it does, with the name and brackets.",
          { code: 'function greet() {\n  console.log("Hello!");\n  console.log("Welcome to .Js");\n}\n\ngreet();\ngreet();' },
        ],
      },
      {
        heading: "Arrow functions",
        blocks: [
          "Modern JavaScript also has a shorter way to write functions, using `=>`. You will see both everywhere.",
          { code: 'const wave = () => {\n  console.log("Hi there!");\n};\n\nwave();' },
        ],
      },
    ],
    takeaways: [
      "`function name() { … }` defines a function.",
      "`name()` calls it; you can call it as often as you like.",
      "`const name = () => { … }` is the arrow form.",
    ],
    quiz: [
      {
        q: "How do you run a function called start?",
        options: ["start", "start()", "run start"],
        answer: 1,
        why: "The brackets call the function.",
      },
      {
        q: "Does defining a function run it?",
        options: ["Yes", "No"],
        answer: 1,
        why: "It only runs when called.",
      },
      {
        q: "Which is an arrow function?",
        options: ["const f = () => {}", "function => f {}", "f() -> {}"],
        answer: 0,
        why: "Brackets, then =>, then the body.",
      },
    ],
  },
  {
    slug: "function-parameters",
    title: "Function Parameters",
    minutes: 7,
    group: "Functions",
    summary: "Send values into a function.",
    sections: [
      {
        heading: "Inputs",
        blocks: [
          "Parameters are names in the function’s brackets. The values you pass when calling it are called arguments.",
          { code: 'function greet(name) {\n  console.log(`Hello, ${name}!`);\n}\n\ngreet("Mark");\ngreet("Ana");' },
          "Use commas for more than one:",
          { code: "function introduce(name, age) {\n  console.log(`${name} is ${age} years old.`);\n}\n\nintroduce(\"Liza\", 21);" },
        ],
      },
      {
        heading: "Default values",
        blocks: [
          "If an argument is missing, its parameter is `undefined`. A default value fills the gap.",
          { code: 'function greet(name = "friend") {\n  console.log(`Hello, ${name}!`);\n}\n\ngreet();\ngreet("Mark");' },
        ],
      },
    ],
    takeaways: [
      "Parameters are the names; arguments are the values you pass.",
      "Separate several parameters with commas.",
      "`name = \"friend\"` sets a default.",
    ],
    quiz: [
      {
        q: 'In greet("Ana"), what is "Ana"?',
        options: ["A parameter", "An argument", "A return value"],
        answer: 1,
        why: "Values passed in a call are arguments.",
      },
      {
        q: "A parameter with no argument and no default is…",
        options: ["0", "null", "undefined"],
        answer: 2,
        why: "Missing arguments are undefined.",
      },
      {
        q: "function add(a, b) — how many parameters?",
        options: ["1", "2", "0"],
        answer: 1,
        why: "a and b.",
      },
    ],
  },
  {
    slug: "returning-from-functions",
    title: "Returning From Functions",
    minutes: 8,
    group: "Functions",
    summary: "Get a value back out of a function.",
    sections: [
      {
        heading: "return",
        blocks: [
          "`return` sends a value back to wherever the function was called. You can store it, print it or use it in a calculation.",
          { code: "function add(a, b) {\n  return a + b;\n}\n\nlet sum = add(3, 4);\nconsole.log(sum);\nconsole.log(add(10, add(1, 2)));" },
          "A function stops as soon as it returns. Code after `return` does not run.",
          { code: 'function check(age) {\n  if (age >= 18) {\n    return "adult";\n  }\n  return "minor";\n}\n\nconsole.log(check(20));\nconsole.log(check(12));' },
        ],
      },
      {
        heading: "Putting it all together",
        blocks: [
          "Here is everything from this course in one program: variables, a loop, an if, a function with parameters and a return value. Change it, break it and fix it.",
          { code: 'function grade(score) {\n  if (score >= 90) return "A";\n  if (score >= 80) return "B";\n  if (score >= 70) return "C";\n  return "Keep going";\n}\n\nconst scores = [95, 82, 67, 74];\nfor (let i = 0; i < scores.length; i++) {\n  console.log(`${scores[i]}: ${grade(scores[i])}`);\n}' },
        ],
      },
    ],
    takeaways: [
      "`return value` sends a result back to the caller.",
      "A function stops at `return`.",
      "Without `return`, a function gives back `undefined`.",
    ],
    quiz: [
      {
        q: "function f() { return 5 } — f() + 1 is…",
        options: ["6", '"51"', "undefined"],
        answer: 0,
        why: "f() returns the number 5.",
      },
      {
        q: "What does a function return with no return statement?",
        options: ["0", "null", "undefined"],
        answer: 2,
        why: "The default return value is undefined.",
      },
      {
        q: "Does code after return run?",
        options: ["Yes", "No"],
        answer: 1,
        why: "return ends the function immediately.",
      },
    ],
  },
];

export const groups = [...new Set(lessons.map((l) => l.group))];

export function getLesson(slug: string) {
  const i = lessons.findIndex((l) => l.slug === slug);
  return i < 0 ? null : { lesson: lessons[i], prev: lessons[i - 1], next: lessons[i + 1], index: i };
}
