import { lottoTickets } from "./lottoMap";

export default function findTicketById(id: number) {
  const ticketsLength = lottoTickets.length;
  for (let i = 0; i < ticketsLength; i++) {
    if (lottoTickets[i].id === id) {
      return lottoTickets[i];
    }
  }
  return null;
}
