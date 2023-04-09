import { useEffect, useState } from "react";
import Karakter from "./Karakter";
import Filmler from "./Filmler";

function App() {
  const [karakter, karakterGuncelle] = useState(null);
  const [kisiNo, kisiNoGuncelle] = useState("");
  const [hata, hataGuncelle] = useState(null);
  const [filmler, filmlerGuncelle] = useState(null);

  const veriCek = async () => {
    if (kisiNo) {
      const response = await fetch(`https://swapi.dev/api/people/${kisiNo}/`);

      if (response.status === 404) {
        //kişi bulunamadı
        hataGuncelle("Kişi bulunamadı");
        karakterGuncelle(null);
      } else {
        const veri = await response.json();
        karakterGuncelle(veri);
        hataGuncelle(null);
      }
    }
  };

  useEffect(() => {
    if (karakter) {
      const fetchFilmler = async () => {
        const promises = karakter.films.map((filmUrl) =>
          fetch(filmUrl).then((response) => response.json())
        );
        const filmler = await Promise.all(promises);
        filmlerGuncelle(filmler);
      };
      fetchFilmler();
    } else {
      filmlerGuncelle(null);
    }
  }, [karakter]);

  function aramaYap() {
    veriCek();
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <input
            value={kisiNo}
            className="form-control mt-3"
            onChange={(olay) => {
              kisiNoGuncelle(olay.target.value);
            }}
            type="number"
          />
          <button className="btn btn-success my-3" onClick={aramaYap}>
            Bul
          </button>
        </div>
      </div>

      {karakter ? (
        <div className="row">
          <Karakter person={karakter} />
          {filmler ? <Filmler filmler={filmler} /> : null}
        </div>
      ) : (
        <div>Lütfen bir kişi no girin ve arama butonuna basın.</div>
      )}
    </div>
  );
}

export default App;
