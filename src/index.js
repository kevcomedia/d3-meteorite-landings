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
});
