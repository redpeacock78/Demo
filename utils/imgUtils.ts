import { imgConsts } from "@constants/imgConsts.ts";

export class imgUtils {}
export namespace imgUtils {
  export const isImg = (arrayBuffer: ArrayBuffer): boolean =>
    imgConsts.FILE_TYPES.some(
      (str: string): boolean =>
        [...Array(10).keys()]
          .map((num: number): string =>
            String.fromCharCode(new Uint8Array(arrayBuffer)[num])
          )
          .join("")
          .indexOf(str) !== -1
    );

  export const imgType = (arrayBuffer: ArrayBuffer) =>
    imgConsts.FILE_TYPES.map(
      (str: string): string =>
        ([...Array(10).keys()]
          .map((num: number): string =>
            String.fromCharCode(new Uint8Array(arrayBuffer)[num])
          )
          .join("")
          .indexOf(str) !== -1 &&
          str) ||
        ""
    )
      .join("")
      .replace("ffd8", "jpeg")
      .toLowerCase();
}
