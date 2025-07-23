import React from "react";
import { createBoard } from "@wixc3/react-board";
import NavBar from "../../components/layout/NavBar.jsx";

export default createBoard({
  name: "New Board",
  Board: () => (
    <div>
      <NavBar />
    </div>
  ),
});
