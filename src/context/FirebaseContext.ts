import { createContext } from "react";
import { IStorage } from "../types/IStorage";

export const FirebaseContext = createContext({} as IStorage);