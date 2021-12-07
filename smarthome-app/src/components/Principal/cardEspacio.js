// Componente encargado de renderizar las cards de los espacios.
function CardEspacio(props) {
  function seleccionarImagen(nombre)
  {
    if(nombre.toLowerCase().includes("casa")){
        return "assets/images/casa.png";
    }
    else if(nombre.toLowerCase().includes("apartamento")){
        return "assets/images/apartamento.png";
    }
    else{
        return "";
    }
  }
  
  return (
    <div className="col-3">
      <div className="card" onClick={() => props.onClick(props.id)}>
        <img className="card-img-top" src={seleccionarImagen(props.card.name)} alt={props.card.name}></img>
        <div className="card-body">
          <h5 className="card-title titulo-tarjeta">{props.card.name}</h5>
          <p className="card-text">
             {props.card.address}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardEspacio;
