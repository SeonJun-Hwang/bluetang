import '~style/index.css';
import '~style/menu.css';
import '~style/reactive.css';
import '~style/fullscreen.css';
import '~style/animation.css';
import '~style/notice.css';
import '~style/modal.css';
import App from '~view/App';
import * as Auth from '@auth';

window.addEventListener('DOMContentLoaded', () => {
  Auth.init();
});

window.addEventListener('load', async () => {
  const app = new App();
  document.body.appendChild(app.create());
});
