import { load } from "dotenv";

const env: Record<string, string> = await load();

export class envConsts {}
export namespace envConsts {
  export const PORT: number = Deno.env.get("PORT")
    ? Number(Deno.env.get("PORT"))
    : env["PORT"]
    ? Number(env["PORT"])
    : 8000;

  export const CAMO_HOSTNAME: string = Deno.env.get("CAMO_HOSTNAME")
    ? (Deno.env.get("CAMO_HOSTNAME") as string)
    : env["CAMO_HOSTNAME"]
    ? env["CAMO_HOSTNAME"]
    : "";

  export const CAMO_LENGTH_LIMIT: number = Deno.env.get("CAMO_LENGTH_LIMIT")
    ? Number(Deno.env.get("CAMO_LENGTH_LIMIT"))
    : env["CAMO_LENGTH_LIMIT"]
    ? Number(env["CAMO_LENGTH_LIMIT"])
    : 5242880;

  export const CAMO_SOCKET_TIMEOUT: number = Deno.env.get("CAMO_SOCKET_TIMEOUT")
    ? Number(Deno.env.get("CAMO_SOCKET_TIMEOUT"))
    : env["CAMO_SOCKET_TIMEOUT"]
    ? Number(env["CAMO_SOCKET_TIMEOUT"])
    : 10;

  export const CAMO_KEY: string = Deno.env.get("CAMO_KEY")
    ? (Deno.env.get("CAMO_KEY") as string)
    : env["CAMO_KEY"]
    ? env["CAMO_KEY"]
    : "0x24FEEDFACEDEADBEEFCAFE";

  export const CAMO_TIMING_ALLOW_ORIGIN: string = Deno.env.get(
    "CAMO_TIMING_ALLOW_ORIGIN"
  )
    ? (Deno.env.get("CAMO_TIMING_ALLOW_ORIGIN") as string)
    : env["CAMO_TIMING_ALLOW_ORIGIN"]
    ? env["CAMO_TIMING_ALLOW_ORIGIN"]
    : "";
}
