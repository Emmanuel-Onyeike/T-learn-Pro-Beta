/**
 * T LEARN PRO - Curriculum Data
 * Pure data file. No logic. No DOM. Just course content.
 * Extracted from dashboard.js for separation of concerns.
 */

const curriculumData = {
  HTML: {
    icon: 'fa-html5',
    topics: [
      { title: 'Semantic Structure', theory: 'Semantic HTML tags like <header>, <main>, and <section> provide meaning to the web page structure, making it easier for screen readers and search engines to parse content.', challenge: 'Create a semantic layout with a header and a main section.', snippet: `<header>\n  <h1>My Site</h1>\n</header>\n<main>\n  <p>Hello World</p>\n</main>` },
      { title: 'Forms & Inputs', theory: 'Forms are the primary way to collect user data. Using <label> linked via the "for" attribute ensures that clicking the text focuses the input, which is vital for accessibility.', challenge: 'Create a text input with a placeholder.', snippet: `<label for="name">Name:</label>\n<input type="text" id="name" placeholder="Enter Name">` },
      { title: 'Media Elements', theory: 'HTML5 introduced native multimedia support. The "alt" attribute on images is mandatory for accessibility and SEO.', challenge: 'Embed an image with alt text.', snippet: `<img src="photo.jpg" alt="Profile photo">` },
      { title: 'Tables', theory: 'Tables represent data in a grid. Use <thead>, <tbody>, and <tfoot> to logically group your table rows for better styling control and accessibility.', challenge: 'Create a 2-row table.', snippet: `<table>\n  <tr><th>Name</th><th>Age</th></tr>\n  <tr><td>Alex</td><td>22</td></tr>\n</table>` },
      { title: 'The Head & Meta', theory: 'The <head> contains metadata about the document, such as character encoding, viewport settings for responsiveness, and SEO titles.', challenge: 'Add a meta charset tag.', snippet: `<meta charset="UTF-8">` },
      { title: 'Links & Navigation', theory: 'The <a> tag creates hyperlinks. Using target="_blank" opens links in new tabs, but should be used sparingly to avoid user confusion.', challenge: 'Create a link to Google.', snippet: `<a href="https://google.com">Google</a>` },
      { title: 'Lists (Ordered/Unordered)', theory: '<ul> is for bullet points where order doesn\'t matter, while <ol> is for numbered steps.', challenge: 'Create an unordered list.', snippet: `<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>` },
      { title: 'Buttons vs Anchors', theory: 'Use <button> for actions (like submitting or clicking) and <a> for navigation (changing the URL).', challenge: 'Create a functional button.', snippet: `<button type="button">Click Me</button>` },
      { title: 'The Video Tag', theory: 'The <video> tag supports multiple source formats and can include "controls" for play/pause/volume.', challenge: 'Add a video element with controls.', snippet: `<video controls width="250">\n  <source src="vid.mp4" type="video/mp4">\n</video>` },
      { title: 'Iframes', theory: 'Iframes allow you to embed external websites or components (like YouTube videos) directly into your page.', challenge: 'Embed an iframe.', snippet: `<iframe src="https://example.com" title="Example"></iframe>` },
      { title: 'Data Attributes', theory: 'The "data-*" attributes allow you to store custom private data on an element which can be accessed via JavaScript.', challenge: 'Add a custom data attribute.', snippet: `<div data-user-id="123">User Profile</div>` },
      { title: 'Canvas API', theory: 'The <canvas> element is used to draw graphics on the fly via scripting, usually JavaScript.', challenge: 'Create a canvas container.', snippet: `<canvas id="myCanvas" width="200" height="100"></canvas>` },
      { title: 'SVG Integration', theory: 'SVGs are XML-based vector graphics. Unlike JPEGs, they do not lose quality when resized.', challenge: 'Inline a simple circle SVG.', snippet: `<svg height="100" width="100">\n  <circle cx="50" cy="50" r="40" stroke="black" fill="red" />\n</svg>` },
      { title: 'Details & Summary', theory: 'The <details> tag creates an interactive widget that the user can open and close.', challenge: 'Create a toggleable detail.', snippet: `<details>\n  <summary>Click to read more</summary>\n  <p>Hidden content here.</p>\n</details>` },
      { title: 'Web Components (Slot)', theory: 'The <slot> element is a placeholder inside a web component that you can fill with your own markup.', challenge: 'Define a slot.', snippet: `<template id="my-tmp">\n  <slot name="content">Default</slot>\n</template>` }
    ]
  },

  CSS: {
    icon: 'fa-css3-alt',
    topics: [
      { title: 'Flexbox Mastery', theory: 'Flexbox is a one-dimensional layout system. "justify-content" aligns items on the main axis, while "align-items" handles the cross axis.', challenge: 'Center a div horizontally and vertically.', snippet: `.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}` },
      { title: 'Grid Layout', theory: 'CSS Grid is a two-dimensional system (rows AND columns). "fr" units represent a fraction of the available space.', challenge: 'Create a 3-column grid.', snippet: `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}` },
      { title: 'Responsive Design', theory: 'Media queries allow you to apply styles based on the device width, height, or orientation.', challenge: 'Change background color on small screens.', snippet: `@media (max-width: 600px) {\n  body {\n    background: #f2f2f2;\n  }\n}` },
      { title: 'Animations', theory: 'Animations use @keyframes to define a start and end state, allowing for complex motion without JS.', challenge: 'Create a simple fade-in animation.', snippet: `@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}` },
      { title: 'The Box Model', theory: 'Every element is a box consisting of Content, Padding, Border, and Margin. Box-sizing: border-box is recommended to include padding in the width calculation.', challenge: 'Set box-sizing.', snippet: `* { box-sizing: border-box; }` },
      { title: 'CSS Variables', theory: 'Variables (Custom Properties) allow you to store values (like colors) in one place and reuse them across your CSS.', challenge: 'Define and use a variable.', snippet: `:root { --main-bg: #333; }\nbody { background: var(--main-bg); }` },
      { title: 'Selectors & Specificity', theory: 'Specificity determines which CSS rule wins. ID selectors (#) are stronger than Class selectors (.), which are stronger than Tag selectors.', challenge: 'Target an element by ID.', snippet: `#unique-header { color: blue; }` },
      { title: 'Positioning', theory: 'Relative position stays in the flow; Absolute position moves relative to its nearest positioned ancestor; Fixed is relative to the viewport.', challenge: 'Set a fixed header.', snippet: `header { position: fixed; top: 0; width: 100%; }` },
      { title: 'Transitions', theory: 'Transitions allow you to change property values smoothly over a given duration.', challenge: 'Add a hover transition.', snippet: `button {\n  transition: background 0.3s ease;\n}\nbutton:hover { background: red; }` },
      { title: 'Z-Index', theory: 'Z-index controls the stack order of elements. It only works on elements with a "position" value other than static.', challenge: 'Bring an element to the front.', snippet: `.overlay { z-index: 100; position: absolute; }` },
      { title: 'Calc() Function', theory: 'The calc() function allows you to perform calculations when specifying CSS property values (e.g., mixing px and %).', challenge: 'Set width using calc.', snippet: `div { width: calc(100% - 20px); }` },
      { title: 'Flexbox Gap', theory: 'The gap property provides a way to add spacing between flex items without using margins on the items themselves.', challenge: 'Add 10px spacing between items.', snippet: `.flex-container { display: flex; gap: 10px; }` },
      { title: 'Object-Fit', theory: 'Object-fit defines how an <img> or <video> should be resized to fit its container.', challenge: 'Make an image cover its container.', snippet: `img { width: 100%; height: 200px; object-fit: cover; }` },
      { title: 'Filters', theory: 'The filter property applies graphical effects like blur or color shifting to an element.', challenge: 'Blur an image.', snippet: `img { filter: blur(5px); }` },
      { title: 'Pseudo-elements', theory: '::before and ::after allow you to insert content from CSS into the DOM without adding extra HTML tags.', challenge: 'Add content before a link.', snippet: `a::before { content: "🔗 "; }` }
    ]
  },

  JavaScript: {
    icon: 'fa-js',
    topics: [
      { title: 'Arrow Functions', theory: 'Arrow functions offer a shorter syntax and do not have their own "this" context, making them ideal for callbacks.', challenge: 'Convert a function to arrow syntax.', snippet: `const greet = () => {\n  console.log("Hello JS!");\n};` },
      { title: 'DOM Manipulation', theory: 'The Document Object Model (DOM) is a programming interface that represents the page so JS can change document structure, style, and content.', challenge: 'Update text content of an element.', snippet: `document.getElementById("demo").innerHTML = "Updated!";` },
      { title: 'Events', theory: 'Events are actions that happen in the browser (clicks, keypresses). Event listeners "listen" for these and trigger code.', challenge: 'Run code when a button is clicked.', snippet: `button.addEventListener("click", () => {\n  alert("Clicked!");\n});` },
      { title: 'Arrays & Methods', theory: 'Modern JS relies on functional methods like map, filter, and reduce to transform data without mutating the original array.', challenge: 'Filter even numbers from an array.', snippet: `const nums = [1,2,3,4];\nconst evens = nums.filter(n => n % 2 === 0);` },
      { title: 'Promises & Async/Await', theory: 'Promises handle asynchronous operations. Async/await is syntactic sugar that makes asynchronous code look synchronous.', challenge: 'Write an async function.', snippet: `async function getData() {\n  const res = await fetch(url);\n  return res.json();\n}` },
      { title: 'Destructuring', theory: 'Destructuring allows you to unpack values from arrays or properties from objects into distinct variables.', challenge: 'Destructure an object.', snippet: `const user = { name: "Bob", age: 25 };\nconst { name, age } = user;` },
      { title: 'Template Literals', theory: 'Backticks (`) allow for multi-line strings and "interpolation" using the ${expression} syntax.', challenge: 'Create a template string.', snippet: `const msg = \`Hello, \${name}!\`;` },
      { title: 'Spread & Rest', theory: 'The spread operator (...) expands an array or object into elements. The rest operator collects multiple elements into an array.', challenge: 'Merge two arrays.', snippet: `const combined = [...arr1, ...arr2];` },
      { title: 'Local Storage', theory: 'Local Storage allows you to store key-value pairs in the browser that persist even after the page is refreshed.', challenge: 'Save data to local storage.', snippet: `localStorage.setItem("user", "Alex");` },
      { title: 'Scope (Let/Const)', theory: 'Var is function-scoped. Let and Const are block-scoped ({}), which prevents many bugs related to variable hoisting.', challenge: 'Declare a constant variable.', snippet: `const pi = 3.14159;` },
      { title: 'Classes & OOP', theory: 'Classes are templates for creating objects. They encapsulate data with code to manipulate that data.', challenge: 'Create a basic class.', snippet: `class Car {\n  constructor(brand) { this.brand = brand; }\n}` },
      { title: 'Closures', theory: 'A closure is the combination of a function bundled together with references to its surrounding state (lexical environment).', challenge: 'Create a counter closure.', snippet: `function counter() {\n  let count = 0;\n  return () => count++;\n}` },
      { title: 'Error Handling', theory: 'Try...catch blocks allow you to handle runtime errors gracefully without crashing the entire script.', challenge: 'Wrap code in try/catch.', snippet: `try {\n  riskyCode();\n} catch (err) {\n  console.error(err);\n}` },
      { title: 'Fetch API', theory: 'Fetch provides a global fetch() method that provides an easy, logical way to fetch resources asynchronously across the network.', challenge: 'Fetch a resource.', snippet: `fetch('api/data').then(r => r.json());` },
      { title: 'Modules (Import/Export)', theory: 'Modules allow you to split your code into separate files and export/import functionality where needed.', challenge: 'Export a function.', snippet: `export const add = (a, b) => a + b;` }
    ]
  },

  Python: {
    icon: 'fa-python',
    topics: [
      { title: 'List Comprehensions', theory: 'A compact way to create a new list by performing an operation on each item in an existing list.', challenge: 'Generate squares of numbers.', snippet: `numbers = [1, 2, 3]\nsquares = [x**2 for x in numbers]` },
      { title: 'Dictionary Methods', theory: 'Dictionaries are hash maps. The .get() method is safer than square brackets because it returns None instead of a KeyError if the key is missing.', challenge: 'Access a value safely.', snippet: `user = {"name": "Gemini", "level": 1}\nprint(user.get("name"))` },
      { title: 'Functions', theory: 'Functions in Python use "def" and support default arguments, keyword arguments, and arbitrary argument lists (*args).', challenge: 'Write a function that adds two numbers.', snippet: `def add(a, b):\n  return a + b` },
      { title: 'Loops', theory: 'For loops in Python iterate over any sequence (list, string, range) and are highly readable.', challenge: 'Loop through a list and print values.', snippet: `for item in ["a", "b", "c"]:\n  print(item)` },
      { title: 'F-Strings', theory: 'Introduced in Python 3.6, f-strings provide a fast and readable way to embed expressions inside string literals.', challenge: 'Format a string.', snippet: `name = "Python"\nprint(f"Hello {name}")` },
      { title: 'Virtual Environments', theory: 'Venvs keep dependencies required by different projects separate by creating isolated environments for them.', challenge: 'Create a venv (bash).', snippet: `python -m venv venv` },
      { title: 'File I/O', theory: 'The "with" statement ensures that files are closed properly after their suite finishes, even if an exception is raised.', challenge: 'Read a file.', snippet: `with open('file.txt', 'r') as f:\n  data = f.read()` },
      { title: 'Error Handling', theory: 'Python uses Try/Except blocks. It is best practice to catch specific exceptions (like ValueError) rather than a general Exception.', challenge: 'Catch a division error.', snippet: `try:\n  x = 1 / 0\nexcept ZeroDivisionError:\n  print("Oops!")` },
      { title: 'PIP & Packages', theory: 'PIP is the package installer for Python. You can use it to install libraries from the Python Package Index (PyPI).', challenge: 'Install requests library.', snippet: `pip install requests` },
      { title: 'Classes (OOP)', theory: 'Everything in Python is an object. Classes allow you to group data and methods that act upon that data together.', challenge: 'Define a class.', snippet: `class Dog:\n  def __init__(self, name):\n    self.name = name` },
      { title: 'Slicing', theory: 'Slicing allows you to get a subset of a sequence (list, tuple, string) using the syntax [start:stop:step].', challenge: 'Reverse a string.', snippet: `s = "hello"[::-1]` },
      { title: 'Lambda Functions', theory: 'Lambdas are small, anonymous one-line functions that can have any number of arguments but only one expression.', challenge: 'Create a double lambda.', snippet: `double = lambda x: x * 2` },
      { title: 'Decorators', theory: 'A decorator is a design pattern that allows you to modify the behavior of a function or class without permanently modifying it.', challenge: 'Apply a decorator.', snippet: `@my_decorator\ndef my_func(): pass` },
      { title: 'Generators', theory: 'Generators allow you to declare a function that behaves like an iterator, yielding values one at a time using the "yield" keyword.', challenge: 'Create a generator.', snippet: `def count():\n  yield 1\n  yield 2` },
      { title: 'Args and Kwargs', theory: '*args allows a function to accept any number of positional arguments; **kwargs allows for named keyword arguments.', challenge: 'Define a flexible function.', snippet: `def func(*args, **kwargs):\n  print(args, kwargs)` }
    ]
  },

  Git: {
    icon: 'fa-git-alt',
    topics: [
      { title: 'Version Control Basics', theory: 'Git is a distributed version control system that tracks changes in source code during software development.', challenge: 'Initialize a git repository.', snippet: `git init` },
      { title: 'Commits', theory: 'A commit is a snapshot of your project at a specific point in time. It requires a clear, descriptive message.', challenge: 'Commit a file.', snippet: `git add .\ngit commit -m "Initial commit"` },
      { title: 'Branching', theory: 'Branches allow you to work on new features or bug fixes in isolation from the main (production) codebase.', challenge: 'Create a new branch.', snippet: `git checkout -b feature-xyz` },
      { title: 'Merging', theory: 'Merging combines the changes from one branch into another (usually merging a feature branch back into main).', challenge: 'Merge a branch.', snippet: `git merge feature-xyz` },
      { title: 'Remote Repos (Push)', theory: 'Remotes are versions of your project hosted on the internet (like GitHub). Pushing sends your local commits there.', challenge: 'Push to main.', snippet: `git push origin main` },
      { title: 'Pulling Changes', theory: 'Git pull fetches updates from the remote and immediately merges them into your local branch.', challenge: 'Update local code.', snippet: `git pull origin main` },
      { title: 'Cloning', theory: 'Cloning creates a local copy of an existing remote repository on your machine.', challenge: 'Clone a repo.', snippet: `git clone <url>` },
      { title: 'Staging Area', theory: 'The staging area (index) is a middle ground where you prepare changes before they are committed.', challenge: 'Add one file to staging.', snippet: `git add style.css` },
      { title: 'Git Status', theory: 'Status tells you which files are modified, which are staged, and which are untracked.', challenge: 'Check status.', snippet: `git status` },
      { title: 'Log & History', theory: 'The log shows the history of all commits made in the repository, including authors and timestamps.', challenge: 'View commit log.', snippet: `git log --oneline` },
      { title: 'Git Stash', theory: 'Stashing takes your uncommitted changes and "hides" them temporarily so you can switch branches without committing.', challenge: 'Stash changes.', snippet: `git stash` },
      { title: 'Reverting Changes', theory: 'Git revert creates a new commit that undoes the changes of a previous commit safely.', challenge: 'Revert a commit.', snippet: `git revert <hash>` },
      { title: 'Git Diff', theory: 'Diff shows the line-by-line differences between files or between the staging area and your last commit.', challenge: 'Check differences.', snippet: `git diff` },
      { title: 'Fetch vs Pull', theory: 'Fetch gets updates from the remote but doesn\'t change your local code. Pull does both fetch and merge.', challenge: 'Fetch updates.', snippet: `git fetch` },
      { title: 'Resolving Conflicts', theory: 'Conflicts occur when two people change the same line. You must manually choose which code to keep.', challenge: 'See conflicts.', snippet: `git status # Then open files` }
    ]
  },

  React: {
    icon: 'fa-react',
    topics: [
      { title: 'Components', theory: 'React apps are built from independent, reusable building blocks called Components.', challenge: 'Create a functional component.', snippet: `function Hello() {\n  return <h1>Hello React</h1>;\n}` },
      { title: 'Props', theory: 'Props (properties) are read-only inputs passed from a parent component to a child component.', challenge: 'Display a prop value.', snippet: `function User({ name }) {\n  return <p>{name}</p>;\n}` },
      { title: 'State (useState)', theory: 'State allows components to "remember" data (like input values). When state changes, React re-renders the component.', challenge: 'Create a counter state.', snippet: `const [count, setCount] = useState(0);` },
      { title: 'Effect (useEffect)', theory: 'UseEffect handles side effects like data fetching, manual DOM changes, or setting up subscriptions.', challenge: 'Run code on mount.', snippet: `useEffect(() => {\n  console.log("Mounted!");\n}, []);` },
      { title: 'JSX Rules', theory: 'JSX looks like HTML but is JS. It requires a single parent element and uses className instead of class.', challenge: 'Return valid JSX.', snippet: `<><div>One</div><div>Two</div></>` },
      { title: 'Lists & Keys', theory: 'When rendering lists, React needs a "key" prop to identify which items have changed, been added, or removed.', challenge: 'Map an array to elements.', snippet: `items.map(item => <li key={item.id}>{item.name}</li>)` },
      { title: 'Handling Events', theory: 'React events are named using camelCase (onClick) rather than lowercase (onclick).', challenge: 'Add a click handler.', snippet: `<button onClick={handleClick}>Click</button>` },
      { title: 'Conditional Rendering', theory: 'You can use JS operators like && or ternary operators (? :) to render elements based on conditions.', challenge: 'Conditionally show text.', snippet: `{isLoggedIn ? <p>Welcome</p> : <p>Login</p>}` },
      { title: 'Controlled Inputs', theory: 'In a controlled component, form data is handled by a React component state rather than the DOM.', challenge: 'Create a controlled input.', snippet: `<input value={name} onChange={e => setName(e.target.value)} />` },
      { title: 'Context API', theory: 'Context provides a way to share data (like themes or user info) across the entire app without "prop drilling".', challenge: 'Create a Context.', snippet: `const MyContext = createContext();` },
      { title: 'React Router', theory: 'Router allows you to create a multi-page feel in a Single Page Application (SPA) by syncing the UI with the URL.', challenge: 'Define a Route.', snippet: `<Route path="/about" element={<About />} />` },
      { title: 'Hooks Rules', theory: 'Hooks must only be called at the top level of a function and only inside React function components.', challenge: 'Correctly call a hook.', snippet: `// Always at the top\nconst [val, setVal] = useState("");` },
      { title: 'Custom Hooks', theory: 'Custom hooks allow you to extract component logic into reusable functions.', challenge: 'Declare a custom hook.', snippet: `function useToggle() {\n  const [s, setS] = useState(false);\n  return [s, () => setS(!s)];\n}` },
      { title: 'Refs (useRef)', theory: 'Refs provide a way to access DOM nodes or React elements directly without causing re-renders.', challenge: 'Create a ref.', snippet: `const inputRef = useRef();` },
      { title: 'Performance (memo)', theory: 'React.memo is a higher-order component that prevents a functional component from re-rendering if its props haven\'t changed.', challenge: 'Wrap a component in memo.', snippet: `export default React.memo(MyComponent);` }
    ]
  },

  SQL: {
    icon: 'fa-database',
    topics: [
      { title: 'SELECT Queries', theory: 'The SELECT statement is used to fetch data from a database. "*" selects all columns.', challenge: 'Get all users.', snippet: `SELECT * FROM users;` },
      { title: 'WHERE Clause', theory: 'WHERE filters records. It is used to extract only those records that fulfill a specified condition.', challenge: 'Find users with level > 1.', snippet: `SELECT * FROM users WHERE level > 1;` },
      { title: 'INSERT INTO', theory: 'INSERT is used to add new rows of data to a table.', challenge: 'Add a new user.', snippet: `INSERT INTO users (name, level) VALUES ('Alex', 5);` },
      { title: 'UPDATE', theory: 'UPDATE modifies existing records in a table. Warning: Always use a WHERE clause or all records will be updated!', challenge: 'Update a user name.', snippet: `UPDATE users SET name = 'Bob' WHERE id = 1;` },
      { title: 'DELETE', theory: 'DELETE removes rows from a table.', challenge: 'Delete user with id 5.', snippet: `DELETE FROM users WHERE id = 5;` },
      { title: 'ORDER BY', theory: 'ORDER BY sorts the result-set in ascending (ASC) or descending (DESC) order.', challenge: 'Sort by name.', snippet: `SELECT * FROM users ORDER BY name ASC;` },
      { title: 'JOINs (Inner)', theory: 'JOIN combines rows from two or more tables based on a related column between them.', challenge: 'Join users and orders.', snippet: `SELECT users.name, orders.id FROM users\nINNER JOIN orders ON users.id = orders.user_id;` },
      { title: 'Aggregate Functions', theory: 'Functions like COUNT(), MAX(), MIN(), SUM(), and AVG() return a single value calculated from a column.', challenge: 'Count all users.', snippet: `SELECT COUNT(*) FROM users;` },
      { title: 'GROUP BY', theory: 'GROUP BY groups rows that have the same values into summary rows, often used with aggregate functions.', challenge: 'Group by level.', snippet: `SELECT level, COUNT(*) FROM users GROUP BY level;` },
      { title: 'Primary Keys', theory: 'A Primary Key is a unique identifier for each record in a table. It cannot be NULL.', challenge: 'Define a primary key.', snippet: `id INTEGER PRIMARY KEY` },
      { title: 'Foreign Keys', theory: 'A Foreign Key is a field in one table that refers to the Primary Key in another table, creating a relationship.', challenge: 'Define a foreign key.', snippet: `user_id INTEGER, FOREIGN KEY (user_id) REFERENCES users(id)` },
      { title: 'LIKE Operator', theory: 'LIKE is used in a WHERE clause to search for a specified pattern in a column (using % as a wildcard).', challenge: 'Find names starting with A.', snippet: `SELECT * FROM users WHERE name LIKE 'A%';` },
      { title: 'HAVING Clause', theory: 'The HAVING clause was added to SQL because the WHERE keyword could not be used with aggregate functions.', challenge: 'Filter groups.', snippet: `SELECT level FROM users GROUP BY level HAVING COUNT(*) > 10;` },
      { title: 'LIMIT', theory: 'LIMIT specifies the maximum number of records to return, which is useful for pagination.', challenge: 'Get first 5 users.', snippet: `SELECT * FROM users LIMIT 5;` },
      { title: 'CREATE TABLE', theory: 'CREATE TABLE defines a new table and its columns, including data types (INT, VARCHAR, etc.).', challenge: 'Create a products table.', snippet: `CREATE TABLE products (id INT, name VARCHAR(50));` }
    ]
  }
};

