import { assertEquals } from "asserts";
import { camoUtils } from "@utils/camoUtils.ts";

Deno.test("Test str2Hex()", (): void => {
  const hex = camoUtils.str2Hex("http://www.vim.org/images/vim_header.gif");
  const expected =
    "687474703a2f2f7777772e76696d2e6f72672f696d616765732f76696d5f6865616465722e676966";
  assertEquals(hex, expected);
});

Deno.test("Test hex2Str()", (): void => {
  const str = camoUtils.hex2Str(
    "687474703a2f2f7777772e76696d2e6f72672f696d616765732f76696d5f6865616465722e676966"
  );
  const expected = "http://www.vim.org/images/vim_header.gif";
  assertEquals(str, expected);
});

Deno.test("Test generateDigest()", async (): Promise<void> => {
  const CAMO_KEY = "0x24FEEDFACEDEADBEEFCAFE";
  const generateDigest = camoUtils.generateDigest(CAMO_KEY);
  const digest = await generateDigest(
    "http://www.vim.org/images/vim_header.gif"
  );
  const expected = "3155cafd81ea0acd624c325b9f6b3f67cb45db6b";
  assertEquals(digest, expected);
});
