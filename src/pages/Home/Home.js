import React from "react";

// HoC
import withHeader from "../../hoc/withHeader";

// CSS
import "./style.css";

function Home() {
  return (
    <main>
      <div className="">
        <h1>Home</h1>
      </div>
    </main>
  );
}

export default withHeader(Home);
