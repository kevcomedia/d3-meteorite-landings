import * as d3 from './d3.exports.js';

const _tooltip = d3.select('body')
  .append('div')
  .attr('class', 'tooltip');

export const tooltip = {
  show() {
    _tooltip.style('opacity', 1);
  },
  hide() {
    _tooltip.style('opacity', 0);
  },
  html(fn) {
    _tooltip.html(fn());
  }
};
