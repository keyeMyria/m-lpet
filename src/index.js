import 'babel-polyfill';
import dva from 'dva';
import Loading from 'dva-loading';
import './utils/flex'
import './index.less';
import FastClick from './utils/fastclick'

if ('addEventListener' in document) {
  window.addEventListener('load', function() {
    FastClick.attach(document.body);
  }, false);
}

// 1. Initialize
const app = dva({
  onError(err, dispatch) {
    // console.error(err);
  }
});

// 2. Plugins
app.use(Loading());

// 3. Model
// app.model(require('./models/login'));

// 4. Router
app.router(require('./router.jsx'));

// 5. Start
app.start('#root');
