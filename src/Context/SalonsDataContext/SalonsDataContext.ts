import { createContext, useContext } from "react";
import { IRoot } from "../../DummyData";

export const SalonsDataContext = createContext<any>([]);

export const useSalonsDataContext = () => useContext(SalonsDataContext);
