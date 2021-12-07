// Imports necesarios
import React from "react";
import { useState, useEffect } from "react";
import CardEspacio from "./cardEspacio";
import CardCuarto from "./cardCuarto";
import TablaCuartos from "./tablaCuartos";
import Grafica from "./grafica";
import {FormattedMessage} from 'react-intl';

// Verntana principal de la aplicación
export default function Principal() {

  //Estados necesarios, se actualizan cuando los datos se encuentran en la aplicación.
  const [espacios, setEspacios] = useState([]);
  const [cuartos, setCuartos] = useState([]);
  const [espacioActual, setEspacioActual] = useState("");
  const [cuartosActual, setCuartosActual] = useState([]);
  const [costosCuartoEspacioActual, setCostosCuartoEspacioActual] = useState([]);
  const [devicesActual, setDevicesActual] = useState([]);
  const dict = { 0: "H001", 1: "H002", 2: "A001", 3: "A002" };

  // Se traen los datos del back con el Hook useEffect.
  useEffect(() => {
    const URLEspacios =
      "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json";
    const URLCuartos =
      "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json";

    async function obtenerEspacios() {
      // Se implementa funcionalidad PWA, el almacenamiento se efectúa en el localStorage.
      if(!navigator.onLine){
        if(localStorage.getItem("espacios") === null) {
            setEspacios("Cargando espacios...")
        } else {
            setEspacios(localStorage.getItem("espacios"));
        }
      } else {
        await fetch(URLEspacios)
        .then((response) => response.json())
        .then((data) => {
          setEspacios(data);
          localStorage.setItem("espacios", JSON.stringify(data));
        });
      }     
    }

    async function obtenerCuartos() {
      // Se implementa funcionalidad PWA, el almacenamiento se efectúa en el localStorage.
      if(!navigator.onLine){
        if(localStorage.getItem("cuartos") === null) {
            setEspacios("Cargando cuartos...")
        } else {
            setEspacios(localStorage.getItem("cuartos"));
        }
      } else {
        await fetch(URLCuartos)
        .then((response) => response.json())
        .then((data) => {
          setCuartos(data);
          localStorage.setItem("cuartos", JSON.stringify(data));
        });
      }     
    }

    async function cargarDatos() {
      await obtenerEspacios();
      await obtenerCuartos();
    }
    cargarDatos();
  }, []);

  // Actualiza los datos una vez se da click en un espacio.
  function renderizarCuartosEspacio(id) {
    let cuartosFiltrados = [];
    let costosCuartosEspacioActual = [];
    for (let i = 0; i < cuartos.length; i++) {
      if (cuartos[i].homeId.localeCompare(dict[id]) === 0) {
        cuartosFiltrados.push(cuartos[i]);
        costosCuartosEspacioActual.push({
          label: cuartos[i].name,
          value: cuartos[i].powerUsage.value,
        });
      }
    }
    setCuartosActual(cuartosFiltrados);
    setCostosCuartoEspacioActual(costosCuartosEspacioActual);
    setEspacioActual(dict[id]);
  }

  // Renderiza los dispositivos de la tabla al dar click en un cuarto.
  function renderizarTablaDevices(devices){
    setDevicesActual(devices);
  }

  // Renderizado y retorno del componente principal.
  return (
    <div>
      <div className="row titulo-espacios">
        <h1><FormattedMessage id="Titulo-espacios"/></h1>
      </div>
      <div className="container-espacios">
        <div className="row">
          {espacios.map((e, id) => (
            <CardEspacio
              card={e}
              key={id}
              id={id}
              onClick={renderizarCuartosEspacio}
            />
          ))}
        </div>
      </div>
      {espacioActual !== "" && (
        <div className="container-cuartos">
          <div className="row titulo-cuartos">
            <h1><FormattedMessage id="Titulo-cuartos"/></h1>
          </div>
          <div className="row">
            {cuartosActual.map((e, id) => (
              <CardCuarto
                card={e}
                key={id}
                id={id}
                onClick={renderizarTablaDevices}
              />
            ))}
            { devicesActual.length!==0 &&(
            <div className="col-6">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col"><FormattedMessage id="Dispositivo-tabla"/></th>
                    <th scope="col"><FormattedMessage id="Valor-tabla"/></th>
                  </tr>
                </thead>
                <tbody>
                  {devicesActual.map((d, id) => (
                    <TablaCuartos device={d} key={id} id={id} />
                  ))}
                </tbody>
              </table>
            </div>
            )}
          </div>
          <div className="row titulo-estadisticas">
            <h1><FormattedMessage id="Titulo-estadisticas"/></h1>
          </div>
          <div className="container-fluid contenedor-grafica">
            <div className="d-flex justify-content-center" id="descripcion-estadisticas">
              <p><FormattedMessage id="Descripcion-grafica"/></p>
            </div>
            <div className="d-flex justify-content-center">
              <Grafica
                data={costosCuartoEspacioActual}
                innerRadius={0}
                outerRadius={150}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
