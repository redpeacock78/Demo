import { serve } from "serve";
import { Context, Hono } from "hono";
import { common } from "@libs/common.ts";
import { camoUtils } from "@utils/camoUtils.ts";
import { envConsts } from "@constants/envConsts.ts";
import { fetch, responseType, ErrorType, KyError } from "@core/fetch.ts";

const generateDigest = camoUtils.generateDigest(envConsts.CAMO_KEY);

const app = new Hono();

app.get("/:digest", async (c: Context) => {
  const digest: string = c.req.param("digest");
  const imgUrl: string = c.req.query("url") as string;
  const decodeImgUrl: string = decodeURIComponent(imgUrl);
  const checkUrl: boolean =
    decodeImgUrl === imgUrl && !common.isUrl(decodeImgUrl);
  const checkDigest: boolean = (await generateDigest(decodeImgUrl)) !== digest;

  if (imgUrl === "") return c.text("", 500);
  if (checkUrl) return c.text("", 500);
  if (checkDigest) return c.text("", 500);

  return await fetch(decodeImgUrl)
    .then((resp: responseType) => {
      c.header("Camo-Host", envConsts.CAMO_HOSTNAME || "unknown");
      if (envConsts.CAMO_TIMING_ALLOW_ORIGIN)
        c.header("Timing-Allow-Origin", envConsts.CAMO_TIMING_ALLOW_ORIGIN);
      c.header("Content-Type", resp.contentType);
      return c.body(resp.data);
    })
    .catch((err: ErrorType) =>
      (err as KyError).response.status
        ? c.text("", (err as KyError).response.status)
        : c.text("", 500)
    );
});

app.get("/:digest/:imgUrl", async (c: Context) => {
  const digest = c.req.param("digest");
  const imgUrl: string = camoUtils.hex2Str(c.req.param("imgUrl"));
  const decodeImgUrl: string | undefined = common.isUrl(imgUrl)
    ? imgUrl
    : common.isUrl(decodeURIComponent(imgUrl))
    ? decodeURIComponent(imgUrl)
    : undefined;
  const urlDigest = await generateDigest(imgUrl);
  const decodeUrlDigest = await generateDigest(imgUrl);
  const checkDigest: boolean =
    digest !== urlDigest || digest !== decodeUrlDigest;

  if (!decodeImgUrl) return c.text("", 500);
  if (checkDigest) return c.text("", 500);

  return await fetch(decodeImgUrl)
    .then((resp: responseType) => {
      c.header("Camo-Host", envConsts.CAMO_HOSTNAME || "unknown");
      if (envConsts.CAMO_TIMING_ALLOW_ORIGIN)
        c.header("Timing-Allow-Origin", envConsts.CAMO_TIMING_ALLOW_ORIGIN);
      c.header("Content-Type", resp.contentType);
      return c.body(resp.data);
    })
    .catch((err: ErrorType) =>
      (err as KyError).response.status
        ? c.text("", (err as KyError).response.status)
        : c.text("", 500)
    );
});

serve((r) => app.fetch(r), {
  port: envConsts.PORT,
});
