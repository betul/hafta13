import React, { useRef } from 'react';

function App() {
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const bilgi = inputRef.current.value
    const regex = /\w{2,20}.*\w{2,30}/;
    if( regex.test(bilgi) ) {
      event.currentTarget.submit()
    } else {
      alert("Ad soyad en az iki kelime ve her kelime en az 2 harften oluşmalıdır.")
    }
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Ad Soyad:
        <input type="text" ref={inputRef} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default App