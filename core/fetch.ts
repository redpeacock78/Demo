import ky, { KyResponse } from "ky";
import { imgUtils } from "@utils/imgUtils.ts";
import { envConsts } from "@constants/envConsts.ts";
import { imgConsts } from "@constants/imgConsts.ts";

type StatusCode =
  | 100
  | 101
  | 102
  | 103
  | 200
  | 201
  | 202
  | 203
  | 204
  | 205
  | 206
  | 207
  | 208
  | 226
  | 300
  | 301
  | 302
  | 303
  | 304
  | 305
  | 306
  | 307
  | 308
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 420
  | 421
  | 422
  | 423
  | 424
  | 425
  | 426
  | 428
  | 429
  | 431
  | 444
  | 449
  | 450
  | 451
  | 499
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505
  | 506
  | 507
  | 508
  | 509
  | 510
  | 511
  | 598
  | 599;

export type KyError = {
  name: string;
  response: {
    code: string | number;
    title: string;
    status: StatusCode;
    reason: string;
  };
};

export type ErrorType = KyError | Error;

export type responseType = {
  data: Uint8Array;
  contentType: string;
};

export const fetch = async (url: string): Promise<responseType> => {
  try {
    const config = {
      timeout: envConsts.CAMO_SOCKET_TIMEOUT * 1000,
    };
    const resp: KyResponse = await ky.get(url, config);
    const data: ArrayBuffer = await resp.arrayBuffer();

    const contentLength = Number(resp.headers.get("content-length") || 0);

    if (contentLength > envConsts.CAMO_LENGTH_LIMIT) throw new Error();

    const isContentType: boolean =
      imgConsts.MIME_TYPES.some((i: string): boolean | undefined =>
        resp.headers.get("content-type")?.includes(i)
      ) || imgUtils.isImg(data);

    if (!isContentType) throw new Error();

    return {
      data: new Uint8Array(data),
      contentType:
        resp.headers.get("content-type") || `image/${imgUtils.imgType(data)}`,
    };
  } catch (e: unknown) {
    throw e as ErrorType;
  }
};
