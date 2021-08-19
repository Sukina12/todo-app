import React, { useContext } from "react";
import { ListContext } from "../../context/setting/listContext";
import { H2 } from "@blueprintjs/core";

function Options() {
  const { listContext } = useContext(ListContext);
  return (
    <form className="options" onSubmit={listContext}>
      <H2>Options</H2>
      <label>Show Incomplete ToDo when start </label> <br />
      <div>
        <input type="radio" name="incomplete" value={false} /> No
        <input type="radio" name="incomplete" value={false} /> Yes
      </div>
      <br />
      <label>Select Number Of ToDo items to display in One Page : </label>{" "}
      <br />
      <select name="pageNumber" id="">
        <option disabled>Select One</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="6">6</option>
      </select>{" "}
      <br />
      <input type="submit" value="listContext" />
    </form>
  );
}

export default Options;