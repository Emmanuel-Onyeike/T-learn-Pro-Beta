/**
 * T LEARN PRO — Full Curriculum
 * HTML · CSS · JavaScript · Python — Beginner → Intermediate
 */

const curriculumData = {

  HTML: {
    icon: 'fa-html5',
    topics: [
      // ── Fundamentals ─────────────────────────────────────────────────────
      { title: 'What is HTML', theory: 'HTML (HyperText Markup Language) is the skeleton of every webpage. It defines the structure and meaning of content using elements made of opening tags, content, and closing tags. Browsers read HTML and render it as a visual page.', challenge: 'Create a file called index.html and write a valid HTML page with a title and one paragraph.', snippet: `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8">\n    <title>My First Page</title>\n  </head>\n  <body>\n    <p>Hello, world!</p>\n  </body>\n</html>` },

      { title: 'How the Web Works', theory: 'When you type a URL, your browser sends an HTTP request to a server. The server responds with HTML, CSS, and JS files. The browser parses HTML first, then fetches CSS and JS, and renders the page. DNS translates domain names to IP addresses.', challenge: 'Draw or describe the journey of a request from browser to server and back.', snippet: `Browser → DNS lookup → IP address\nBrowser → HTTP GET request → Server\nServer  → HTML + CSS + JS → Browser\nBrowser → Parses + Renders → Visible page` },

      { title: 'HTML Document Structure', theory: 'Every HTML document has a required structure: DOCTYPE declaration, html root, head section (metadata), and body (visible content). The head contains title, meta tags, and links to CSS/JS. The body contains everything the user sees.', challenge: 'Write a complete HTML document structure from memory without looking at an example.', snippet: `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="description" content="Page description">\n    <title>Page Title</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body>\n    <!-- All visible content goes here -->\n    <script src="app.js"></script>\n  </body>\n</html>` },

      { title: 'Elements, Tags & Attributes', theory: 'HTML elements consist of opening and closing tags with content between them. Void elements like img and input are self-closing. Attributes provide extra info inside the opening tag — for example id, class, src, href, alt, and type.', challenge: 'Create a div with an id, a class, a custom data attribute, and a nested paragraph.', snippet: `<!-- Regular element -->\n<p class="intro" id="first-para">Hello</p>\n\n<!-- Void element (self-closing) -->\n<img src="photo.jpg" alt="Description" width="400">\n<input type="text" placeholder="Enter name" required>\n\n<!-- Custom data attribute -->\n<div data-user-id="123" data-role="admin">Content</div>` },

      { title: 'Headings, Paragraphs & Formatting', theory: 'Headings h1–h6 define a hierarchy. h1 is the main title (use once per page). Paragraphs use p tags. Inline formatting: strong (bold, important), em (italic, emphasis), mark (highlight), small, del (strikethrough), ins (inserted text).', challenge: 'Create a blog post structure with an h1 title, two h2 sections, paragraphs, and some bold/italic words.', snippet: `<h1>The Main Title</h1>\n<h2>Section One</h2>\n<p>This is a paragraph with <strong>important text</strong> and <em>emphasised text</em>.</p>\n\n<h2>Section Two</h2>\n<p>Price was <del>₦5,000</del> now <ins>₦3,500</ins>.</p>\n<p><mark>Highlighted</mark> and <small>small text</small>.</p>` },

      // ── Text & Content ────────────────────────────────────────────────────
      { title: 'Lists', theory: 'HTML has three list types. Unordered lists (ul) show bullet points. Ordered lists (ol) show numbers. Description lists (dl) pair terms (dt) with definitions (dd). Lists can be nested inside each other.', challenge: 'Build a recipe with an unordered ingredient list and an ordered steps list.', snippet: `<!-- Unordered -->\n<ul>\n  <li>Apples</li>\n  <li>Bananas</li>\n  <li>Mangoes</li>\n</ul>\n\n<!-- Ordered -->\n<ol>\n  <li>Preheat oven to 180°C</li>\n  <li>Mix ingredients</li>\n  <li>Bake for 25 minutes</li>\n</ol>\n\n<!-- Description -->\n<dl>\n  <dt>HTML</dt>\n  <dd>Structure of the web</dd>\n  <dt>CSS</dt>\n  <dd>Styling of the web</dd>\n</dl>` },

      { title: 'Links & Anchor Tags', theory: 'The a tag creates hyperlinks. href specifies the destination. target="_blank" opens in a new tab (add rel="noopener" for security). Use # for same-page anchor links. mailto: links open email clients. Tel: links dial phone numbers.', challenge: 'Create a navigation menu with 3 links — one external (new tab), one internal anchor, one email.', snippet: `<!-- External link -->\n<a href="https://google.com" target="_blank" rel="noopener">Google</a>\n\n<!-- Internal anchor -->\n<a href="#contact">Go to Contact Section</a>\n<section id="contact">Contact Us</section>\n\n<!-- Email & phone -->\n<a href="mailto:hello@tlearn.pro">Email Us</a>\n<a href="tel:+2341234567">Call Us</a>` },

      { title: 'Images', theory: 'The img tag embeds images. src points to the file. alt text is mandatory — it describes the image for screen readers and shows when image fails to load. Use width/height to reserve space. Use loading="lazy" for performance.', challenge: 'Add 3 images with proper alt text, one using lazy loading, one with a figure and caption.', snippet: `<!-- Basic image -->\n<img src="profile.jpg" alt="Profile photo of Alice" width="200" height="200">\n\n<!-- Lazy loaded -->\n<img src="banner.jpg" alt="Course banner" loading="lazy">\n\n<!-- With caption -->\n<figure>\n  <img src="diagram.png" alt="System architecture diagram">\n  <figcaption>Figure 1: How the system works</figcaption>\n</figure>` },

      { title: 'Audio & Video', theory: 'HTML5 supports native audio and video. Always add the controls attribute so users can play/pause. Provide multiple source formats for browser compatibility. The track element adds subtitles. poster sets a thumbnail for video.', challenge: 'Embed a video with controls, a poster image, and a subtitle track.', snippet: `<!-- Audio -->\n<audio controls>\n  <source src="song.mp3" type="audio/mpeg">\n  <source src="song.ogg" type="audio/ogg">\n  Your browser does not support audio.\n</audio>\n\n<!-- Video -->\n<video controls width="640" poster="thumbnail.jpg">\n  <source src="video.mp4" type="video/mp4">\n  <track src="subs.vtt" kind="subtitles" srclang="en" label="English">\n  Your browser does not support video.\n</video>` },

      // ── Layout & Structure ────────────────────────────────────────────────
      { title: 'Div and Span', theory: 'div is a block-level container — it takes the full width and starts on a new line. span is an inline container — it sits within text flow. Neither has semantic meaning; they are purely for grouping and styling. Use semantic tags when possible.', challenge: 'Create a card using a div with a span for a coloured status badge inside a paragraph.', snippet: `<!-- div: block container -->\n<div class="card">\n  <div class="card-header">\n    <h3>Course Title</h3>\n    <span class="badge">New</span>\n  </div>\n  <p>This course covers <span class="highlight">advanced</span> topics.</p>\n</div>` },

      { title: 'Semantic HTML', theory: 'Semantic elements describe their meaning. header contains intro/navigation. nav holds navigation links. main is the primary content (one per page). section groups related content. article is standalone content. aside is supplementary content. footer holds closing info.', challenge: 'Rebuild a basic webpage layout using ONLY semantic elements — no divs.', snippet: `<body>\n  <header>\n    <nav>\n      <a href="/">Home</a>\n      <a href="/courses">Courses</a>\n    </nav>\n  </header>\n\n  <main>\n    <section id="hero">\n      <h1>Learn to Code</h1>\n    </section>\n\n    <section id="courses">\n      <article class="course-card">\n        <h2>HTML Fundamentals</h2>\n        <p>Start here.</p>\n      </article>\n    </section>\n  </main>\n\n  <aside>Related links</aside>\n  <footer><p>© 2026 T-Learn Pro</p></footer>\n</body>` },

      { title: 'HTML5 Structure Best Practices', theory: 'Always declare DOCTYPE. Use lang attribute on html. Set charset to UTF-8. Use the viewport meta tag for mobile. Place CSS links in head, JS scripts before closing body tag (or use defer). Use one h1 per page. Keep nesting logical and clean.', challenge: 'Audit any HTML file and fix all structural issues using best practices.', snippet: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <meta name="description" content="SEO description under 160 chars">\n  <title>Specific Page Title | Brand</title>\n  <link rel="stylesheet" href="style.css"> <!-- CSS in head -->\n</head>\n<body>\n  <h1>One h1 per page</h1> <!-- Not used in nav/footer -->\n  <script src="app.js" defer></script> <!-- JS at bottom -->\n</body>\n</html>` },

      // ── Tables & Forms ────────────────────────────────────────────────────
      { title: 'Tables', theory: 'Tables are for tabular data only — never for layout. thead groups header rows, tbody groups data rows, tfoot groups footer rows. th (table header) vs td (table data). colspan and rowspan merge cells. caption adds an accessible table title.', challenge: 'Create a student results table with headers, 3 rows of data, and a caption.', snippet: `<table>\n  <caption>Student Results — Term 1</caption>\n  <thead>\n    <tr>\n      <th scope="col">Name</th>\n      <th scope="col">Score</th>\n      <th scope="col">Grade</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr><td>Alice</td><td>92</td><td>A</td></tr>\n    <tr><td>Bob</td><td>78</td><td>B</td></tr>\n    <tr><td>Charlie</td><td>65</td><td>C</td></tr>\n  </tbody>\n  <tfoot>\n    <tr><td colspan="2">Class Average</td><td>78%</td></tr>\n  </tfoot>\n</table>` },

      { title: 'Forms Basics', theory: 'Forms collect user input and send it to a server. The action attribute is the URL to send data to. Method is GET (data in URL, for searches) or POST (data in body, for sensitive info). The label element links to its input via for/id pairing, crucial for accessibility.', challenge: 'Build a complete signup form with name, email, password fields and a submit button.', snippet: `<form action="/signup" method="POST" novalidate>\n  <div class="field">\n    <label for="name">Full Name</label>\n    <input type="text" id="name" name="name" placeholder="Alice Johnson">\n  </div>\n  <div class="field">\n    <label for="email">Email</label>\n    <input type="email" id="email" name="email" placeholder="alice@example.com">\n  </div>\n  <div class="field">\n    <label for="pass">Password</label>\n    <input type="password" id="pass" name="password">\n  </div>\n  <button type="submit">Create Account</button>\n</form>` },

      { title: 'Input Types', theory: 'HTML5 provides many input types that give browser hints for validation and mobile keyboards. text, email, password, number, date, time, tel, url, search, range, color, checkbox, radio, file. Each triggers different mobile keyboards and built-in validation.', challenge: 'Create a user profile form using at least 8 different input types.', snippet: `<input type="text"     placeholder="Name">\n<input type="email"    placeholder="Email">\n<input type="password" placeholder="Password">\n<input type="number"   min="0" max="120" placeholder="Age">\n<input type="date">\n<input type="tel"      placeholder="+234...">\n<input type="url"      placeholder="https://">\n<input type="range"    min="0" max="100">\n<input type="color"    value="#2563eb">\n<input type="file"     accept="image/*">\n\n<!-- Radio buttons -->\n<input type="radio" name="level" id="beginner" value="beginner">\n<label for="beginner">Beginner</label>\n\n<!-- Checkbox -->\n<input type="checkbox" id="terms" name="terms">\n<label for="terms">I agree to terms</label>` },

      { title: 'Labels & Buttons', theory: 'Always associate labels with inputs using for/id or by wrapping. Unlabelled inputs are inaccessible. Button types: submit (default, submits form), button (no default action, use with JS), reset (clears form — rarely useful). Use button not input type="submit" for more styling control.', challenge: 'Create a form where every input has an associated label and test keyboard navigation through it.', snippet: `<!-- Explicit association -->\n<label for="username">Username</label>\n<input type="text" id="username" name="username">\n\n<!-- Implicit association (wrapping) -->\n<label>\n  Email Address\n  <input type="email" name="email">\n</label>\n\n<!-- Button types -->\n<button type="submit">Submit Form</button>\n<button type="button" onclick="doSomething()">Click Me</button>\n<button type="reset">Clear Form</button>` },

      { title: 'Form Validation', theory: 'HTML5 built-in validation: required (cannot be empty), minlength/maxlength (text length), min/max (number range), pattern (regex), type validation (email format, url format). The :valid and :invalid CSS pseudo-classes style valid/invalid fields. Use novalidate on form to handle validation in JS instead.', challenge: 'Build a registration form with required fields, email validation, password minlength, and a pattern for username.', snippet: `<form>\n  <!-- Required -->\n  <input type="text" name="name" required>\n\n  <!-- Email format -->\n  <input type="email" name="email" required>\n\n  <!-- Length -->\n  <input type="password" minlength="8" maxlength="50" required>\n\n  <!-- Pattern: letters + numbers only -->\n  <input type="text" name="username"\n    pattern="[a-zA-Z0-9]+" \n    title="Letters and numbers only"\n    minlength="3" maxlength="20" required>\n\n  <!-- Number range -->\n  <input type="number" min="18" max="99" name="age">\n\n  <button type="submit">Register</button>\n</form>` },

      // ── Advanced HTML ─────────────────────────────────────────────────────
      { title: 'Meta Tags & SEO Basics', theory: 'Meta tags in head provide page metadata. description helps SEO (keep under 160 chars). viewport controls mobile rendering. Open Graph (og:) tags control social media link previews. Twitter card tags control Twitter previews. Canonical tag prevents duplicate content penalties.', challenge: 'Add a complete set of meta tags to a page including OG tags for social sharing.', snippet: `<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <meta name="description" content="Learn HTML from beginner to pro in one course.">\n  <meta name="robots" content="index, follow">\n\n  <!-- Open Graph (Facebook, LinkedIn, WhatsApp) -->\n  <meta property="og:title" content="T-Learn Pro HTML Course">\n  <meta property="og:description" content="Master HTML step by step.">\n  <meta property="og:image" content="https://tlearn.pro/og-image.jpg">\n  <meta property="og:url" content="https://tlearn.pro/html">\n  <meta property="og:type" content="website">\n\n  <!-- Twitter -->\n  <meta name="twitter:card" content="summary_large_image">\n  <meta name="twitter:title" content="T-Learn Pro">\n\n  <!-- Canonical -->\n  <link rel="canonical" href="https://tlearn.pro/html">\n</head>` },

      { title: 'Accessibility & ARIA Roles', theory: 'Accessibility makes web content usable by people with disabilities. Use semantic HTML first — it is inherently accessible. ARIA (Accessible Rich Internet Applications) fills gaps: role describes element purpose, aria-label provides text descriptions, aria-hidden hides decorative elements from screen readers, aria-live announces dynamic content changes.', challenge: 'Build an accessible modal dialog with proper ARIA attributes, focus management, and keyboard escape handling.', snippet: `<!-- Accessible navigation -->\n<nav aria-label="Main navigation">\n  <ul role="list">\n    <li><a href="/" aria-current="page">Home</a></li>\n    <li><a href="/courses">Courses</a></li>\n  </ul>\n</nav>\n\n<!-- Accessible button with description -->\n<button aria-label="Close menu" aria-expanded="false" id="menu-btn">\n  <i class="fas fa-times" aria-hidden="true"></i>\n</button>\n\n<!-- Live region for dynamic content -->\n<div aria-live="polite" aria-atomic="true" id="status-msg">\n  <!-- Updated by JS: "Profile saved!" -->\n</div>\n\n<!-- Skip link for keyboard users -->\n<a href="#main-content" class="skip-link">Skip to main content</a>` },

      { title: 'Iframes', theory: 'iframes embed external content — YouTube videos, Google Maps, other websites. Always set title for accessibility. Use sandbox to restrict permissions. loading="lazy" defers off-screen iframes. Be cautious: iframes can be security risks. Use allow attribute to control feature permissions.', challenge: 'Embed a YouTube video and a Google Map using iframes with proper accessibility attributes.', snippet: `<!-- YouTube embed -->\n<iframe\n  src="https://www.youtube.com/embed/VIDEO_ID"\n  title="HTML Tutorial for Beginners"\n  width="560"\n  height="315"\n  loading="lazy"\n  allow="accelerometer; autoplay; encrypted-media"\n  allowfullscreen>\n</iframe>\n\n<!-- Sandboxed iframe -->\n<iframe\n  src="https://example.com"\n  title="External content"\n  sandbox="allow-scripts allow-same-origin"\n  width="100%"\n  height="400">\n</iframe>` },

      { title: 'Embedding Content', theory: 'Beyond iframes, HTML can embed various content types. object and embed for plugins (legacy). picture and srcset for responsive images. canvas for 2D/3D graphics. svg inline for scalable icons. template for reusable HTML fragments. slot for web components.', challenge: 'Create a responsive image with srcset that serves different sizes for mobile and desktop.', snippet: `<!-- Responsive images -->\n<picture>\n  <source media="(min-width: 1024px)" srcset="hero-large.jpg">\n  <source media="(min-width: 768px)" srcset="hero-medium.jpg">\n  <img src="hero-small.jpg" alt="Hero image" loading="lazy">\n</picture>\n\n<!-- Or with srcset on img -->\n<img\n  src="image-400.jpg"\n  srcset="image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w"\n  sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"\n  alt="Responsive image">\n\n<!-- Inline SVG icon -->\n<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">\n  <path d="M12 2L2 7l10 5 10-5-10-5z"/>\n</svg>` },
    ]
  },

  CSS: {
    icon: 'fa-css3-alt',
    topics: [
      // ── Fundamentals ─────────────────────────────────────────────────────
      { title: 'What is CSS', theory: 'CSS (Cascading Style Sheets) controls the visual presentation of HTML. It separates content from design. "Cascading" means styles can come from multiple sources and are applied in priority order: browser defaults → external stylesheets → internal style tags → inline styles. The most specific rule wins.', challenge: 'Add all three types of CSS (inline, internal, external) to a single page and observe which takes priority.', snippet: `<!-- 1. External CSS (recommended) -->\n<link rel="stylesheet" href="style.css">\n\n<!-- 2. Internal CSS -->\n<style>\n  body { font-family: sans-serif; }\n  .title { color: navy; }\n</style>\n\n<!-- 3. Inline CSS (highest priority, avoid for maintainability) -->\n<p style="color: red; font-size: 20px;">This overrides everything</p>` },

      { title: 'Selectors', theory: 'Selectors target HTML elements for styling. Basic: element (p), class (.card), ID (#hero). Combinators: descendant (div p), child (ul > li), adjacent sibling (h2 + p). Pseudo-classes: :hover, :focus, :first-child, :nth-child(). Pseudo-elements: ::before, ::after, ::placeholder. Specificity: IDs beat classes beat elements.', challenge: 'Write selectors for: every even table row, the first paragraph inside an article, and a button on hover.', snippet: `/* Element */\np { color: #333; }\n\n/* Class (reusable) */\n.card { padding: 20px; border-radius: 12px; }\n\n/* ID (unique) */\n#hero { min-height: 100vh; }\n\n/* Descendant */\n.card p { font-size: 14px; }\n\n/* Direct child only */\nul > li { list-style: disc; }\n\n/* Pseudo-classes */\na:hover { color: blue; }\ninput:focus { outline: 2px solid blue; }\ntr:nth-child(even) { background: #f5f5f5; }\nli:first-child { font-weight: bold; }\n\n/* Pseudo-elements */\n.card::before { content: ""; display: block; }\ninput::placeholder { color: #999; }` },

      { title: 'Colors, Units & Fonts', theory: 'CSS colors: named (red), hex (#ff0000), rgb(255,0,0), rgba(255,0,0,0.5), hsl(0,100%,50%), oklch(). Units: px (absolute), rem (relative to root, use for fonts), em (relative to parent), % (relative), vw/vh (viewport), fr (grid). Font stacks provide fallbacks. Google Fonts via link tag.', challenge: 'Create a design system with CSS variables for your color palette and use rem units throughout.', snippet: `:root {\n  /* Color palette */\n  --color-primary:   #2563eb;\n  --color-success:   hsl(142, 71%, 45%);\n  --color-warning:   oklch(80% 0.15 85);\n  --color-text:      #111827;\n  --color-muted:     rgba(0, 0, 0, 0.4);\n  \n  /* Typography scale */\n  --text-xs:   0.75rem;  /* 12px */\n  --text-sm:   0.875rem; /* 14px */\n  --text-base: 1rem;     /* 16px */\n  --text-lg:   1.125rem; /* 18px */\n  --text-xl:   1.25rem;  /* 20px */\n  --text-2xl:  1.5rem;   /* 24px */\n}\n\nbody {\n  font-family: 'Outfit', system-ui, sans-serif;\n  font-size: var(--text-base);\n  color: var(--color-text);\n}` },

      // ── Box Model ─────────────────────────────────────────────────────────
      { title: 'Margin, Border & Padding', theory: 'Every element is a box: content → padding → border → margin. Padding is space inside the border (background color shows here). Border wraps padding. Margin is space outside the border (transparent, pushes other elements away). Margin collapsing: vertical margins between adjacent elements collapse to the larger value.', challenge: 'Create a card where you can clearly see each layer of the box model using browser DevTools.', snippet: `/* Box model visualised */\n.card {\n  /* Content area */\n  width: 300px;\n  \n  /* Padding: inside the border */\n  padding: 24px;          /* all sides */\n  padding: 16px 24px;     /* vertical | horizontal */\n  padding: 8px 16px 24px 12px; /* top right bottom left */\n  \n  /* Border */\n  border: 2px solid #e5e7eb;\n  border-radius: 12px;\n  \n  /* Margin: outside the border */\n  margin: 16px;\n  margin: 0 auto; /* center horizontally */\n}\n\n/* Shorthand sides: top | right | bottom | left (TRBL = TRouBLe) */` },

      { title: 'Width, Height & Box-Sizing', theory: 'By default (content-box), width and height only apply to content. Padding and border add to the total size, making calculations confusing. With box-sizing: border-box, width includes padding and border — much more predictable. Always set this globally. min/max-width and min/max-height add constraints.', challenge: 'Create two identical-looking boxes — one using content-box and one using border-box, both exactly 300px wide.', snippet: `/* Universal border-box reset (use in every project) */\n*, *::before, *::after {\n  box-sizing: border-box;\n}\n\n.box {\n  width: 300px;          /* Total width INCLUDING padding and border */\n  padding: 20px;\n  border: 2px solid #333;\n  /* Actual content area: 300 - 40(padding) - 4(border) = 256px */\n}\n\n/* Min/max constraints */\n.responsive-box {\n  width: 100%;           /* Fill parent */\n  max-width: 600px;      /* But never wider than 600px */\n  min-height: 200px;     /* Always at least 200px tall */\n}` },

      // ── Layout ────────────────────────────────────────────────────────────
      { title: 'Display Property', theory: 'display controls the layout behaviour. block: full width, new line (div, p, h1). inline: stays in text flow, no width/height (span, a). inline-block: stays in flow but accepts dimensions (buttons, badges). none: completely removes element. contents: removes box but keeps children. table/grid/flex: specialized layouts.', challenge: 'Create a horizontal navigation using a list — override the default block display of li elements.', snippet: `/* Block (default for div, p, h1) */\n.block { display: block; width: 100%; }\n\n/* Inline (default for span, a) */\n.badge { display: inline; /* stays in text flow */ }\n\n/* Inline-block: best of both */\n.btn {\n  display: inline-block;\n  width: 120px;\n  height: 40px;\n  text-align: center;\n  line-height: 40px;\n}\n\n/* Horizontal nav list */\nnav ul { list-style: none; padding: 0; }\nnav ul li { display: inline-block; margin-right: 16px; }\n\n/* Hide completely */\n.hidden { display: none; }\n\n/* Visible but takes no space */\n.invisible { visibility: hidden; }` },

      { title: 'Position', theory: 'position controls how an element is placed. static (default): normal flow. relative: offset from its normal position, still in flow. absolute: removed from flow, positioned relative to nearest non-static ancestor. fixed: positioned relative to viewport, stays on scroll. sticky: stays in flow until it hits a threshold, then sticks.', challenge: 'Create a card with an absolute-positioned badge, a fixed header, and a sticky table header.', snippet: `/* Relative: stays in flow, offsets from original spot */\n.card {\n  position: relative; /* Makes this the anchor for absolute children */\n}\n\n/* Absolute: removed from flow, relative to .card */\n.badge {\n  position: absolute;\n  top: -8px;\n  right: -8px;\n  width: 24px; height: 24px;\n  background: red;\n  border-radius: 50%;\n}\n\n/* Fixed: always visible, relative to viewport */\n.navbar {\n  position: fixed;\n  top: 0; left: 0;\n  width: 100%;\n  z-index: 100;\n}\n\n/* Sticky: in flow until scroll, then sticks */\nth {\n  position: sticky;\n  top: 0;\n  background: white;\n}` },

      { title: 'Float & Clear', theory: 'Float was the original layout tool — still useful for text wrapping around images. float: left or right removes element from normal flow and wraps text around it. clear: left/right/both stops elements from wrapping around floated elements. The clearfix hack fixes parent collapse when all children are floated.', challenge: 'Make text wrap around a floated image on the left, then add a clearfix so the next section starts fresh.', snippet: `/* Float image with text wrap */\n.article img {\n  float: left;\n  margin: 0 20px 20px 0;\n  width: 200px;\n}\n\n/* Clear: next element won't wrap */\n.next-section {\n  clear: both;\n}\n\n/* Clearfix: fixes collapsed parent */\n.container::after {\n  content: "";\n  display: table;\n  clear: both;\n}\n\n/* Modern alternative — just use overflow:hidden on parent */\n.container {\n  overflow: hidden; /* Contains floated children */\n}` },

      // ── Flexbox ───────────────────────────────────────────────────────────
      { title: 'Flexbox Container & Items', theory: 'Flexbox is a one-dimensional layout system. Set display: flex on the parent to make it a flex container. All direct children become flex items. Flex items automatically arrange in a row by default. The main axis runs along flex-direction. The cross axis is perpendicular.', challenge: 'Create a horizontal navbar and a vertically centred hero section using flexbox.', snippet: `/* Flex container */\n.navbar {\n  display: flex;\n  align-items: center;  /* vertical center */\n  gap: 16px;            /* space between items */\n}\n\n/* Flex items stretch by default */\n.card {\n  display: flex;\n  flex-direction: column; /* stack vertically */\n}\n\n/* Flex item grows to fill space */\n.card-body {\n  flex: 1; /* grow to fill remaining space */\n}\n\n/* Centre anything */\n.hero {\n  display: flex;\n  justify-content: center; /* main axis */\n  align-items: center;     /* cross axis */\n  min-height: 100vh;\n}` },

      { title: 'Justify-Content & Align-Items', theory: 'justify-content controls distribution along the main axis: flex-start (default), flex-end, center, space-between (equal gaps between), space-around (equal gaps including edges), space-evenly. align-items controls cross-axis alignment: stretch (default), flex-start, flex-end, center, baseline.', challenge: 'Create a toolbar with icons — 3 items left-aligned and one action button right-aligned using space-between.', snippet: `/* Justify-content examples */\n.container { display: flex; }\n\n/* Items at start */\n.start   { justify-content: flex-start; }\n/* Items centred */\n.center  { justify-content: center; }\n/* Equal gaps BETWEEN items */\n.between { justify-content: space-between; }\n/* Equal gaps AROUND items */\n.around  { justify-content: space-around; }\n/* Perfectly equal spacing */\n.evenly  { justify-content: space-evenly; }\n\n/* Align-items on cross axis */\n.aligned {\n  display: flex;\n  align-items: center;   /* vertical centre */\n  min-height: 200px;\n}\n\n/* Override individual item */\n.special {\n  align-self: flex-end; /* This item aligns differently */\n}` },

      { title: 'Flex-Direction & Flex-Wrap', theory: 'flex-direction sets the main axis: row (default, left-to-right), row-reverse, column (top-to-bottom), column-reverse. flex-wrap controls overflow: nowrap (default, items shrink), wrap (items wrap to next line), wrap-reverse. flex-flow is shorthand for both. The flex shorthand is flex: grow shrink basis.', challenge: 'Build a responsive card grid that wraps items and changes direction on mobile.', snippet: `/* Direction */\n.horizontal { flex-direction: row; }     /* default */\n.vertical   { flex-direction: column; }  /* stack */\n.reversed   { flex-direction: row-reverse; }\n\n/* Wrap */\n.no-wrap  { flex-wrap: nowrap; }  /* items shrink */\n.wrapping { flex-wrap: wrap; }    /* items wrap */\n\n/* Shorthand */\n.grid-row { flex-flow: row wrap; }\n\n/* Flex item sizing */\n.item {\n  flex: 1;           /* grow:1 shrink:1 basis:0 */\n  flex: 0 0 200px;   /* fixed 200px, no grow/shrink */\n  flex: 1 1 auto;    /* grow and shrink from natural size */\n}\n\n/* Responsive: column on mobile, row on desktop */\n@media (min-width: 768px) {\n  .responsive { flex-direction: row; }\n}` },

      // ── Grid ──────────────────────────────────────────────────────────────
      { title: 'Grid Container & Columns', theory: 'CSS Grid is a two-dimensional layout system (rows AND columns simultaneously). Set display: grid on the container. grid-template-columns defines column sizes. fr is a fractional unit. repeat() shorthand avoids repetition. auto-fill/auto-fit with minmax() creates responsive grids without media queries.', challenge: 'Create a 12-column grid system and place items spanning different numbers of columns.', snippet: `/* Fixed grid */\n.grid {\n  display: grid;\n  grid-template-columns: 200px 1fr 1fr;  /* fixed | fluid | fluid */\n  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */\n  gap: 24px;\n}\n\n/* Responsive without media queries */\n.auto-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n  /* Creates as many 250px+ columns as will fit */\n  gap: 16px;\n}\n\n/* Item spanning */\n.featured {\n  grid-column: 1 / 3;  /* spans columns 1 to 3 */\n  grid-column: span 2; /* spans 2 columns from current position */\n}` },

      { title: 'Grid Rows & Grid Areas', theory: 'grid-template-rows defines row heights. grid-template-areas creates named regions — each string is a row, each word in the string is a named cell. grid-area assigns an element to a named region. Periods (.) are empty cells. This creates a visual CSS layout blueprint.', challenge: 'Create a full page layout (header, sidebar, main, footer) using grid-template-areas.', snippet: `/* Named areas layout */\n.page {\n  display: grid;\n  grid-template-columns: 250px 1fr;\n  grid-template-rows: 60px 1fr 60px;\n  grid-template-areas:\n    "header  header"\n    "sidebar main  "\n    "footer  footer";\n  min-height: 100vh;\n}\n\nheader { grid-area: header; }\naside  { grid-area: sidebar; }\nmain   { grid-area: main; }\nfooter { grid-area: footer; }\n\n/* Responsive: stack on mobile */\n@media (max-width: 768px) {\n  .page {\n    grid-template-columns: 1fr;\n    grid-template-areas:\n      "header"\n      "main"\n      "sidebar"\n      "footer";\n  }\n}` },

      // ── Responsive Design ─────────────────────────────────────────────────
      { title: 'Media Queries & Responsive Design', theory: 'Media queries apply styles based on device characteristics. Mobile-first approach: write base styles for mobile, then use min-width breakpoints to enhance for larger screens. Common breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl). Use em-based breakpoints for better accessibility.', challenge: 'Build a 4-column desktop layout that collapses to 1 column on mobile using mobile-first media queries.', snippet: `/* Mobile-first base styles */\n.grid {\n  display: grid;\n  grid-template-columns: 1fr;  /* 1 column on mobile */\n  gap: 16px;\n}\n\n/* Tablet: 2 columns */\n@media (min-width: 768px) {\n  .grid {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 20px;\n  }\n}\n\n/* Desktop: 4 columns */\n@media (min-width: 1024px) {\n  .grid {\n    grid-template-columns: repeat(4, 1fr);\n    gap: 24px;\n  }\n}\n\n/* Other media features */\n@media (prefers-color-scheme: dark) { /* dark mode */ }\n@media (prefers-reduced-motion) { /* accessibility */ }\n@media print { /* print styles */ }` },

      { title: 'Mobile-First Design & Breakpoints', theory: 'Mobile-first means designing for the smallest screen first, then progressively enhancing. It produces leaner CSS because small screens get only what they need. Base styles cover all sizes. min-width breakpoints ADD styles for larger screens — they never strip them away. The viewport meta tag is essential for mobile rendering.', challenge: 'Redesign a desktop navigation to work on mobile with a hamburger menu using only CSS.', snippet: `/* Mobile: hamburger menu */\n.nav-links {\n  display: none;  /* hidden on mobile */\n  flex-direction: column;\n}\n\n.hamburger {\n  display: block;  /* visible on mobile */\n  cursor: pointer;\n}\n\n/* Desktop: show links, hide hamburger */\n@media (min-width: 768px) {\n  .nav-links {\n    display: flex;  /* show on desktop */\n    flex-direction: row;\n    gap: 24px;\n  }\n  .hamburger { display: none; }\n}\n\n/* Fluid type — scales with viewport */\nh1 {\n  font-size: clamp(1.5rem, 4vw, 3rem);\n  /* min: 1.5rem | preferred: 4vw | max: 3rem */\n}` },

      // ── Styling & Effects ─────────────────────────────────────────────────
      { title: 'Backgrounds & Gradients', theory: 'background accepts color, image, gradient, or a combination. linear-gradient() creates directional gradients. radial-gradient() creates circular gradients. conic-gradient() creates pie-chart gradients. background-size: cover fills the area. background-position centres images. Multiple backgrounds layer on top of each other.', challenge: 'Create a hero section with a layered background: gradient overlay on top of an image.', snippet: `/* Gradient types */\n.linear    { background: linear-gradient(135deg, #667eea, #764ba2); }\n.radial    { background: radial-gradient(circle at center, #1a1a2e, #0f3460); }\n.conic     { background: conic-gradient(from 0deg, red, yellow, green, red); }\n\n/* Gradient over image */\n.hero {\n  background:\n    linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.3)),\n    url('hero.jpg') center/cover no-repeat;\n  color: white;\n}\n\n/* Background shorthand */\n.bg {\n  background-color: #1a1a2e;\n  background-image: url('pattern.svg');\n  background-size: 40px 40px;  /* or: cover, contain, auto */\n  background-repeat: repeat;   /* or: no-repeat, repeat-x */\n  background-position: center;\n}` },

      { title: 'Shadows & Borders', theory: 'box-shadow adds shadows to elements. Multiple shadows layer. text-shadow adds shadows to text. outline is like border but does not affect layout — used for focus states. border-radius rounds corners. box-shadow with inset keyword creates an inner shadow. The filter property with drop-shadow works on irregular shapes.', challenge: 'Create a card with a glowing border effect, a lifted shadow on hover, and a notification dot using box-shadow.', snippet: `/* Box shadow: x y blur spread color */\n.card {\n  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1),\n              0 2px 4px -2px rgba(0,0,0,0.1);\n}\n\n/* Lifted on hover */\n.card:hover {\n  box-shadow: 0 20px 40px -8px rgba(37,99,235,0.3);\n  transform: translateY(-4px);\n  transition: all 0.3s ease;\n}\n\n/* Glow effect */\n.glow { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }\n\n/* Inset shadow */\n.inset { box-shadow: inset 0 2px 4px rgba(0,0,0,0.2); }\n\n/* Notification dot using box-shadow */\n.avatar { position: relative; }\n.avatar::after {\n  content: "";\n  position: absolute;\n  bottom: 2px; right: 2px;\n  width: 10px; height: 10px;\n  background: #22c55e;\n  border-radius: 50%;\n  box-shadow: 0 0 0 2px white; /* border using shadow */\n}` },

      // ── Animations ────────────────────────────────────────────────────────
      { title: 'Transitions', theory: 'Transitions animate CSS property changes smoothly. Specify: property name (or all), duration, easing function (ease, linear, ease-in, ease-out, ease-in-out, cubic-bezier), and optional delay. Only transitions properties that are animatable — use transform and opacity for best performance (GPU-accelerated). Avoid animating width, height, margin.', challenge: 'Build a button with multiple transition effects: background color, box shadow, and transform on hover.', snippet: `/* Basic transition */\n.btn {\n  background: #2563eb;\n  transition: background 0.3s ease;\n}\n.btn:hover { background: #1d4ed8; }\n\n/* Multiple properties */\n.card {\n  transition:\n    transform 0.3s ease,\n    box-shadow 0.3s ease,\n    opacity 0.2s ease;\n}\n.card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 20px 40px rgba(0,0,0,0.2);\n}\n\n/* Transition all (careful — can cause performance issues) */\n.item { transition: all 0.3s ease; }\n\n/* Custom easing */\n.bounce { transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }` },

      { title: 'Keyframes & Animations', theory: '@keyframes defines animation steps. The animation property applies it — specify name, duration, easing, delay, iteration count (number or infinite), direction (normal, reverse, alternate), and fill-mode (forwards keeps end state). animation-play-state: paused stops animations. prefers-reduced-motion should disable animations for accessibility.', challenge: 'Create a loading spinner, a typing cursor blink, and a slide-in entrance animation.', snippet: `/* Loading spinner */\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}\n.spinner {\n  width: 40px; height: 40px;\n  border: 4px solid rgba(255,255,255,0.1);\n  border-top-color: #3b82f6;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}\n\n/* Slide in */\n@keyframes slideIn {\n  from { opacity: 0; transform: translateY(20px); }\n  to   { opacity: 1; transform: translateY(0); }\n}\n.card {\n  animation: slideIn 0.5s ease forwards;\n}\n/* Stagger delay for multiple cards */\n.card:nth-child(2) { animation-delay: 0.1s; }\n.card:nth-child(3) { animation-delay: 0.2s; }\n\n/* Respect user preference */\n@media (prefers-reduced-motion: reduce) {\n  * { animation: none !important; transition: none !important; }\n}` },

      { title: 'Transform', theory: 'transform applies visual transformations without affecting document flow or triggering layout. translate() moves, scale() resizes, rotate() spins, skew() slants. Multiple transforms combine in one rule. transform-origin sets the pivot point. 3D transforms: rotateX(), rotateY(), perspective(). GPU-accelerated — ideal for smooth animations.', challenge: 'Create a card flip effect on hover using 3D transforms.', snippet: `/* 2D transforms */\n.card {\n  transform: translateY(-8px);       /* move up 8px */\n  transform: scale(1.05);            /* 5% larger */\n  transform: rotate(45deg);          /* rotate 45 degrees */\n  transform: skewX(10deg);           /* skew horizontally */\n  transform: translate(20px, -10px) scale(1.1) rotate(5deg); /* combine */\n}\n\n/* 3D card flip */\n.flip-container {\n  perspective: 1000px;\n}\n.card {\n  transform-style: preserve-3d;\n  transition: transform 0.6s ease;\n}\n.card:hover { transform: rotateY(180deg); }\n\n.card-front, .card-back {\n  backface-visibility: hidden;\n}\n.card-back {\n  transform: rotateY(180deg);\n}` },
    ]
  },

  JavaScript: {
    icon: 'fa-js',
    topics: [
      { title: 'What is JavaScript', theory: 'JavaScript is the only programming language that runs natively in browsers. It adds interactivity — responding to events, updating the DOM, fetching data from servers. Node.js lets JS run on servers too. JS is single-threaded but uses an event loop for async operations. It is loosely typed, prototype-based, and multi-paradigm.', challenge: 'Open browser DevTools console and write 5 JS statements that show different capabilities.', snippet: `// Runs in browser console or <script> tag\nconsole.log("Hello from JavaScript!");\n\n// Change the page\ndocument.title = "Changed by JS!";\ndocument.body.style.background = "#1a1a2e";\n\n// Math\nconsole.log(Math.PI * 5 ** 2); // circle area\n\n// Date\nconsole.log(new Date().toLocaleDateString());\n\n// Async: fetch data from API\nfetch("https://api.github.com/users/github")\n  .then(r => r.json())\n  .then(data => console.log(data.name));` },

      { title: 'Variables: var, let & const', theory: 'var is function-scoped and hoisted — avoid it. let is block-scoped and can be reassigned. const is block-scoped and cannot be reassigned (but objects/arrays can be mutated). Use const by default. Only switch to let when you know the value will change. Never use var in modern code.', challenge: 'Rewrite code that uses var to use const/let appropriately. Identify what will throw an error.', snippet: `// const: value never changes\nconst PI = 3.14159;\nconst API_URL = "https://api.tlearn.pro";\nconst user = { name: "Alice" }; // object can be mutated\nuser.name = "Bob"; // OK — mutating the object\n// user = {}; // ERROR — reassigning const\n\n// let: value will change\nlet count = 0;\nlet isLoading = false;\ncount++; // OK\n\n// Block scope demonstration\nif (true) {\n  const blockVar = "only here";\n  let alsoBlock = "only here";\n}\n// console.log(blockVar); // ReferenceError` },

      { title: 'Data Types', theory: 'JavaScript has 8 data types. Primitives (immutable): String, Number, Boolean, null, undefined, Symbol, BigInt. Reference type: Object (includes arrays and functions). Use typeof to check type — note typeof null returns "object" (a historical bug). Use Array.isArray() for arrays.', challenge: 'Write a function that takes any value and returns its type as a human-readable string, handling the null bug.', snippet: `// Primitives\nconst str  = "Hello";          // typeof: "string"\nconst num  = 42;               // typeof: "number"\nconst big  = 9007199254740993n; // typeof: "bigint"\nconst bool = true;             // typeof: "boolean"\nconst empty = null;            // typeof: "object" (BUG!)\nlet nothing;                   // typeof: "undefined"\nconst sym  = Symbol("id");     // typeof: "symbol"\n\n// Reference type\nconst arr  = [1, 2, 3];       // typeof: "object"\nconst obj  = { a: 1 };        // typeof: "object"\nconst fn   = () => {};        // typeof: "function"\n\n// Safer type checking\nfunction getType(val) {\n  if (val === null) return "null";\n  if (Array.isArray(val)) return "array";\n  return typeof val;\n}` },

      { title: 'Operators', theory: 'Arithmetic: + - * / % (remainder) ** (exponent). Always use === (strict equality) not == (loose). Comparison: > < >= <=. Logical: && (and) || (or) ! (not) ?? (nullish coalescing). Ternary: condition ? valueIfTrue : valueIfFalse. Optional chaining: obj?.prop safely accesses nested properties. Nullish assignment: ??=, logical assignment: &&= ||=.', challenge: 'Use the ternary operator, optional chaining, and nullish coalescing to safely access nested object data.', snippet: `// Strict vs loose equality (ALWAYS use ===)\nconsole.log(0 == "0");  // true  (type coercion — BAD)\nconsole.log(0 === "0"); // false (strict — GOOD)\n\n// Ternary\nconst grade = score >= 60 ? "Pass" : "Fail";\n\n// Optional chaining: no error if null/undefined\nconst city = user?.address?.city ?? "Unknown";\n\n// Nullish coalescing: only replaces null/undefined\nconst name = user.name ?? "Anonymous"; // 0 and "" are kept!\nconst count = user.count || 0; // Replaces 0 too — careful!\n\n// Logical assignment\nuser.preferences ??= {}; // assign only if null/undefined\nconfig.debug ||= false;  // assign only if falsy\n\n// Short-circuit evaluation\nisAdmin && deleteUser(id);  // runs only if isAdmin is true\nfetchUser() || showError(); // runs only if fetchUser fails` },

      { title: 'If/Else & Switch', theory: 'if/else/else if for conditional branching. switch is cleaner when comparing one variable to many values — always include break (or return in functions) and a default case. Early returns make code flatter and more readable than deeply nested ifs. Use if/else for ranges, switch for exact matches.', challenge: 'Convert a deeply nested if/else chain to use early returns. Then write a switch for HTTP status codes.', snippet: `// Guard clauses (early returns) — cleaner than nesting\nfunction processUser(user) {\n  if (!user) return "No user provided";\n  if (!user.email) return "Email required";\n  if (!user.isVerified) return "Please verify email";\n  // Happy path — no nesting needed\n  return saveUser(user);\n}\n\n// Switch for exact matches\nfunction getStatusMessage(code) {\n  switch (code) {\n    case 200: return "Success";\n    case 201: return "Created";\n    case 400: return "Bad Request";\n    case 401: return "Unauthorised";\n    case 404: return "Not Found";\n    case 500: return "Server Error";\n    default:  return "Unknown Status";\n  }\n}` },

      { title: 'Loops', theory: 'for loop: best when you know the iteration count. while: runs while condition is true. do-while: always runs at least once. for...of: cleanest way to iterate arrays and strings. for...in: iterates object keys (rarely needed). forEach: array method, no break. Array methods (map/filter/reduce) replace most loop needs.', challenge: 'Rewrite a for loop using for...of, then using forEach, then using map. Observe the differences.', snippet: `const students = ["Alice", "Bob", "Charlie"];\n\n// Traditional for loop\nfor (let i = 0; i < students.length; i++) {\n  console.log(students[i]);\n}\n\n// for...of (cleanest for arrays)\nfor (const student of students) {\n  console.log(student);\n}\n\n// forEach (functional, no return value)\nstudents.forEach((student, index) => {\n  console.log(\`\${index}: \${student}\`);\n});\n\n// while (use when count is unknown)\nlet page = 1;\nwhile (hasMorePages) {\n  const data = await fetchPage(page++);\n  if (!data.length) hasMorePages = false;\n}\n\n// Break and continue\nfor (const num of [1,2,3,4,5]) {\n  if (num === 3) continue; // skip 3\n  if (num === 5) break;    // stop at 5\n  console.log(num); // 1, 2, 4\n}` },

      { title: 'Function Declaration & Arrow Functions', theory: 'Function declarations are hoisted. Function expressions and arrow functions are not. Arrow functions: shorter syntax, no own this (they inherit from parent scope), cannot be used as constructors. Use arrow functions for callbacks and methods that do not need their own this. Regular functions for standalone functions and methods that use this.', challenge: 'Convert a set of regular functions to arrow functions. Then find one case where you must use a regular function.', snippet: `// Function declaration (hoisted)\nfunction greet(name) {\n  return \`Hello, \${name}!\`;\n}\n\n// Function expression\nconst greet = function(name) {\n  return \`Hello, \${name}!\`;\n};\n\n// Arrow function — short body: implicit return\nconst greet = name => \`Hello, \${name}!\`;\nconst add = (a, b) => a + b;\nconst square = x => x ** 2;\n\n// Arrow with body: explicit return needed\nconst processUser = (user) => {\n  const name = user.name.trim();\n  return { ...user, name };\n};\n\n// Default parameters\nconst createUser = (name, role = "student", active = true) => ({\n  name, role, active, createdAt: new Date()\n});` },

      { title: 'Arrays & Array Methods', theory: 'Arrays are ordered, indexed lists. The big four methods: map() transforms every element (returns new array), filter() selects elements (returns new array), find() returns first match (or undefined), reduce() collapses to single value. Also: some(), every(), flat(), flatMap(). All except push/pop/splice/sort are non-mutating.', challenge: 'Given an array of student objects, use one chain of map/filter/reduce to calculate the average score of students who passed.', snippet: `const students = [\n  { name: "Alice", score: 92, passed: true },\n  { name: "Bob",   score: 45, passed: false },\n  { name: "Charlie", score: 78, passed: true },\n  { name: "Diana", score: 31, passed: false },\n];\n\n// map: transform\nconst names = students.map(s => s.name);\n// ["Alice", "Bob", "Charlie", "Diana"]\n\n// filter: select\nconst passed = students.filter(s => s.passed);\n// [{Alice, 92}, {Charlie, 78}]\n\n// find: first match\nconst alice = students.find(s => s.name === "Alice");\n\n// reduce: accumulate\nconst total = students.reduce((sum, s) => sum + s.score, 0);\n\n// Chain: average score of passed students\nconst avgPassed = students\n  .filter(s => s.passed)\n  .reduce((sum, s, _, arr) => sum + s.score / arr.length, 0);\n// 85` },

      { title: 'Objects & Destructuring', theory: 'Objects store key-value pairs. Access: dot notation (obj.key) or bracket notation (obj["key"]). Shorthand property names when variable name matches key. Computed property names with []. Spread operator (...) copies/merges objects. Destructuring extracts values into variables. Rest collects remaining keys.', challenge: 'Write a function that takes a user object and returns only safe public fields using destructuring and spread.', snippet: `// Object creation\nconst user = {\n  name: "Alice",\n  age: 25,\n  email: "alice@example.com"\n};\n\n// Shorthand (when variable name matches key)\nconst name = "Alice", score = 95;\nconst student = { name, score }; // { name: "Alice", score: 95 }\n\n// Destructuring\nconst { name, age, email } = user;\nconst { name: userName, age: userAge = 18 } = user; // rename + default\n\n// Nested destructuring\nconst { address: { city, country } } = user;\n\n// Spread: copy and modify\nconst updated = { ...user, age: 26, role: "admin" };\n\n// Rest: collect remaining\nconst { password, secret, ...publicUser } = user;\n\n// Computed keys\nconst field = "email";\nconst data = { [field]: "test@test.com" }; // { email: "test@test.com" }` },

      { title: 'JSON Basics', theory: 'JSON (JavaScript Object Notation) is a text format for data exchange. JSON.stringify() converts JS objects to JSON strings. JSON.parse() converts JSON strings back to JS objects. JSON rules: keys must be double-quoted strings, no functions, no undefined, no trailing commas. The replacer/reviver parameters enable custom serialization.', challenge: 'Store a complex object in localStorage using JSON, then retrieve and use it.', snippet: `const user = {\n  id: 1,\n  name: "Alice",\n  scores: [92, 78, 85],\n  metadata: { joined: "2026-01-01" }\n};\n\n// Serialise to string\nconst jsonString = JSON.stringify(user);\n// '{"id":1,"name":"Alice","scores":[92,78,85],...}'\n\n// Pretty print (for debugging)\nconst pretty = JSON.stringify(user, null, 2);\n\n// Parse back to object\nconst parsed = JSON.parse(jsonString);\nconsole.log(parsed.scores[0]); // 92\n\n// Store in localStorage\nlocalStorage.setItem("user", JSON.stringify(user));\nconst saved = JSON.parse(localStorage.getItem("user") || "{}");\n\n// Parsing errors\ntry {\n  const data = JSON.parse("not valid json");\n} catch (err) {\n  console.error("Invalid JSON:", err.message);\n}` },

      { title: 'DOM Manipulation', theory: 'The DOM (Document Object Model) is a tree of HTML elements that JS can read and modify. querySelector returns the first match. querySelectorAll returns all matches as a NodeList. textContent sets plain text. innerHTML sets HTML. classList.add/remove/toggle modifies classes. createElement + appendChild adds new elements.', challenge: 'Build a dynamic todo list: add items, mark complete with classList toggle, remove items.', snippet: `// Select elements\nconst title = document.querySelector("#page-title");\nconst items = document.querySelectorAll(".card");\n\n// Read and write\nconsole.log(title.textContent);\ntitle.textContent = "Updated Title";\ntitle.innerHTML = "<span>Bold</span> Title"; // HTML\n\n// Attributes\nconst img = document.querySelector("img");\nimg.setAttribute("alt", "New description");\nimg.src = "new-photo.jpg"; // property shortcut\n\n// Classes\nconst btn = document.querySelector(".btn");\nbtn.classList.add("active");\nbtn.classList.remove("disabled");\nbtn.classList.toggle("open");\nbtn.classList.contains("active"); // true/false\n\n// Create and add\nconst li = document.createElement("li");\nli.textContent = "New item";\nli.className = "todo-item";\ndocument.querySelector("#list").appendChild(li);\n\n// Remove\nli.remove(); // modern\nli.parentNode.removeChild(li); // older` },

      { title: 'Events & Event Listeners', theory: 'addEventListener attaches event handlers. The event object contains details about what happened. event.target is the element that triggered it. event.preventDefault() stops default behaviour (like form submission). event.stopPropagation() stops event bubbling up the DOM. Event delegation: attach one listener to a parent to handle events from many children.', challenge: 'Build a click counter using event delegation on a list, and a form that prevents default submission and validates input.', snippet: `// Basic listener\nconst btn = document.querySelector("#submit-btn");\nbtn.addEventListener("click", (event) => {\n  console.log("Clicked!", event.target);\n});\n\n// Form: prevent default submission\nform.addEventListener("submit", (e) => {\n  e.preventDefault();\n  const data = new FormData(form);\n  console.log(Object.fromEntries(data));\n});\n\n// Keyboard\ndocument.addEventListener("keydown", (e) => {\n  if (e.key === "Escape") closeModal();\n  if (e.ctrlKey && e.key === "s") saveDocument();\n});\n\n// Event delegation: one listener for many items\ndocument.querySelector("#list").addEventListener("click", (e) => {\n  if (e.target.matches(".delete-btn")) {\n    e.target.closest("li").remove();\n  }\n  if (e.target.matches(".complete-btn")) {\n    e.target.closest("li").classList.toggle("done");\n  }\n});\n\n// Remove listener\nconst handler = () => doThing();\nbtn.addEventListener("click", handler);\nbtn.removeEventListener("click", handler); // must be same reference` },

      { title: 'Scope & Closures', theory: 'Scope determines where variables are accessible. Global scope: everywhere. Function scope: inside the function. Block scope: inside {} for let/const. Lexical scope: functions can access variables from their outer scope. A closure is a function that remembers variables from its outer scope even after that scope has finished executing.', challenge: 'Create a bank account using closures — with deposit, withdraw, and getBalance methods. The balance should be completely private.', snippet: `// Lexical scope\nconst message = "global";\n\nfunction outer() {\n  const message = "outer";\n  \n  function inner() {\n    // Can access outer's variables\n    console.log(message); // "outer" — not global!\n  }\n  inner();\n}\n\n// Closure: private state\nfunction createCounter(initial = 0) {\n  let count = initial; // private — not accessible outside\n  \n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    reset: () => { count = initial; },\n    value: () => count\n  };\n}\n\nconst counter = createCounter(10);\ncounter.increment(); // 11\ncounter.increment(); // 12\ncounter.decrement(); // 11\ncounter.value();     // 11\n// count is inaccessible from outside` },

      { title: 'Promises & Async/Await', theory: 'JavaScript is single-threaded but handles async operations via the event loop. Promises represent a future value — pending, fulfilled, or rejected. .then() chains success handlers. .catch() handles errors. async functions always return a Promise. await pauses execution until a Promise resolves. Promise.all() runs multiple promises in parallel.', challenge: 'Write async functions for: fetching user data, fetching their posts, then combining both using Promise.all.', snippet: `// Promise\nfunction wait(ms) {\n  return new Promise(resolve => setTimeout(resolve, ms));\n}\n\n// async/await (much cleaner)\nasync function fetchUser(id) {\n  try {\n    const res = await fetch(\`/api/users/\${id}\`);\n    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);\n    return await res.json();\n  } catch (err) {\n    console.error("Fetch failed:", err.message);\n    throw err; // re-throw for caller to handle\n  }\n}\n\n// Parallel: both requests happen at the same time\nasync function loadDashboard(userId) {\n  const [user, posts, notifications] = await Promise.all([\n    fetchUser(userId),\n    fetchPosts(userId),\n    fetchNotifications(userId)\n  ]);\n  return { user, posts, notifications };\n}\n\n// Sequential: one after another\nasync function createAndNotify(userData) {\n  const user = await createUser(userData);\n  const token = await sendVerificationEmail(user.email);\n  return { user, token };\n}` },

      { title: 'Fetch API & Working with APIs', theory: 'fetch() makes HTTP requests and returns a Promise. Always check res.ok — a 404 still resolves the Promise. JSON.stringify() serializes the request body. Set Content-Type header for POST requests. Use AbortController to cancel requests. Handle both network errors (fetch rejects) and HTTP errors (check res.ok) separately.', challenge: 'Build a function that fetches paginated data, handles errors, and supports request cancellation.', snippet: `// GET request\nasync function getUser(id) {\n  const res = await fetch(\`https://api.example.com/users/\${id}\`);\n  if (!res.ok) throw new Error(\`User not found: \${res.status}\`);\n  return res.json();\n}\n\n// POST request\nasync function createPost(data) {\n  const res = await fetch("/api/posts", {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify(data)\n  });\n  if (!res.ok) {\n    const error = await res.json();\n    throw new Error(error.message);\n  }\n  return res.json();\n}\n\n// Cancellable request\nconst controller = new AbortController();\n\nfetch("/api/slow-endpoint", { signal: controller.signal })\n  .then(r => r.json())\n  .catch(e => {\n    if (e.name === "AbortError") return; // cancelled\n    throw e;\n  });\n\n// Cancel after 5 seconds\nsetTimeout(() => controller.abort(), 5000);` },

      { title: 'Local Storage & Browser APIs', theory: 'localStorage stores data persistently (survives tab/browser close). sessionStorage clears when tab closes. Both only store strings — use JSON.stringify/parse for objects. Useful browser APIs: Clipboard API (copy/paste), Geolocation API, Notification API, IntersectionObserver (lazy loading), Web Workers (background threads).', challenge: 'Build a persistent theme switcher (light/dark) that saves preference in localStorage and applies on page load.', snippet: `// localStorage\nlocalStorage.setItem("user", JSON.stringify({ name: "Alice" }));\nconst user = JSON.parse(localStorage.getItem("user") ?? "{}");\nlocalStorage.removeItem("user");\nlocalStorage.clear();\n\n// Session storage (clears on tab close)\nsessionStorage.setItem("draft", formData);\n\n// Theme switcher\nconst savedTheme = localStorage.getItem("theme") ?? "dark";\ndocument.documentElement.dataset.theme = savedTheme;\n\nfunction toggleTheme() {\n  const current = document.documentElement.dataset.theme;\n  const next = current === "dark" ? "light" : "dark";\n  document.documentElement.dataset.theme = next;\n  localStorage.setItem("theme", next);\n}\n\n// Clipboard API\nasync function copyToClipboard(text) {\n  await navigator.clipboard.writeText(text);\n  showToast("Copied!");\n}\n\n// IntersectionObserver (lazy loading)\nconst observer = new IntersectionObserver(entries => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      entry.target.src = entry.target.dataset.src;\n      observer.unobserve(entry.target);\n    }\n  });\n});\ndocument.querySelectorAll("img[data-src]").forEach(img => observer.observe(img));` },
    ]

      { title: 'Template Literals & String Methods', theory: 'Template literals use backticks and support multi-line strings, embedded expressions with ${}, and tagged templates. Essential string methods: includes(), startsWith(), endsWith(), padStart(), padEnd(), repeat(), trimStart(), trimEnd(), replaceAll(). String.raw preserves backslashes.', challenge: 'Build a function that generates an HTML card template using template literals and formats a price with padStart.', snippet: `// Template literals
const name = "Alice", score = 95;
const card = \`
  <div class="card">
    <h2>\${name}</h2>
    <p>Score: \${score >= 60 ? "Pass" : "Fail"}</p>
    <p>Grade: \${score}%</p>
  </div>
\`;

// Multi-line string
const sql = \`
  SELECT * FROM users
  WHERE score > \${score}
  ORDER BY name
\`;

// String methods
"hello world".includes("world");   // true
"hello".startsWith("hel");         // true
"hello".padStart(10, "*");         // "*****hello"
"ha".repeat(3);                    // "hahaha"
"  trim  ".trimStart();            // "trim  "
"a-b-a".replaceAll("a", "x");      // "x-b-x"` },

      { title: 'Error Types & Debugging', theory: 'JavaScript has built-in error types: Error (generic), TypeError (wrong type), ReferenceError (undefined variable), SyntaxError (bad code), RangeError (out of range), URIError. The Error object has message and stack properties. Custom errors extend Error. Use browser DevTools debugger, console.table(), console.group(), performance.now() for debugging.', challenge: 'Create custom error classes for a form validator: ValidationError, NetworkError, AuthError — each with helpful messages.', snippet: `// Built-in errors
try {
  null.property;          // TypeError
  undeclaredVar;          // ReferenceError
  new Array(-1);          // RangeError
} catch (err) {
  console.log(err.name);    // "TypeError"
  console.log(err.message); // "Cannot read..."
  console.log(err.stack);   // Full call stack
}

// Custom error classes
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

class NetworkError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = "NetworkError";
    this.statusCode = statusCode;
  }
}

// Debugging tools
console.table(users);          // tabular display
console.group("API Call");
console.log("Request sent");
console.groupEnd();
const t0 = performance.now();
// ...code...
console.log(performance.now() - t0, "ms");` },

      { title: 'Modules: import & export', theory: 'ES Modules split code into separate files. Named exports: export const/function/class. Default export: one per file, export default. Import named: import { name } from "./file.js". Import default: import name from "./file.js". Import all: import * as ns from "./file.js". Dynamic import: import("./file.js") returns a Promise — use for code splitting.', challenge: 'Split a utility file into separate modules: math.js, string.js, date.js and import them into main.js using both named and default exports.', snippet: `// math.js — named exports
export const add  = (a, b) => a + b;
export const mul  = (a, b) => a * b;
export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

// user.js — default export
export default class User {
  constructor(name) { this.name = name; }
}

// main.js — importing
import User from "./user.js";
import { add, mul, clamp } from "./math.js";
import * as MathUtils from "./math.js";

// Re-export
export { add } from "./math.js";

// Dynamic import (lazy loading)
button.addEventListener("click", async () => {
  const { renderChart } = await import("./charts.js");
  renderChart(data);
});` },

      { title: 'Regular Expressions', theory: 'Regular expressions (regex) match patterns in strings. Create with /pattern/flags or new RegExp(). Flags: g (global), i (case-insensitive), m (multiline). Methods: test() checks match, match() returns matches, replace() replaces, split() splits. Key patterns: \d (digit), \w (word char), \s (whitespace), . (any char), * (0+), + (1+), ? (0-1), ^ (start), $ (end).', challenge: 'Write regex patterns to: validate email, extract phone numbers, validate password strength, and find all URLs in text.', snippet: `// Test a pattern
/^\d+$/.test("123");      // true (only digits)
/^\d+$/.test("12a");      // false

// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
emailRegex.test("alice@example.com"); // true

// Extract matches
const text = "Call 080-1234-5678 or 090-8765-4321";
const phones = text.match(/\d{3}-\d{4}-\d{4}/g);
// ["080-1234-5678", "090-8765-4321"]

// Replace
"Hello World".replace(/world/i, "JavaScript");
// "Hello JavaScript"

// Groups
const date = "2026-03-29";
const [, year, month, day] = date.match(/(\d{4})-(\d{2})-(\d{2})/);

// Password: min 8 chars, letter + number
const strongPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!]{8,}$/;` },

      { title: 'Web APIs: Geolocation, Notifications & Clipboard', theory: 'Browser Web APIs provide powerful features beyond DOM manipulation. Geolocation API gets user location (requires permission). Notifications API shows OS notifications. Clipboard API reads/writes clipboard. IntersectionObserver triggers when elements enter viewport. ResizeObserver watches element size changes. All require user permission and use Promises.', challenge: 'Build a "copy code" button using Clipboard API with a fallback, and a "notify me" button using the Notifications API.', snippet: `// Clipboard API
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("Copied!");
  } catch {
    // Fallback for older browsers
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    el.remove();
  }
}

// Notifications API
async function requestNotification() {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    new Notification("T-Learn Pro", {
      body: "Your exam result is ready!",
      icon: "/assets/Logo.webp"
    });
  }
}

// IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // stop after first trigger
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".card").forEach(el => observer.observe(el));` },

      { title: 'Object-Oriented JavaScript: Classes', theory: 'ES6 Classes provide cleaner OOP syntax. class keyword, constructor, methods, static methods (class.method, not instance.method), private fields (#), getters/setters, extends for inheritance, super() calls parent constructor. instanceof checks type. Classes are syntactic sugar over prototypes — good to understand both.', challenge: 'Build a BankAccount class with private balance, deposit/withdraw methods, transaction history, and overdraft protection.', snippet: `class Animal {
  #name; // private field

  constructor(name, sound) {
    this.#name = name;
    this.sound = sound;
  }

  get name() { return this.#name; }  // getter

  speak() {
    return \`\${this.#name} says \${this.sound}\`;
  }

  static create(name, sound) {        // static method
    return new Animal(name, sound);
  }
}

// Inheritance
class Dog extends Animal {
  #tricks = [];

  constructor(name) {
    super(name, "Woof");              // call parent
  }

  learn(trick) {
    this.#tricks.push(trick);
    return this;                      // method chaining
  }

  perform() {
    return this.#tricks.join(", ");
  }
}

const dog = new Dog("Max");
dog.learn("sit").learn("stay").learn("fetch");
console.log(dog.speak());     // Max says Woof
console.log(dog.perform());   // sit, stay, fetch
console.log(dog instanceof Animal); // true` },

      { title: 'Iterators, Generators & Symbols', theory: 'Iterators implement the iterator protocol: objects with a next() method returning {value, done}. Any object with [Symbol.iterator] is iterable (arrays, strings, Maps, Sets). Generators (function*) produce values lazily with yield. They pause execution and resume on .next(). Useful for infinite sequences, lazy evaluation, and async control flow.', challenge: 'Write a generator that yields Fibonacci numbers indefinitely, and a custom iterable class for a range.', snippet: `// Iterator protocol
const range = {
  from: 1, to: 5,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next() {
        return current <= last
          ? { value: current++, done: false }
          : { value: undefined, done: true };
      }
    };
  }
};
console.log([...range]); // [1, 2, 3, 4, 5]

// Generator function
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2

// Take first n values
function take(gen, n) {
  return Array.from({ length: n }, () => gen.next().value);
}
console.log(take(fibonacci(), 8)); // [0,1,1,2,3,5,8,13]` },

      { title: 'Performance & Best Practices', theory: 'Write performant JS: avoid layout thrashing (batch DOM reads then writes), use requestAnimationFrame for animations, debounce scroll/resize handlers, prefer CSS transitions over JS animations, use Web Workers for CPU-heavy tasks, lazy load non-critical code, avoid memory leaks (remove event listeners, clear intervals). Measure with performance.mark() and Chrome DevTools.', challenge: 'Implement a debounce function from scratch and use it to optimise a search input that fires API calls.', snippet: `// Debounce: wait until user stops typing
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Throttle: at most once per interval
function throttle(fn, limit) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      return fn.apply(this, args);
    }
  };
}

// Usage
const search = debounce(async (query) => {
  const results = await fetchSearch(query);
  renderResults(results);
}, 300); // wait 300ms after last keystroke

input.addEventListener("input", e => search(e.target.value));

// Avoid layout thrashing
// BAD: alternates read/write
elements.forEach(el => el.style.width = el.offsetWidth + 10 + "px");

// GOOD: batch reads, then batch writes
const widths = elements.map(el => el.offsetWidth);
elements.forEach((el, i) => el.style.width = widths[i] + 10 + "px");` },

      { title: 'TypeScript Basics', theory: 'TypeScript adds static types to JavaScript. Types catch bugs at compile time, not runtime. Basic types: string, number, boolean, null, undefined, any, unknown, never, void. Interfaces define object shapes. Type aliases with type keyword. Union types (string | number), intersection types (&). Generics make reusable typed components. TypeScript compiles to JavaScript.', challenge: 'Convert a JavaScript user management module to TypeScript with interfaces, type guards, and generics.', snippet: `// Basic types
let name: string = "Alice";
let age: number = 25;
let active: boolean = true;

// Interface
interface User {
  id: number;
  name: string;
  email: string;
  role?: "student" | "admin"; // optional, union type
}

// Type alias
type Score = number;
type Grade = "A" | "B" | "C" | "D" | "F";

// Function types
function greet(user: User): string {
  return \`Hello, \${user.name}\`;
}

// Generics
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}
getFirst<number>([1, 2, 3]);    // number
getFirst<string>(["a", "b"]);   // string

// Type guard
function isUser(obj: unknown): obj is User {
  return typeof obj === "object" && obj !== null && "name" in obj;
}

// Readonly and Partial
type ReadonlyUser = Readonly<User>;
type PartialUser  = Partial<User>;  // all fields optional` },
    ]
  },
  },

  Python: {
    icon: 'fa-python',
    topics: [
      { title: 'What is Python', theory: 'Python is a high-level, readable programming language created by Guido van Rossum in 1991. Used for web development, data science, AI/ML, automation, and scripting. Python uses significant indentation (4 spaces) instead of curly braces. The Python philosophy (import this) values readability and simplicity.', challenge: 'Install Python, run your first script from the terminal, and experiment with the interactive REPL.', snippet: `# Your first Python script\nprint("Hello, T-Learn Pro!")\n\n# Python REPL (run python in terminal)\n# >>> 2 + 2\n# 4\n# >>> "hello".upper()\n# 'HELLO'\n\n# Python philosophy\nimport this  # prints The Zen of Python\n\n# Check version\nimport sys\nprint(sys.version)\n\n# Indentation matters!\nif True:\n    print("This is indented — part of the if block")\n    if True:\n        print("Double indented")\nprint("Back to no indentation")` },

      { title: 'Variables & Data Types', theory: 'Python is dynamically typed — no type declarations. Types: int, float, complex, str (immutable), bool (True/False — capitalised), bytes, None. type() returns the type. isinstance() checks type. Python integers have unlimited precision. Underscores in numbers improve readability: 1_000_000.', challenge: 'Create variables of every basic type, use type() to verify them, and write a type checker function.', snippet: `# Basic types\nage      = 25            # int\nprice    = 9.99          # float\nbig      = 1_000_000     # int (readable with underscores)\ncomplex_num = 2 + 3j    # complex\nname     = "Alice"       # str\nactive   = True          # bool (capital T/F!)\nnothing  = None          # NoneType\n\n# Type checking\nprint(type(age))        # <class 'int'>\nprint(isinstance(age, int))   # True\nprint(isinstance(age, (int, float)))  # True (check multiple)\n\n# Type conversion\nprint(int("42"))     # 42\nprint(float("3.14")) # 3.14\nprint(str(100))      # "100"\nprint(bool(0))       # False\nprint(bool(""))      # False\nprint(bool(" "))     # True (non-empty string!)` },

      { title: 'If/Else Statements', theory: 'Python uses if, elif, and else. Indentation defines blocks — no curly braces or semicolons. Falsy values: 0, 0.0, "", [], {}, None, False. Truthy: everything else. The walrus operator := assigns and tests in one step. Python has no switch/case before 3.10 — use if/elif chains or dicts.', challenge: 'Write a grade calculator that handles all edge cases and uses walrus operator for input validation.', snippet: `score = 85\n\n# Basic if/elif/else\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelif score >= 70:\n    grade = "C"\nelif score >= 60:\n    grade = "D"\nelse:\n    grade = "F"\nprint(f"Grade: {grade}")\n\n# Ternary (conditional expression)\nresult = "Pass" if score >= 60 else "Fail"\n\n# Chained comparisons (Python feature)\nif 0 <= score <= 100:\n    print("Valid score")\n\n# Match statement (Python 3.10+)\nmatch status_code:\n    case 200: print("OK")\n    case 404: print("Not Found")\n    case 500: print("Server Error")\n    case _:   print("Unknown")  # default` },

      { title: 'Loops', theory: 'for loops iterate over any iterable (list, string, range, dict, file). range(start, stop, step) generates numbers. while loops run while a condition is true. break exits the loop. continue skips to next iteration. else on a loop runs when loop completes normally (not via break) — rarely used but useful.', challenge: 'FizzBuzz: print 1-100, replace multiples of 3 with Fizz, 5 with Buzz, both with FizzBuzz.', snippet: `# for with range\nfor i in range(5):       # 0, 1, 2, 3, 4\nfor i in range(1, 6):    # 1, 2, 3, 4, 5\nfor i in range(0, 10, 2): # 0, 2, 4, 6, 8\nfor i in range(5, 0, -1): # 5, 4, 3, 2, 1 (countdown)\n\n# Iterate with index\nfruits = ["apple", "banana", "mango"]\nfor i, fruit in enumerate(fruits):\n    print(f"{i}: {fruit}")\n\n# Iterate two lists together\nnames  = ["Alice", "Bob"]\nscores = [92, 78]\nfor name, score in zip(names, scores):\n    print(f"{name}: {score}")\n\n# While loop\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1\n\n# FizzBuzz\nfor n in range(1, 101):\n    if n % 15 == 0: print("FizzBuzz")\n    elif n % 3 == 0: print("Fizz")\n    elif n % 5 == 0: print("Buzz")\n    else: print(n)` },

      { title: 'Functions', theory: 'def defines a function. Parameters can have defaults. *args collects extra positional arguments as a tuple. **kwargs collects extra keyword arguments as a dict. Functions return None by default. Docstrings (triple-quoted strings) document functions. Functions are first-class objects — they can be passed as arguments.', challenge: 'Write a decorator function that logs how long any function takes to execute.', snippet: `# Basic function\ndef greet(name, greeting="Hello"):\n    """Return a greeting string.\n    \n    Args:\n        name: The person's name\n        greeting: The greeting word (default: Hello)\n    """\n    return f"{greeting}, {name}!"\n\nprint(greet("Alice"))           # Hello, Alice!\nprint(greet("Bob", "Hi"))       # Hi, Bob!\nprint(greet(greeting="Hey", name="Carol"))  # Hey, Carol!\n\n# *args: variable positional arguments\ndef add(*numbers):\n    return sum(numbers)\nprint(add(1, 2, 3, 4, 5))  # 15\n\n# **kwargs: variable keyword arguments\ndef create_user(**fields):\n    return fields\nprint(create_user(name="Alice", role="admin", score=95))\n\n# Lambda (anonymous function)\nsquare = lambda x: x ** 2\nsorted_students = sorted(students, key=lambda s: s["score"], reverse=True)` },

      { title: 'Lists', theory: 'Lists are ordered, mutable sequences. Create with [] or list(). Access by index (0-based, negative from end). Slicing: list[start:end:step]. Mutating methods: append(), extend(), insert(), remove(), pop(), sort(), reverse(). Non-mutating: sorted(), reversed(). List comprehensions create lists concisely.', challenge: 'Given a list of numbers, use list operations to: filter evens, square them, sort descending, then get the top 3.', snippet: `fruits = ["apple", "banana", "mango", "orange"]\n\n# Access\nprint(fruits[0])    # "apple"\nprint(fruits[-1])   # "orange" (last item)\nprint(fruits[1:3])  # ["banana", "mango"] (slicing)\nprint(fruits[::-1]) # reversed copy\n\n# Mutating\nfruits.append("kiwi")          # add to end\nfruits.insert(1, "avocado")    # insert at index\nfruits.remove("banana")        # remove by value\npopped = fruits.pop()          # remove and return last\nfruits.sort()                  # sort in place\n\n# Non-mutating\nsorted_fruits = sorted(fruits, reverse=True)\n\n# List comprehension\nsquares   = [x**2 for x in range(10)]\nevens     = [x for x in range(20) if x % 2 == 0]\nprocessed = [s.upper() for s in fruits if len(s) > 4]\n\n# Unpacking\nfirst, *middle, last = fruits\nprint(first, last, middle)` },

      { title: 'Tuples, Sets & Dictionaries', theory: 'Tuples are immutable sequences — use for fixed data (coordinates, RGB values, database rows). Sets are unordered collections with no duplicates — O(1) membership testing, useful for removing duplicates and set operations. Dictionaries store key-value pairs — keys must be hashable (immutable). All three support comprehensions.', challenge: 'Use all three structures appropriately: store a colour as RGB tuple, remove duplicates with a set, count word frequency with a dict.', snippet: `# Tuples (immutable)\npoint = (10, 20)\nx, y = point  # unpacking\nrgb = (255, 128, 0)\nt = (1,)  # single-element tuple (note the comma)\n\n# Sets\nunique = {1, 2, 2, 3, 3, 3}  # {1, 2, 3}\nunique.add(4)\nunique.discard(1)  # remove (no error if missing)\n\n# Set operations\na, b = {1, 2, 3}, {2, 3, 4}\nprint(a | b)  # union: {1, 2, 3, 4}\nprint(a & b)  # intersection: {2, 3}\nprint(a - b)  # difference: {1}\nprint(a ^ b)  # symmetric diff: {1, 4}\n\n# Dictionary\nstudent = {"name": "Alice", "score": 95, "active": True}\n\n# Access\nprint(student["name"])          # KeyError if missing\nprint(student.get("age", 18))   # safe: returns default\n\n# Mutate\nstudent["score"] = 98\nstudent.update({"grade": "A", "rank": 1})\ndel student["active"]\n\n# Iterate\nfor key, value in student.items(): print(f"{key}: {value}")\n\n# Dict comprehension\nword_count = {word: len(word) for word in ["hello", "world"]}` },

      { title: 'String Methods & F-Strings', theory: 'Strings are immutable in Python. All string methods return new strings. Key methods: strip/lstrip/rstrip, upper/lower/title/capitalize, split/join, replace, find/index, startswith/endswith, format. F-strings (f"") are the modern way to format strings — support expressions and method calls inside {}.', challenge: 'Write a function that sanitises user input: strip whitespace, normalise to title case, validate length, and format into a template.', snippet: `# String methods\ntext = "  Hello, World!  "\nprint(text.strip())             # "Hello, World!"\nprint(text.lower())             # "  hello, world!  "\nprint(text.upper())             # "  HELLO, WORLD!  "\nprint(text.replace("World", "Python"))\nprint(text.split(","))          # ["  Hello", " World!  "]\nprint("-".join(["a", "b", "c"])) # "a-b-c"\nprint(text.startswith("  Hello")) # True\nprint(text.count("l"))          # 3\nprint("  ".strip())             # ""\n\n# F-strings (most powerful)\nname, score, rank = "Alice", 95.5, 1\nprint(f"{name} scored {score:.1f}% — Rank #{rank}")\nprint(f"{'Name':<10} {'Score':>6}")  # alignment\nprint(f"{score:.2f}")   # 2 decimal places\nprint(f"{1_000_000:,}") # 1,000,000 (thousand separator)\nprint(f"{score!r}")     # repr()\n\n# Multiline f-string\nreport = f"""\nStudent Report\nName:  {name}\nScore: {score}%\nGrade: {"A" if score >= 90 else "B"}\n"""` },

      { title: 'File Handling', theory: 'open() opens files. Always use the with statement — it automatically closes the file even if an error occurs. Modes: r (read), w (write, creates/overwrites), a (append), r+ (read+write), b (binary). readline() reads one line. readlines() returns all lines as a list. The csv and json modules handle structured data.', challenge: 'Write a script that reads a CSV of students, calculates averages, and writes a summary report to a new file.', snippet: `# Read entire file\nwith open("data.txt", "r", encoding="utf-8") as f:\n    content = f.read()       # entire file as string\n    \nwith open("data.txt", "r") as f:\n    lines = f.readlines()    # list of lines\n\nwith open("data.txt", "r") as f:\n    for line in f:           # memory-efficient line-by-line\n        print(line.strip())\n\n# Write\nwith open("output.txt", "w") as f:\n    f.write("Hello\\n")\n    f.writelines(["Line 1\\n", "Line 2\\n"])\n\n# Append\nwith open("log.txt", "a") as f:\n    f.write(f"[{datetime.now()}] Event occurred\\n")\n\n# JSON\nimport json\nwith open("data.json", "r") as f:\n    data = json.load(f)\nwith open("output.json", "w") as f:\n    json.dump(data, f, indent=2)\n\n# CSV\nimport csv\nwith open("students.csv") as f:\n    reader = csv.DictReader(f)\n    for row in reader:\n        print(row["name"], row["score"])` },

      { title: 'Error Handling', theory: 'try/except catches exceptions. Use specific exception types rather than bare except. except can catch multiple exceptions. else runs only if no exception occurred. finally always runs (cleanup). raise creates exceptions. Custom exceptions inherit from Exception. Use context managers for resources.', challenge: 'Write a robust file reader that handles: file not found, permission error, encoding error, and invalid JSON.', snippet: `# Basic try/except\ntry:\n    result = 10 / 0\nexcept ZeroDivisionError as e:\n    print(f"Math error: {e}")\nexcept (TypeError, ValueError) as e:\n    print(f"Type/value error: {e}")\nexcept Exception as e:\n    print(f"Unexpected error: {e}")\n    raise  # re-raise if you can't handle it\nelse:\n    print("No error occurred!")\nfinally:\n    print("This always runs — cleanup here")\n\n# Custom exception\nclass InsufficientXPError(Exception):\n    def __init__(self, required, current):\n        self.required = required\n        self.current = current\n        super().__init__(f"Need {required} XP but only have {current}")\n\ndef unlock_feature(user_xp, required_xp):\n    if user_xp < required_xp:\n        raise InsufficientXPError(required_xp, user_xp)\n    return True\n\ntry:\n    unlock_feature(50, 100)\nexcept InsufficientXPError as e:\n    print(e)  # Need 100 XP but only have 50` },

      { title: 'Classes & Object-Oriented Programming', theory: 'Classes are blueprints for objects. __init__ is the constructor — called when creating an instance. self refers to the instance. Instance attributes (self.x) belong to each object. Class attributes belong to all instances. __str__ defines the string representation. @property creates computed attributes. __repr__ is the developer representation.', challenge: 'Build a Student class with grade calculation, a class method for creating from a dict, and a property for letter grade.', snippet: `class Student:\n    # Class attribute (shared by all instances)\n    school = "T-Learn Pro"\n    \n    def __init__(self, name: str, scores: list[int]):\n        # Instance attributes\n        self.name = name\n        self.scores = scores\n    \n    @property\n    def average(self) -> float:\n        return sum(self.scores) / len(self.scores) if self.scores else 0\n    \n    @property\n    def letter_grade(self) -> str:\n        avg = self.average\n        if avg >= 90: return "A"\n        if avg >= 80: return "B"\n        if avg >= 70: return "C"\n        if avg >= 60: return "D"\n        return "F"\n    \n    @classmethod\n    def from_dict(cls, data: dict) -> "Student":\n        return cls(data["name"], data["scores"])\n    \n    def __str__(self) -> str:\n        return f"{self.name} ({self.letter_grade}: {self.average:.1f}%)\n    \n    def __repr__(self) -> str:\n        return f"Student(name={self.name!r}, scores={self.scores!r})"\n\nalice = Student("Alice", [92, 85, 97])\nprint(alice.average)      # 91.33\nprint(alice.letter_grade) # A\nprint(alice)              # Alice (A: 91.3%)` },

      { title: 'Inheritance', theory: 'Inheritance lets a child class extend a parent class. The child inherits all methods and attributes. super() calls the parent class method. Method overriding replaces a parent method in the child. Multiple inheritance is possible but can be complex (Method Resolution Order — MRO). Abstract base classes enforce interfaces.', challenge: 'Create an Animal base class with sound() and move() methods, then create Dog and Bird subclasses that override them.', snippet: `class Person:\n    def __init__(self, name: str, email: str):\n        self.name = name\n        self.email = email\n    \n    def greet(self) -> str:\n        return f"Hi, I'm {self.name}"\n\nclass Student(Person):\n    def __init__(self, name: str, email: str, level: int):\n        super().__init__(name, email)  # call parent __init__\n        self.level = level\n        self.completed_courses = []\n    \n    def greet(self) -> str:  # override\n        return f"{super().greet()}, Level {self.level} student"\n    \n    def complete_course(self, course: str) -> None:\n        self.completed_courses.append(course)\n\nclass Instructor(Person):\n    def __init__(self, name: str, email: str, subject: str):\n        super().__init__(name, email)\n        self.subject = subject\n    \n    def greet(self) -> str:\n        return f"{super().greet()}, {self.subject} instructor"\n\nalice = Student("Alice", "alice@tlearn.pro", 100)\nprint(alice.greet())     # Hi, I'm Alice, Level 100 student\nprint(isinstance(alice, Person))  # True\nprint(isinstance(alice, Student)) # True` },

      { title: 'Modules & Standard Library', theory: 'import loads modules. from x import y imports specific names. Python stdlib modules: os (file system), sys (runtime), pathlib (modern file paths), json, csv, datetime, math, random, re (regex), collections (Counter, defaultdict, deque), itertools, functools. Third-party packages install via pip.', challenge: 'Write a script using os, datetime, json, and random to generate a daily study schedule and save it to a file.', snippet: `import os\nimport sys\nimport json\nimport random\nfrom datetime import datetime, timedelta\nfrom pathlib import Path\nfrom collections import Counter, defaultdict\n\n# os module\nprint(os.getcwd())           # current directory\nprint(os.listdir("."))       # list files\nos.makedirs("data", exist_ok=True)\n\n# pathlib (modern path handling)\ndata_dir = Path("data")\nconfig = data_dir / "config.json"\nif config.exists():\n    with config.open() as f:\n        settings = json.load(f)\n\n# datetime\nnow = datetime.now()\nprint(now.strftime("%Y-%m-%d %H:%M"))\ntomorrow = now + timedelta(days=1)\n\n# random\nrandom.choice(["HTML", "CSS", "Python"])  # random pick\nrandom.randint(1, 100)                    # random int\nrandom.shuffle(my_list)                   # in-place shuffle\n\n# Counter\nwords = "the quick brown fox jumps over the lazy dog".split()\ncount = Counter(words)\nprint(count.most_common(3))  # 3 most frequent\n\n# defaultdict\ngrades = defaultdict(list)\ngrades["A"].append("Alice")\ngrades["B"].append("Bob")` },

      { title: 'Working with APIs using requests', theory: 'The requests library simplifies HTTP calls. requests.get() fetches data. .json() parses JSON response. .status_code checks the result. .raise_for_status() throws on 4xx/5xx. For POST, pass json= parameter. Add headers= dict for API keys. Use sessions for multiple requests to the same host. Always handle timeouts.', challenge: 'Build a weather fetcher that calls a public API, formats the response, handles errors, and saves results to JSON.', snippet: `import requests\nimport json\n\ndef fetch_user(user_id: int) -> dict:\n    """Fetch a user from JSONPlaceholder API."""\n    try:\n        res = requests.get(\n            f"https://jsonplaceholder.typicode.com/users/{user_id}",\n            timeout=10  # seconds — always set a timeout!\n        )\n        res.raise_for_status()  # raises on 4xx/5xx\n        return res.json()\n    except requests.exceptions.Timeout:\n        raise TimeoutError("Request took too long")\n    except requests.exceptions.HTTPError as e:\n        raise ValueError(f"API error: {e.response.status_code}")\n    except requests.exceptions.ConnectionError:\n        raise ConnectionError("No internet connection")\n\n# POST with JSON body and headers\ndef create_post(title: str, body: str, user_id: int) -> dict:\n    res = requests.post(\n        "https://jsonplaceholder.typicode.com/posts",\n        json={"title": title, "body": body, "userId": user_id},\n        headers={"Authorization": "Bearer YOUR_TOKEN"},\n        timeout=10\n    )\n    res.raise_for_status()\n    return res.json()\n\n# Session for multiple requests\nwith requests.Session() as session:\n    session.headers.update({"Authorization": "Bearer TOKEN"})\n    users = session.get("/api/users").json()\n    posts = session.get("/api/posts").json()` },

      { title: 'OOP Projects: Calculator & To-Do App', theory: 'Putting it all together: classes, file I/O, error handling, and clean code. A Calculator class with history. A persistent To-Do list saved to JSON. These projects combine everything from the course. Focus on clean interfaces, proper error handling, and data persistence.', challenge: 'Build a command-line To-Do app that persists tasks to JSON, supports add/complete/delete/list operations, and handles all edge cases.', snippet: `import json\nfrom pathlib import Path\nfrom datetime import datetime\n\nclass TodoApp:\n    def __init__(self, filepath: str = "todos.json"):\n        self.path = Path(filepath)\n        self.todos = self._load()\n    \n    def _load(self) -> list:\n        if self.path.exists():\n            with self.path.open() as f:\n                return json.load(f)\n        return []\n    \n    def _save(self) -> None:\n        with self.path.open("w") as f:\n            json.dump(self.todos, f, indent=2)\n    \n    def add(self, title: str) -> dict:\n        todo = {\n            "id": len(self.todos) + 1,\n            "title": title,\n            "done": False,\n            "created": datetime.now().isoformat()\n        }\n        self.todos.append(todo)\n        self._save()\n        return todo\n    \n    def complete(self, todo_id: int) -> bool:\n        for todo in self.todos:\n            if todo["id"] == todo_id:\n                todo["done"] = True\n                self._save()\n                return True\n        return False\n    \n    def pending(self) -> list:\n        return [t for t in self.todos if not t["done"]]\n\n# Usage\napp = TodoApp()\napp.add("Complete HTML course")\napp.add("Take JavaScript exam")\napp.complete(1)\nprint(f"{len(app.pending())} tasks remaining")` },
    ]
  },

      { title: 'Virtual Environments & pip', theory: 'Virtual environments isolate project dependencies so different projects can use different versions of packages. venv creates them. Activate with source venv/bin/activate (Mac/Linux) or venv\\Scripts\\activate (Windows). pip installs packages from PyPI. requirements.txt pins versions. pip freeze captures current environment. Always use virtual environments for every project.', challenge: 'Create a virtual environment, install requests and pytest, freeze requirements, then recreate the environment from requirements.txt.', snippet: `# Create virtual environment
python -m venv venv

# Activate (Mac/Linux)
source venv/bin/activate

# Activate (Windows)
venv\Scripts\activate

# Install packages
pip install requests pandas numpy

# Install specific version
pip install requests==2.28.0

# Save dependencies
pip freeze > requirements.txt

# Install from requirements
pip install -r requirements.txt

# Deactivate
deactivate

# requirements.txt example:
# requests==2.28.2
# pandas==2.0.1
# numpy==1.24.3

# Check installed packages
pip list
pip show requests` },

      { title: 'Decorators', theory: 'Decorators are functions that wrap other functions to add behaviour without modifying the original. Python has built-in decorators: @property, @staticmethod, @classmethod. You can write custom decorators using functools.wraps to preserve the original function metadata. Decorators are used extensively in Flask, Django, and FastAPI for routing.', challenge: 'Write a @timer decorator that logs execution time, a @retry decorator that retries on failure, and a @cache decorator.', snippet: `import functools
import time

# Basic decorator
def timer(func):
    @functools.wraps(func)  # preserves func metadata
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

# Decorator with parameters
def retry(times=3, delay=1):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(times):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == times - 1: raise
                    print(f"Retry {attempt+1}: {e}")
                    time.sleep(delay)
        return wrapper
    return decorator

@timer
@retry(times=3, delay=0.5)
def fetch_data(url: str):
    import requests
    return requests.get(url).json()` },

      { title: 'Context Managers', theory: 'Context managers handle setup and teardown automatically using the with statement. Built-in: open(), threading.Lock(), decimal.localcontext(). Create custom ones using __enter__/__exit__ methods or the @contextmanager decorator from contextlib. They guarantee cleanup even if exceptions occur. Great for database connections, locks, and temporary changes.', challenge: 'Write a context manager that times a code block, one that temporarily changes directory, and one that suppresses specific exceptions.', snippet: `from contextlib import contextmanager
import os, time

# Class-based context manager
class DatabaseConnection:
    def __init__(self, url):
        self.url = url
        self.conn = None

    def __enter__(self):
        self.conn = connect(self.url)
        return self.conn

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.conn:
            if exc_type:
                self.conn.rollback()
            else:
                self.conn.commit()
            self.conn.close()
        return False  # don't suppress exceptions

# Generator-based (simpler)
@contextmanager
def timer_block(label=""):
    start = time.perf_counter()
    try:
        yield
    finally:
        elapsed = time.perf_counter() - start
        print(f"{label}: {elapsed:.4f}s")

@contextmanager
def cd(path):
    old = os.getcwd()
    os.chdir(path)
    try:
        yield
    finally:
        os.chdir(old)

# Usage
with timer_block("Data processing"):
    process_large_dataset()

with cd("/tmp"):
    print(os.getcwd())  # /tmp
print(os.getcwd())      # back to original` },

      { title: 'Comprehensions & Generators', theory: 'Python has four comprehension types: list [], dict {k:v}, set {v}, and generator (v) — lazy. Generator expressions are memory-efficient for large data. They compute values on demand. Use list comprehension when you need all values at once. Use generator when iterating once or dealing with large sequences. yield from delegates to another generator.', challenge: 'Process a 1 million number sequence using generator expressions to count, sum, and find the max without loading all numbers into memory.', snippet: `# List comprehension
squares = [x**2 for x in range(10)]

# Dict comprehension
scores = {name: score for name, score in zip(names, scores)}

# Set comprehension (unique values)
unique_lengths = {len(word) for word in words}

# Generator expression (lazy, memory efficient)
total = sum(x**2 for x in range(1_000_000))  # never builds list

# Nested comprehension
matrix = [[i * j for j in range(5)] for i in range(5)]

# Conditional comprehension
adults = [p for p in people if p.age >= 18]

# Generator function
def read_large_file(filepath):
    with open(filepath) as f:
        for line in f:
            yield line.strip()

# yield from — delegate to sub-generator
def chain(*iterables):
    for it in iterables:
        yield from it

# Memory comparison
import sys
list_comp = [x**2 for x in range(10000)]
gen_expr  = (x**2 for x in range(10000))
print(sys.getsizeof(list_comp))  # ~87624 bytes
print(sys.getsizeof(gen_expr))   # ~208 bytes` },

      { title: 'Testing with pytest', theory: 'Testing ensures code works correctly and keeps working as it changes. pytest is the most popular Python testing framework. Test functions start with test_. Assertions use assert. Fixtures provide reusable test data with @pytest.fixture. parametrize runs tests with multiple inputs. mock.patch replaces dependencies. Aim for high coverage on business logic.', challenge: 'Write a test suite for a calculator module: test add, subtract, divide (including division by zero), and use parametrize for edge cases.', snippet: `# calculator.py
def add(a, b): return a + b
def divide(a, b):
    if b == 0: raise ValueError("Cannot divide by zero")
    return a / b

# test_calculator.py
import pytest
from calculator import add, divide

# Basic test
def test_add():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0
    assert add(0, 0) == 0

# Test exception
def test_divide_by_zero():
    with pytest.raises(ValueError, match="Cannot divide by zero"):
        divide(10, 0)

# Parametrize: run test with multiple inputs
@pytest.mark.parametrize("a,b,expected", [
    (10, 2, 5),
    (9, 3, 3),
    (7, 2, 3.5),
    (-10, 2, -5),
])
def test_divide(a, b, expected):
    assert divide(a, b) == expected

# Fixture: reusable test data
@pytest.fixture
def sample_users():
    return [
        {"name": "Alice", "score": 95},
        {"name": "Bob",   "score": 72},
    ]

def test_top_student(sample_users):
    best = max(sample_users, key=lambda u: u["score"])
    assert best["name"] == "Alice"` },
    ]
  },

};

window.curriculumData = curriculumData;
