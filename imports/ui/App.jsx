import React from "react";
import { Hello } from "./Hello.jsx";
import { Info } from "./Info.jsx";

export const App = () => (
  <div>
    <h1 className="font-bold text-rose-500">Tic tac toe</h1>
    <Hello />
    <Info />
  </div>
);
