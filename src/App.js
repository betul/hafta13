import { useRef, useState } from "react";

function App() {
  const [sayi, sayiGuncelle] = useState(0)
  
  const ozelSayi = useRef(1)

  if ( sayi > 5 ) {
    ozelSayi.current = 5
  }

  console.log(ozelSayi)

  return (
    <div>
      {sayi}
      <button onClick={ ()=>{ sayiGuncelle( oncekiSayi=>oncekiSayi+1 )  } }>Arttır</button>
    </div>
  );
}

export default App;