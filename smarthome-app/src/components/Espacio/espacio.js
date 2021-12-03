import React from "react";
//import PartidosLigasHTML from "";
import { useState, useEffect } from "react";

export default function PartidosLigas(props) {
  const [espacios, setEspacios] = useState([]);

  useEffect(() => {
    const URL = "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json";
    fetch(URL)
    .then(response => response.json())
    .then(data => {
        setEspacios(data);
        console.log(data);
    });
  }, []);

  return (
    <div>
      Sirvio
    </div>
  );
}
