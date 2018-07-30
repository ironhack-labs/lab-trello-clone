const path = require('path');

module.exports = (app) => {
  app.use('/api/list', require('./api/list'));
  app.use('/api/card', require('./api/card'));

/*   // catch 404 and forward to Angular
  app.all('/*', (req, res) => {
    res.sendfile(__dirname + '/public/index.html');
  }); */
};