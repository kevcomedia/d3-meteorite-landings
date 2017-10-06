let worldMapUrl;

if (process.env.NODE_ENV == 'production') {
  worldMapUrl = 'https://raw.githubusercontent.com/enjalot/wwsd/master/data/world/world-110m.geojson';
} else {
  worldMapUrl = '../data/world-110m.geojson';
}

export const urls = {
  worldMap: worldMapUrl
};
