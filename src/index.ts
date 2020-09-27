import '~style/index.css';
import '~style/menu.css';
import '~style/reactive.css';
import '~style/fullscreen.css';
import '~style/animation.css';
import '~style/notice.css';
import '~style/modal.css';
import Controller from './controllers';
import { init } from './auth';

window.addEventListener('load', async () => {
  init();
  const controller = new Controller();
  controller.init();
});
