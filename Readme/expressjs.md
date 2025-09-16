Express.js is built on the foundational truths of web servers: handling HTTP requests and responses efficiently. Strip it down: At its core, a web framework solves the problem of mapping incoming network requests to code logic and sending back data. Node.js provides the raw HTTP module for this, but it's verbose—requiring manual parsing of URLs, bodies, and headers. Express.js abstracts this without adding bloat, adhering to Unix philosophy: Do one thing well (routing and middleware).
Fundamental building blocks:

HTTP as the Protocol: Requests have methods (GET, POST), paths (/users), queries (?id=1), bodies (JSON data), headers (Content-Type). Responses have status (200), headers, and bodies. Express doesn't change this; it exposes them via req and res objects.
Middleware Pattern: Everything in Express is a function that takes (req, res, next). This chain processes requests sequentially—e.g., log, parse, authenticate, then handle. Truth: This is inspired by Connect (Express's predecessor), emphasizing composability over monolithic structures.
Routing: Matches URL patterns to handlers. Basics: Exact paths, parameters (:id), regex. No magic—it's string matching with optional wildcards.
Application Instance: const app = express(); creates an HTTP server wrapper. app.listen(port) starts it, leveraging Node's http.createServer.
Extensibility: Express is minimal (about 5KB gzipped), so 80% of real apps add packages like body-parser (now built-in as express.json()), cors, or morgan for logging. Fact: Per npm stats, Express has over 10 million weekly downloads as of 2025, dominating Node web frameworks because it doesn't enforce opinions like full MVC (unlike Nest.js).

From these, rebuild: Express turns Node's callback hell into structured, readable code. It's not a full framework like Ruby on Rails—it's a toolkit for APIs, servers, or microservices. If you're building backends, start here because it teaches HTTP fundamentals without hiding them.
Applying the 20/80 Rule to Express.js
80% of Express's value comes from 20% of its features. Surveys like State of JS 2024 show most devs use it for APIs, where routing and middleware cover 80% of needs. Focus here to avoid overwhelm—e.g., skip view engines (for SSR) if you're API-focused, as 70%+ of Node apps are.
The 20% Core Features (Master for 80% Proficiency)

App Setup and Listening:

const express = require('express'); const app = express(); app.listen(3000, () => console.log('Running'));
Fact: This handles 80% of server bootstrapping. Add process.env.PORT for production.


Routing Basics:

Methods: app.get('/', (req, res) => res.send('Home')); app.post('/users', (req, res) => res.json({ id: 1 }));
Params/Queries: app.get('/users/:id', (req, res) => res.send(req.params.id)); or req.query.search.
Router: For organization, const router = express.Router(); router.get('/sub', ...); app.use('/api', router);
80% impact: Routes define your API surface. Fact: Poor routing causes 80% of API bugs (e.g., unhandled methods).


Middleware Essentials:

Built-in: app.use(express.json()); for parsing JSON bodies (added in v4.16, standard since 2018).
Custom: app.use((req, res, next) => { console.log(req.method); next(); });—runs on every request.
Third-party: CORS (cors package) for cross-origin, helmet for security headers.
Fact: Middleware is Express's killer feature—80% of request lifecycle (auth, validation, logging) happens here. Chain them wisely to avoid performance hits.


Request/Response Handling:

Req: Access req.body, req.headers, req.ip.
Res: res.status(404).json({ error: 'Not found' }); res.redirect('/'); res.download('file.pdf');
Fact: JSON responses cover 80% of modern backends (REST/JSON APIs).


Error Handling:

Sync: Throw errors, caught by default handler.
Async: Use next(err) in middleware: app.use((err, req, res, next) => res.status(500).send('Error'));
Fact: Unhandled errors crash Node processes—master this for 80% reliability.



The 80% Advanced/Edge Features (Learn Later)

Templating: app.set('view engine', 'ejs');—for server-rendered HTML, but irrelevant for APIs (use React frontend).
Static Files: app.use(express.static('public'));—simple, but CDNs handle 80% in prod.
Advanced Routing: Route chaining, all methods (app.route('/').get(...).post(...);), regex paths.
Sessions/Cookies: Via cookie-parser, express-session—add for auth, but JWTs are stateless alternative.
More: Rate limiting (express-rate-limit), compression, websockets integration (but use Socket.io). Fact: These are <20% usage per GitHub analysis; optimize after basics.
Testing: Supertest for API tests—do after building.