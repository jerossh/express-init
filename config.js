const serveStatic = require('serve-static');

function setCustomCacheControl(res, path) {
    if (serveStatic.mime.lookup(path) === 'text/html') {
        // Custom Cache-Control for HTML files
        res.setHeader('Cache-Control', 'public, max-age=0');
    }
}

const staticOption = {
    dotfiles: 'ignore',
    etag: true,
    extensions: false,
    index: false,
    lastModified: true,
    maxAge: '1d',
    redirect: true,
    setHeaders: setCustomCacheControl
};

const c = {
  'name': 'type-here-program-name',
  'secret': 'program',
  'port': 3000,
  'staticOption': staticOption,
  'programSetting': {

  }
}
