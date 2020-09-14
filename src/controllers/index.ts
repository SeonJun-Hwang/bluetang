import FullScreen from "./FullScreen";
import Editor from "./Editor";
import Presenter from "./Presenter";
import Menu from "./Menu";
import Mobile from "./Mobile";
import LocalStorage from "~utils/localStorage";
import { base64ToStr } from "~utils/strings";
import { KEYS, DEFAULT_TEXT } from "./constants";
import Notice from "~components/Notice";

class Controller {
  private notice?: Notice; // Lazy init
  private presenter = new Presenter();
  private fullScreen = new FullScreen(this.presenter);
  private editor = new Editor(this.presenter);
  private menu = new Menu(this.editor);
  private mobile = new Mobile();

  constructor() {}

  public init() {
    this.setUpView();
  }

  private setUpView() {
    const value = LocalStorage.load(KEYS.storage);
    let initValue: string;
    let needSave = false;
    try {
      initValue = value ? base64ToStr(value) : DEFAULT_TEXT;
    } catch (exception) {
      if (!this.notice) this.notice = new Notice("기록을 불러오던 중 문제가 발생했습니다.");
      this.notice.show();
      initValue = DEFAULT_TEXT;
      needSave = true;
    }
    this.editor.update(initValue, needSave);
  }
}

export default Controller;
