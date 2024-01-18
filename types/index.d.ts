type TicketColor =
  | "pink"
  | "red"
  | "purple"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "lime";

type TicketType = "1" | "2";

type Ticket = {
  id: number;
  type: TicketType;
  color: TicketColor;
  map: string[][];
};

interface Player {
  name: string;
  tickets: number[];
}
