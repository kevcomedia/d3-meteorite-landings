import * as d3 from './d3.exports.js';
import {urls} from './urls.js';

const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

// Dividing height by 1.7 cuts of Antarctica and some parts of northern
// landmasses, but there's nothing to show on those parts.
const projection = d3.geoMercator().translate([width / 2, height / 1.7]);
const path = d3.geoPath().projection(projection);

d3.json(urls.worldMap, (geojson) => {
  svg.append('path')
    .attr('class', 'worldMap')
    .attr('d', path(geojson));

  d3.json(urls.meteoriteLandings, ({features}) => {
    const plottableFeatures = features.filter((f) => f.geometry);

    svg.selectAll('circle')
      .data(plottableFeatures)
      .enter()
      .append('circle')
      .attr('r', 3)
      .attr('cx', (d) => projection(d.geometry.coordinates)[0])
      .attr('cy', (d) => projection(d.geometry.coordinates)[1])
      .attr('fill', 'rgba(255,128,0,.5)');
  });
});
