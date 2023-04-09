import React from "react";

function Filmler({ filmler }) {
  return (
    <div className="col-md-6">
      <h2>Karakterin yer aldığı filmler:</h2>
      <ul>
        {filmler?.map((film) => (
          <li key={film.url}>{film.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(Filmler);
