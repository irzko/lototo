import { lottoTickets } from "./lottoMap";

export default function findTicketById(id: number) {
  return lottoTickets.find((ticket) => ticket.id === id);
}
