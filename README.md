# express-request-id

Middleware for [express](https://www.npmjs.com/package/express) to generate or propagate `X-Request-ID` (or other custom) request header.

<a href="https://www.npmjs.com/package/@gfx687/express-request-id" rel="nofollow"><img alt="npm" src="https://img.shields.io/npm/v/@gfx687/express-request-id"></a>
<a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/npm/l/@gfx687/express-request-id" alt="License"></a>

## Installation

Install [@gfx687/express-request-id](https://www.npmjs.com/package/@gfx687/express-request-id) with:

`npm install @gfx687/express-request-id`

Peer dependencies:

- [express](https://www.npmjs.com/package/express)

## Usage

Basic usage example:

```typescript
import express from "express";
import { requestID } from "@gfx687/express-request-id";

const app = express();
const port = 3000;

app.use(requestID());

app.get("/", (req: express.Request, res: express.Response) => {
  res.send(`Request with ID=${req.id} received!`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

### Accessing Request ID

Request ID is accessible via `express.Request` object's `id` field.

Example:

```typescript
app.get("/", (req: express.Request, res: express.Response) => {
  res.send(`Request with ID=${req.id} received!`);
});
```

### Customizing Middleware

Middleware accepts options object of the following format:

```typescript
type Options = {
  // default = node's crypto.randomUUID()
  generator?: (request: Request) => string;

  // default = 'X-Request-ID'
  headerName?: string;

  // default = true
  setResponseHeader?: boolean;
};
```

Usage example:

```typescript
app.use(
  requestID({
    generator: (expressRequest) => customIdGenerator(expressRequest),
    headerName: "correlation-id",
    setResponseHeader: false,
  })
);
```
