import '~style/index.css';
import '~style/animation.css';
import '~style/notice.css';
import '~style/modal.css';
import Controller from './controllers'

window.addEventListener( 'load', () => {
  const controller = new Controller();
  controller.init();
} );