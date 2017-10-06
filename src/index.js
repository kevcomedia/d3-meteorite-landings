import * as d3 from './d3.exports.js';
import tip from 'd3-tip';
import {urls} from './urls.js';

const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

// Dividing height by 1.7 cuts of Antarctica and some parts of northern
// landmasses, but there's nothing to show on those parts.
const projection = d3.geoMercator().translate([width / 2, height / 1.7]);
const path = d3.geoPath().projection(projection);

const radiusScale = d3.scalePow().exponent(0.75)
  .range([1, 30]);

const colorScale = d3.scalePow().exponent(0.1)
  .range(['#e4ff1a', '#ff5714']);

const tooltip = tip().attr('class', 'tooltip');

d3.json(urls.worldMap, (geojson) => {
  svg.append('path')
    .attr('class', 'worldMap')
    .attr('d', path(geojson));

  d3.json(urls.meteoriteLandings, ({features}) => {
    const plottableFeatures = features.filter((f) => f.geometry);
    const massExtent = d3.extent(plottableFeatures, (d) => +d.properties.mass);

    radiusScale.domain(massExtent);
    colorScale.domain(massExtent);

    tooltip.html(({properties}) => {
      const year = new Date(properties.year).getFullYear();
      const massFormat = d3.format(',');
      const latLongFormat = d3.format('.6');

      return `<h2>${properties.name} (${year})</h2>
        <dl>
          <dt>Class</dt>
          <dd>${properties.recclass}</dd>
          <dt>Mass</dt>
          <dd>${massFormat(properties.mass)}</dd>
          <dt>Rec. Lat.</dt>
          <dd>${latLongFormat(properties.reclat)}</dd>
          <dt>Rec. Long.</dt>
          <dd>${latLongFormat(properties.reclong)}</dd>
        </dl>`;
    });
    svg.call(tooltip);

    svg.selectAll('circle')
      .data(plottableFeatures)
      .enter()
      .append('circle')
      .attr('r', (d) => radiusScale(+d.properties.mass))
      .attr('cx', (d) => projection(d.geometry.coordinates)[0])
      .attr('cy', (d) => projection(d.geometry.coordinates)[1])
      .attr('fill', (d) => colorScale(+d.properties.mass))
      .attr('opacity', 0.75)
      .on('mouseenter', tooltip.show)
      .on('mouseout', tooltip.hide);
  });
});
