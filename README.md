# Demo

🔒 an http proxy to route images through SSL

## 🦕 About
This is a [Deno](https://github.com/denoland/deno) implementation of [Camo](https://github.com/atmos/camo).  
> The name comes from the simple "Deno + Camo".  
> This is by no means a **demo version**.

## 🔗 URL Formats
Supports two distinct URL formats:
```
http://example.org/<digest>?url=<image-url>
http://example.org/<digest>/<image-url>
```
The <digest> is a 40 character hex encoded HMAC digest generated with a shared secret key and the unescaped <image-url> value. The <image-url> is the absolute URL locating an image. In the first format, the <image-url> should be URL escaped aggressively to ensure the original value isn't mangled in transit. In the second format, each byte of the <image-url> should be hex encoded such that the resulting value includes only characters [0-9a-f].

## 🛠 Configuration
The following environment variables are accepted.
- `PORT`: The port number Camo should listen on. (default: 8000)
- `CAMO_KEY`: A shared key consisting of a random string, used to generate the HMAC digest.
- `CAMO_LENGTH_LIMIT`: The maximum `Content-Length` Camo will proxy. (default: 5242880)
- `CAMO_SOCKET_TIMEOUT`: The maximum number of seconds Camo will wait before giving up on fetching an image. (default: 10)
- `CAMO_TIMING_ALLOW_ORIGIN`: The string for Camo to include in the [`Timing-Allow-Origin` header](http://www.w3.org/TR/resource-timing/#cross-origin-resources) it sends in responses to clients. The header is omitted if this environment variable is not set. (default: not set)
- `CAMO_HOSTNAME`: The `Camo-Host` header value that Camo will send. (default: unknown)

## ▶️ Usage
Startup can be done with the following command.
```bash
$ deno run --allow-env --allow-read --allow-net --import-map import_map.json --lock deno.lock --log-level info --config deno.json index.ts
```
With [Denon](https://github.com/denosaurs/denon), the following commands can also be invoked
```bash
$ denon start
```
If you wish to use environment variables, you can create an `.env` file and use it, or you can specify it directly on the shell.

## 🥝 License
This source code is licensed [MIT](https://github.com/redpeacock78/Demo/blob/master/LICENCE).