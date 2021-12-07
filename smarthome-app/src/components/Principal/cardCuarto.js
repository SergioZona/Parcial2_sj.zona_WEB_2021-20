// Componente encargado de renderizar las cards de los cuartos.
function CardCuarto(props) {
  function seleccionarImagen(nombre) {
    if (nombre.toLowerCase().includes("living")) {
      return "assets/images/sala.png";
    } else if (nombre.toLowerCase().includes("kitchen")) {
      return "assets/images/cocina.png";
    } else if (nombre.toLowerCase().includes("dinner")) {
      return "assets/images/comedor.png";
    } else {
      return "";
    }
  }

  return (
    <div className="col-2">
      <div className="card" onClick={() => props.onClick(props.card.devices)}>
        <div className="card-body">
          <h5 className="card-title titulo-tarjeta">{props.card.name}</h5>
        </div>
        <img
          className="card-img-top"
          src={seleccionarImagen(props.card.name)}
          alt={props.card.name}
        ></img>
      </div>
    </div>
  );
}

export default CardCuarto;
