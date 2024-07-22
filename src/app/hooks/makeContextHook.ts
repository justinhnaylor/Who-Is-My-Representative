import * as React from "react";
type NonUndefined<T> = T extends undefined ? never : T;

//Custom hook to ensure that our context values are not "undefined".
const makeContextHook = <T>(context: React.Context<T>) => {
  return () => {
    const contextValue = React.useContext(context);
    if (contextValue === undefined) {
      throw new Error("Context must be used within a Context Provider!");
    }
    return contextValue as NonUndefined<T>;
  };
};

export default makeContextHook;
