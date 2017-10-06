let worldMapUrl;
let meteoriteLandingsUrl;

if (process.env.NODE_ENV == 'production') {
  worldMapUrl = 'https://raw.githubusercontent.com/enjalot/wwsd/master/data/world/world-110m.geojson';
  meteoriteLandingsUrl = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json';
} else {
  worldMapUrl = '../data/world-110m.geojson';
  meteoriteLandingsUrl = '../data/meteorite-strike-data.json';
}

export const urls = {
  worldMap: worldMapUrl,
  meteoriteLandings: meteoriteLandingsUrl
};
