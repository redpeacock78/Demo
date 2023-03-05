import { common } from "@libs/common.ts";

export class camoUtils {}
export namespace camoUtils {
  export const str2Hex = (str: string): string =>
    [...new TextEncoder().encode(str)]
      .map((num: number): string => num.toString(16))
      .join("");

  export const hex2Str = (hex: string): string =>
    new TextDecoder().decode(
      new Uint8Array(
        (hex.match(/.{1,2}/g) as RegExpMatchArray).map((str: string): number =>
          parseInt(str, 16)
        )
      )
    );

  export const generateDigest = common.curry(
    async (key: string, string?: string): Promise<string> => {
      if (!string) throw new Error();
      const cryptoKey: CryptoKey = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(key),
        { name: "HMAC", hash: "SHA-1" },
        false,
        ["sign"]
      );
      const hmac: ArrayBuffer = await crypto.subtle.sign(
        "HMAC",
        cryptoKey,
        new TextEncoder().encode(string)
      );
      return new Uint8Array(hmac).reduce(
        (str: string, byte: number): string =>
          str + byte.toString(16).padStart(2, "0"),
        ""
      );
    }
  );
}
