// Componente que renderiza los dispositivos de un cuarto en la tabla.
function TablaCuartos(props) {
  return (
    <tr>
      <th scope="row">{props.id}</th>
      <td>{props.device.id}</td>
      <td>{props.device.name}</td>
      <td>{props.device.desired.value}</td>
    </tr>
  );
}

export default TablaCuartos;
