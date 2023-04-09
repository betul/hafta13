import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({ hits: [] })
  const [sorgu, sorguGuncelle] = useState("react")
  const [ara, araGuncelle] = useState("react")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function veriCek() {
      setIsLoading(true)

      const sonuc = await axios(`https://hn.algolia.com/api/v1/search?query=${ara}`)
      setData(sonuc.data)

      setIsLoading(false)
    };

    veriCek();

  }, [ara]);

  return (
    <div className='container'>
      <div className='row my-4'>
        <div className='col-md-6'>
          <input
            type="text"
            value={sorgu} className='form-control'
            onChange={event => sorguGuncelle(event.target.value)}
          />
        </div>
        <div className='col-md-4'><button type="button" className="btn-md btn btn-primary" onClick={() => araGuncelle(sorgu)}>
          Ara
        </button></div>
      </div>



      <h1 className='h2'>"{ara}" ile ilgili haberler: </h1>
      {isLoading ? (
        <div>Yükleniyor ...  
           <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(20,20)">
          <circle r="18" fill="none" stroke="#ccc" stroke-width="2"></circle>
          <path d="M0,-18 V-22.5 A18,-18 0 0,1 18,-4.5Z" fill="#ccc">
            <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="1s" repeatCount="indefinite" />
          </path>
        </g>
      </svg>
      
      </div>
      ) : (
        <ul className='list list-unstyled card mt-3'>
          {data.hits.map(item => (
            <li className="border px-2 py-2" key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;