/**
 * A simple {@link Promise} timeout to give some delay
 *
 * @param ms The time to delay (in millisecond)
 */
export const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const requestLog = (
  method: string = "",
  url: string = "",
  data: any,
  type: "req" | "res" | "err"
) => {
  const tag = type === "req" || type === "res" ? method : "error";
  const colors = {
    req: "blue",
    res: "green",
    err: "red",
  };
  const icons = {
    req: ">>>",
    res: "<<<",
    err: "xxx",
  };

  __DEV__ &&
    console.log(
      `%c${icons[type]} [${tag.toUpperCase()}] | %c${url.toUpperCase()} \n`,
      `color: ${colors[type]}; font-weight: bold`,
      "color: orange; font-weight: bold",
      data
    );

  __DEV__ && type === "req" &&
    console.log(
      `%c${icons[type]} [PARAMS] | %c${url.toUpperCase()} \n`,
      `color: ${colors[type]}; font-weight: bold`,
      "color: orange; font-weight: bold",
      data?.data
    );
};
