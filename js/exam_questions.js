/**
 * T-LEARN PRO — Exam Question Bank
 * Pre-written questions for each course — 30 per set, multiple sets per course
 * Randomly shuffled each exam so no two exams are identical
 */

const EXAM_BANK = {

HTML: [
  {q:"What does HTML stand for?", options:["A) HyperText Markup Language","B) HighText Machine Language","C) HyperText Machine Learning","D) HyperLink Markup Language"], answer:"A"},
  {q:"Which tag defines the document type in HTML?", options:["A) <html>","B) <head>","C) <!DOCTYPE html>","D) <body>"], answer:"C"},
  {q:"Which attribute provides alternative text for an image?", options:["A) src","B) title","C) alt","D) href"], answer:"C"},
  {q:"Which tag is used for the largest heading?", options:["A) <h6>","B) <heading>","C) <head>","D) <h1>"], answer:"D"},
  {q:"What is the correct HTML for creating a hyperlink?", options:["A) <a url='http://'>Link</a>","B) <a href='http://'>Link</a>","C) <link href='http://'>Link</link>","D) <a name='http://'>Link</a>"], answer:"B"},
  {q:"Which HTML element is used for an unordered list?", options:["A) <ol>","B) <list>","C) <ul>","D) <li>"], answer:"C"},
  {q:"What attribute opens a link in a new tab?", options:["A) target='_new'","B) open='new'","C) target='_blank'","D) new='tab'"], answer:"C"},
  {q:"Which HTML tag is used to define a table row?", options:["A) <td>","B) <tr>","C) <th>","D) <table>"], answer:"B"},
  {q:"What is the correct HTML for a paragraph?", options:["A) <paragraph>Text</paragraph>","B) <p>Text</p>","C) <text>Text</text>","D) <para>Text</para>"], answer:"B"},
  {q:"Which tag defines a navigation section?", options:["A) <navigation>","B) <menu>","C) <nav>","D) <links>"], answer:"C"},
  {q:"Which input type is used for email addresses?", options:["A) input type='mail'","B) input type='email'","C) input type='text'","D) input type='address'"], answer:"B"},
  {q:"What does the 'required' attribute do on an input?", options:["A) Makes input read-only","B) Highlights the input","C) Prevents form submission if empty","D) Sets a default value"], answer:"C"},
  {q:"Which element is the most semantically correct for site navigation?", options:["A) <div class='nav'>","B) <ul>","C) <nav>","D) <header>"], answer:"C"},
  {q:"What is the purpose of the <head> element?", options:["A) Displays the page header","B) Contains metadata not shown to users","C) Holds the navigation menu","D) Wraps the body content"], answer:"B"},
  {q:"Which attribute on a form specifies where to send form data?", options:["A) method","B) href","C) src","D) action"], answer:"D"},
  {q:"What does the 'alt' attribute in <img> help with?", options:["A) SEO only","B) Image alignment","C) Accessibility and SEO","D) Image loading speed"], answer:"C"},
  {q:"Which HTML5 tag defines independent self-contained content?", options:["A) <section>","B) <article>","C) <aside>","D) <content>"], answer:"B"},
  {q:"What is the purpose of <meta charset='UTF-8'>?", options:["A) Sets the page language","B) Defines the character encoding","C) Links to a stylesheet","D) Sets the viewport size"], answer:"B"},
  {q:"Which element should wrap the main content of a page?", options:["A) <body>","B) <content>","C) <main>","D) <section>"], answer:"C"},
  {q:"What does the <figure> element represent?", options:["A) A decorative image only","B) Self-contained content like an image with caption","C) A background image","D) An icon"], answer:"B"},
  {q:"Which attribute on <video> shows player controls?", options:["A) show-controls","B) video-controls","C) controls","D) displaycontrols"], answer:"C"},
  {q:"What does <br> do in HTML?", options:["A) Creates a border","B) Inserts a line break","C) Bold text","D) Creates a new paragraph"], answer:"B"},
  {q:"Which tag is used to define a table header cell?", options:["A) <td>","B) <header>","C) <thead>","D) <th>"], answer:"D"},
  {q:"What is the purpose of the <label> element in forms?", options:["A) Styles the input","B) Makes input required","C) Associates text with a form control for accessibility","D) Submits the form"], answer:"C"},
  {q:"Which HTML attribute uniquely identifies an element?", options:["A) class","B) name","C) id","D) key"], answer:"C"},
  {q:"What does 'semantic HTML' mean?", options:["A) HTML with inline styles","B) HTML that uses tags conveying meaning about their content","C) HTML without CSS","D) HTML with JavaScript"], answer:"B"},
  {q:"Which element defines the footer of a document?", options:["A) <bottom>","B) <end>","C) <footer>","D) <section>"], answer:"C"},
  {q:"What is the correct way to comment in HTML?", options:["A) // Comment","B) /* Comment */","C) <!-- Comment -->","D) # Comment"], answer:"C"},
  {q:"Which element is used to group table headers?", options:["A) <theader>","B) <thead>","C) <th>","D) <tgroup>"], answer:"B"},
  {q:"What does the 'placeholder' attribute do?", options:["A) Sets a default value","B) Shows hint text inside an input that disappears on focus","C) Makes input required","D) Adds a label to input"], answer:"B"},

  // Additional questions covering advanced topics
  {q:"What does the spread operator (...) do when used with objects?", options:["A) Deletes object properties","B) Creates a shallow copy of the object","C) Merges arrays into objects","D) Converts object to array"], answer:"B"},
  {q:"What is the purpose of async/await?", options:["A) Create synchronous code","B) Write asynchronous code that reads like synchronous code","C) Speed up loops","D) Handle CSS animations"], answer:"B"},
  {q:"Which method converts an object's entries to an array of [key, value] pairs?", options:["A) Object.keys()","B) Object.values()","C) Object.entries()","D) Object.pairs()"], answer:"C"},
  {q:"What does 'use strict' enable?", options:["A) Faster code execution","B) Stricter parsing that catches common mistakes","C) TypeScript features","D) ES6 only syntax"], answer:"B"},
  {q:"What is a JavaScript module?", options:["A) A function that returns an object","B) A file with exported functions/variables usable by other files","C) A built-in browser API","D) A type of loop"], answer:"B"},
  {q:"What does debounce do?", options:["A) Increases function speed","B) Delays function execution until after a wait period","C) Caches function results","D) Prevents async functions"], answer:"B"},
],

CSS: [
  {q:"What does CSS stand for?", options:["A) Computer Style Sheets","B) Creative Style Sheets","C) Cascading Style Sheets","D) Colorful Style Sheets"], answer:"C"},
  {q:"Which CSS property changes text colour?", options:["A) text-color","B) font-color","C) color","D) foreground"], answer:"C"},
  {q:"How do you select an element with id 'header' in CSS?", options:["A) .header","B) *header","C) header","D) #header"], answer:"D"},
  {q:"How do you select elements with class 'menu'?", options:["A) #menu","B) .menu","C) *menu","D) menu"], answer:"B"},
  {q:"Which property controls the space between the element border and content?", options:["A) margin","B) spacing","C) border","D) padding"], answer:"D"},
  {q:"Which property sets the space outside the border?", options:["A) padding","B) margin","C) border","D) outline"], answer:"B"},
  {q:"What value of display makes elements sit side by side without being fully inline?", options:["A) inline","B) block","C) inline-block","D) flex"], answer:"C"},
  {q:"Which CSS property makes a flexible box layout?", options:["A) display: grid","B) display: flex","C) display: inline","D) display: layout"], answer:"B"},
  {q:"How do you centre a div horizontally with flexbox?", options:["A) align-items: center","B) text-align: center","C) justify-content: center","D) margin: auto"], answer:"C"},
  {q:"Which property rounds the corners of an element?", options:["A) corner-radius","B) border-radius","C) round-border","D) curve"], answer:"B"},
  {q:"What does 'box-sizing: border-box' do?", options:["A) Adds borders to all elements","B) Includes padding and border in the element width","C) Removes margins","D) Creates a box around text"], answer:"B"},
  {q:"Which unit is relative to the root font size?", options:["A) em","B) px","C) %","D) rem"], answer:"D"},
  {q:"How do you apply a style on hover?", options:["A) .element:hover","B) .element.hover","C) .element[hover]","D) hover(.element)"], answer:"A"},
  {q:"Which property controls how a background image repeats?", options:["A) background-position","B) background-size","C) background-repeat","D) background-image"], answer:"C"},
  {q:"What does 'position: absolute' do?", options:["A) Fixes element to viewport","B) Positions element relative to nearest positioned ancestor","C) Removes element from page","D) Centres element"], answer:"B"},
  {q:"Which property creates a CSS animation?", options:["A) transition","B) transform","C) animation","D) keyframe"], answer:"C"},
  {q:"What does 'z-index' control?", options:["A) Element transparency","B) Stacking order of positioned elements","C) Element zoom level","D) Font size"], answer:"B"},
  {q:"Which CSS property makes text bold?", options:["A) text-weight","B) font-style","C) text-style","D) font-weight"], answer:"D"},
  {q:"What does 'overflow: hidden' do?", options:["A) Hides the element","B) Clips content that overflows the element box","C) Removes scrollbars","D) Makes element invisible"], answer:"B"},
  {q:"Which selector targets the first child of an element?", options:["A) :first","B) :first-element","C) :first-child","D) :nth(1)"], answer:"C"},
  {q:"What is the CSS cascade?", options:["A) A waterfall animation effect","B) The algorithm for applying styles based on specificity and order","C) A way to add multiple backgrounds","D) A grid layout technique"], answer:"B"},
  {q:"Which property controls the opacity of an element?", options:["A) visibility","B) transparent","C) opacity","D) alpha"], answer:"C"},
  {q:"What does 'flex: 1' mean on a flex item?", options:["A) Fixed width of 1px","B) Item should not grow","C) Item should grow to fill available space","D) Item takes 1% of container"], answer:"C"},
  {q:"Which CSS property creates a two-dimensional layout?", options:["A) display: flex","B) display: grid","C) display: table","D) display: layout"], answer:"B"},
  {q:"How do you make text italic in CSS?", options:["A) font-weight: italic","B) text-style: italic","C) font-variant: italic","D) font-style: italic"], answer:"D"},
  {q:"What does 'position: fixed' do?", options:["A) Fixes element relative to parent","B) Makes element un-moveable","C) Positions element relative to the viewport","D) Centres element on page"], answer:"C"},
  {q:"Which property adds a shadow to an element?", options:["A) text-shadow","B) element-shadow","C) box-shadow","D) shadow"], answer:"C"},
  {q:"What is a CSS pseudo-element?", options:["A) A fake HTML element","B) A selector for elements not in HTML like ::before","C) An element created by JavaScript","D) A hidden element"], answer:"B"},
  {q:"Which property controls the space between grid items?", options:["A) margin","B) spacing","C) gap","D) grid-gap only"], answer:"C"},
  {q:"What does 'transform: translateY(-10px)' do?", options:["A) Moves element 10px down","B) Rotates element 10 degrees","C) Moves element 10px up","D) Scales element by 10%"], answer:"C"},
],

JavaScript: [
  {q:"Which keyword declares a block-scoped variable that can be reassigned?", options:["A) var","B) const","C) let","D) set"], answer:"C"},
  {q:"What does '===' check?", options:["A) Value only","B) Type only","C) Value and type (strict equality)","D) Reference equality"], answer:"C"},
  {q:"Which method adds an element to the end of an array?", options:["A) push()","B) append()","C) add()","D) insert()"], answer:"A"},
  {q:"What does 'typeof null' return?", options:["A) 'null'","B) 'undefined'","C) 'object'","D) 'none'"], answer:"C"},
  {q:"What is the output of: console.log(2 + '2')?", options:["A) 4","B) '22'","C) NaN","D) Error"], answer:"B"},
  {q:"Which method creates a new array by transforming each element?", options:["A) filter()","B) reduce()","C) forEach()","D) map()"], answer:"D"},
  {q:"What does 'async/await' simplify?", options:["A) Loops","B) Working with Promises","C) DOM manipulation","D) Variable declarations"], answer:"B"},
  {q:"Which method selects the first matching CSS selector in the DOM?", options:["A) getElementById()","B) querySelector()","C) getElement()","D) findElement()"], answer:"B"},
  {q:"What does event.preventDefault() do?", options:["A) Stops event bubbling","B) Removes event listener","C) Prevents the default browser action","D) Logs the event"], answer:"C"},
  {q:"What is a closure in JavaScript?", options:["A) A way to close a browser window","B) A function with access to its outer scope variables after that scope closes","C) A method to end a loop","D) A way to hide variables"], answer:"B"},
  {q:"Which operator checks if a property exists in an object?", options:["A) instanceof","B) typeof","C) in","D) exists"], answer:"C"},
  {q:"What does JSON.parse() do?", options:["A) Converts object to JSON string","B) Converts JSON string to JavaScript object","C) Validates JSON","D) Formats JSON"], answer:"B"},
  {q:"What does the spread operator (...) do with arrays?", options:["A) Deletes elements","B) Sorts the array","C) Expands array elements into individual values","D) Creates a copy with push"], answer:"C"},
  {q:"Which array method returns the first element matching a condition?", options:["A) filter()","B) findIndex()","C) find()","D) search()"], answer:"C"},
  {q:"What is the correct way to create an arrow function?", options:["A) function => (x) { return x }","B) const fn = (x) => x","C) (x) function => x","D) arrow fn(x) = x"], answer:"B"},
  {q:"What does localStorage.setItem() require as arguments?", options:["A) A single object","B) An array of values","C) A key and a value (both strings)","D) A function and a value"], answer:"C"},
  {q:"Which method removes the last element from an array and returns it?", options:["A) remove()","B) shift()","C) splice()","D) pop()"], answer:"D"},
  {q:"What is the purpose of try/catch?", options:["A) To loop through errors","B) To handle exceptions without crashing","C) To validate data types","D) To catch events"], answer:"B"},
  {q:"How do you check if a value is an array?", options:["A) typeof value === 'array'","B) value instanceof Array","C) Array.isArray(value)","D) value.isArray()"], answer:"C"},
  {q:"What does 'use strict' do?", options:["A) Makes code run faster","B) Enables strict mode which catches common mistakes","C) Locks variables from changing","D) Disables certain ES6 features"], answer:"B"},
  {q:"Which method converts an array to a string with a separator?", options:["A) toString()","B) concat()","C) join()","D) split()"], answer:"C"},
  {q:"What does the nullish coalescing operator (??) return?", options:["A) Right side if left is falsy","B) Right side if left is null or undefined","C) Left side always","D) The truthy value"], answer:"B"},
  {q:"What is event delegation?", options:["A) Passing events to the server","B) Attaching one listener to a parent to handle children's events","C) Preventing event bubbling","D) Creating custom events"], answer:"B"},
  {q:"Which statement is true about const?", options:["A) Cannot be declared without a value","B) Can be reassigned","C) Is function scoped","D) Is hoisted as undefined"], answer:"A"},
  {q:"What does Promise.all() do?", options:["A) Runs promises sequentially","B) Returns the first resolved promise","C) Runs all promises in parallel and waits for all","D) Cancels all pending promises"], answer:"C"},
  {q:"How do you destructure an object property?", options:["A) const [name] = user","B) const {name} = user","C) const name = user[]","D) extract(user.name)"], answer:"B"},
  {q:"Which HTTP method is used to send data to create a resource?", options:["A) GET","B) PUT","C) DELETE","D) POST"], answer:"D"},
  {q:"What does classList.toggle() do?", options:["A) Removes all classes","B) Adds a class if absent, removes if present","C) Lists all classes","D) Replaces a class"], answer:"B"},
  {q:"Which array method returns a new filtered array?", options:["A) forEach()","B) reduce()","C) filter()","D) find()"], answer:"C"},
  {q:"What is the output of: Boolean('')?", options:["A) true","B) undefined","C) null","D) false"], answer:"D"},
],

Python: [
  {q:"Which keyword defines a function in Python?", options:["A) function","B) def","C) func","D) define"], answer:"B"},
  {q:"How do you print to the console in Python?", options:["A) console.log()","B) echo()","C) print()","D) log()"], answer:"C"},
  {q:"What is the output of: type(3.14)?", options:["A) <class 'number'>","B) <class 'double'>","C) <class 'float'>","D) <class 'decimal'>"], answer:"C"},
  {q:"Which symbol is used for comments in Python?", options:["A) //","B) /*","C) --","D) #"], answer:"D"},
  {q:"What does len() return?", options:["A) The last element","B) The type of object","C) The number of items in a sequence","D) The memory size"], answer:"C"},
  {q:"Which operator checks membership in a list?", options:["A) contains","B) in","C) has","D) includes"], answer:"B"},
  {q:"What is the correct way to create a list in Python?", options:["A) list = (1, 2, 3)","B) list = {1, 2, 3}","C) list = [1, 2, 3]","D) list = <1, 2, 3>"], answer:"C"},
  {q:"What does range(5) produce?", options:["A) [1, 2, 3, 4, 5]","B) Numbers 0 through 4","C) Numbers 1 through 5","D) [0, 5]"], answer:"B"},
  {q:"Which data structure uses key-value pairs?", options:["A) List","B) Tuple","C) Set","D) Dictionary"], answer:"D"},
  {q:"How do you access the first element of a list 'items'?", options:["A) items.first","B) items(0)","C) items[0]","D) items[1]"], answer:"C"},
  {q:"What does 'None' represent in Python?", options:["A) Zero","B) False","C) The absence of a value","D) An empty string"], answer:"C"},
  {q:"Which method adds an item to the end of a list?", options:["A) add()","B) insert()","C) push()","D) append()"], answer:"D"},
  {q:"What is an f-string?", options:["A) A string with only numbers","B) A formatted string literal that embeds expressions","C) A function that returns a string","D) A string file type"], answer:"B"},
  {q:"What does the 'with' statement do with files?", options:["A) Opens multiple files simultaneously","B) Reads file content automatically","C) Ensures the file is closed even if an error occurs","D) Locks the file for writing"], answer:"C"},
  {q:"Which Python data structure is immutable (cannot be changed)?", options:["A) List","B) Dictionary","C) Set","D) Tuple"], answer:"D"},
  {q:"What does try/except do?", options:["A) Tests variables","B) Handles exceptions to prevent crashes","C) Validates data types","D) Catches undefined variables only"], answer:"B"},
  {q:"How do you iterate over a dictionary's key-value pairs?", options:["A) for item in dict","B) for key, value in dict.items()","C) for key in dict.keys() and value in dict.values()","D) dict.iterate()"], answer:"B"},
  {q:"What is a list comprehension?", options:["A) A way to combine two lists","B) A compact syntax to create lists from iterables","C) A method to sort a list","D) A way to copy a list"], answer:"B"},
  {q:"What does 'self' refer to in a class method?", options:["A) The class itself","B) The parent class","C) The current instance of the class","D) A static variable"], answer:"C"},
  {q:"Which statement is used to exit a loop early?", options:["A) exit","B) return","C) stop","D) break"], answer:"D"},
  {q:"What is the output of: 'hello'.upper()?", options:["A) Hello","B) HELLO","C) hello","D) HeLLo"], answer:"B"},
  {q:"What does 'import random' do?", options:["A) Creates a random variable","B) Loads the random module from the standard library","C) Generates a random file","D) Imports from a random location"], answer:"B"},
  {q:"Which keyword creates a class in Python?", options:["A) object","B) struct","C) class","D) type"], answer:"C"},
  {q:"What does the 'return' statement do?", options:["A) Exits the program","B) Prints a value","C) Sends a value back to the caller","D) Loops back to start"], answer:"C"},
  {q:"Which method removes whitespace from both ends of a string?", options:["A) clean()","B) remove()","C) strip()","D) trim()"], answer:"C"},
  {q:"What is inheritance in OOP?", options:["A) A variable that never changes","B) A child class reusing and extending a parent class","C) A copy of a function","D) A type of loop"], answer:"B"},
  {q:"How do you handle multiple exceptions in one except block?", options:["A) except Error1, Error2:","B) except (Error1, Error2):","C) except Error1 | Error2:","D) except [Error1, Error2]:"], answer:"B"},
  {q:"What does 'pip install requests' do?", options:["A) Updates Python","B) Installs the requests library from PyPI","C) Creates a new project","D) Sends an HTTP request"], answer:"B"},
  {q:"What is the __init__ method?", options:["A) A static method","B) A method that runs when a class instance is created","C) A method that destroys an object","D) The main entry point of a script"], answer:"B"},
  {q:"What does sorted() return compared to list.sort()?", options:["A) They are identical","B) sorted() returns a new sorted list; sort() modifies in place","C) sorted() modifies in place; sort() returns new list","D) sorted() only works on strings"], answer:"B"},

  // Additional questions
  {q:"What is a decorator in Python?", options:["A) A way to style code","B) A function that wraps another function to add behaviour","C) A type of class","D) A module import style"], answer:"B"},
  {q:"What does 'yield' do in a Python function?", options:["A) Returns a value and exits the function","B) Pauses and produces a value, making the function a generator","C) Raises an exception","D) Imports a module"], answer:"B"},
  {q:"What is a virtual environment in Python?", options:["A) A simulation of Python code","B) An isolated environment with its own packages","C) A Python IDE","D) A testing framework"], answer:"B"},
  {q:"What does @pytest.fixture do?", options:["A) Marks a test to skip","B) Provides reusable test data or setup","C) Runs a test multiple times","D) Times the test execution"], answer:"B"},
  {q:"What does @contextmanager from contextlib enable?", options:["A) Automatic memory management","B) Creating context managers using generator functions","C) Class inheritance","D) Async context managers"], answer:"B"},
]

};

/**
 * Get 30 random questions for a course
 * Shuffled differently each exam so no two exams are identical
 */
function getExamQuestions(course) {
    const bank = EXAM_BANK[course] || EXAM_BANK['HTML'];
    // Shuffle using Fisher-Yates
    const shuffled = [...bank];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    // Return up to 30 questions
    return shuffled.slice(0, Math.min(30, shuffled.length));
}

window.EXAM_BANK = EXAM_BANK;
window.getExamQuestions = getExamQuestions;
