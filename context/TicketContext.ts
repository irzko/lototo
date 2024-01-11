import React from "react";

type TicketContextType = [
  Ticket[],
  React.Dispatch<React.SetStateAction<Ticket[]>>
];

const TicketContext = React.createContext<TicketContextType>(
  {} as TicketContextType
);
export default TicketContext;
