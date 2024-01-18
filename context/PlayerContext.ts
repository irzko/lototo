import { createContext } from "react";

type UserContextType = [Player, React.Dispatch<React.SetStateAction<Player>>];

const PlayerContext = createContext<UserContextType>({} as UserContextType);
export default PlayerContext;
