// Imports necesarios
import * as d3 from "d3";
import React, { useEffect } from "react";

// Componente encargado de la gráfica en forma de torta.
// Implementación basada de: https://ihsavru.medium.com/react-d3-implementing-a-pie-chart-dc7bf13ff418
function Grafica(props) {
  const { data, outerRadius, innerRadius } = props;

  const margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
  };

  const width = 2 * outerRadius + margin.left + margin.right;
  const height = 2 * outerRadius + margin.top + margin.bottom;

  const colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateCool)
    .domain([0, data.length]);

  useEffect(() => {
    drawChart();
  }, [drawChart]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function drawChart() {
    // Remove the old svg
    d3.select("#pie-container").select("svg").remove();

    // Create new svg
    const svg = d3
      .select("#pie-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const arcGenerator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pieGenerator = d3
      .pie()
      .padAngle(0)
      .value((d) => d.value);

    const arc = svg.selectAll().data(pieGenerator(data)).enter();

    // Se agregan tooltips para visualización cuando se pase el Mouse.
    var tooltip = d3
      .select("#pie-container")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px");

    function seleccionarSeccion() {
      tooltip.style("opacity", 2);

      d3.select(this)
        .style("stroke", "black")
        .style("opacity", 2)
        .style("stroke-width", 2);
    }

    function movimiento(posicion, datos) {
      const name = datos.data.label;
      tooltip
        .html(name + ": " + datos.data.value + " KwH")
        .style("left", posicion.pageX - 50 + "px")
        .style("top", posicion.pageY - 40 + "px")
        .style("display", "inline-block");
    }

    function salirSeccion() {
      d3.select(this)
        .style("stroke", "none")
        .style("opacity", 1)
        .style("stroke-width", 0);

      tooltip.style("opacity", 0).style("display", "none");
    }

    // Append arcs
    arc
      .append("path")
      .attr("d", arcGenerator)
      .style("fill", (_, i) => colorScale(i))
      .style("stroke", "#ffffff")
      .style("stroke-width", 0)
      .on("mouseover", seleccionarSeccion)
      .on("mousemove", movimiento)
      .on("mouseleave", salirSeccion);
  }
  return <div id="pie-container" />;
}

export default Grafica;
