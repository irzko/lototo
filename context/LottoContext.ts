import React from "react";
import { createContext } from "react";

type LottoContextProps = [
  {
    color: TicketColor;
    type: TicketType;
  },
  React.Dispatch<
    React.SetStateAction<{
      color: TicketColor;
      type: TicketType;
    }>
  >
];

const LottoContext = createContext<LottoContextProps>({} as LottoContextProps);

export default LottoContext;
