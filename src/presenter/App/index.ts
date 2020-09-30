import { Nullable } from '~/src/global/types';
import AppModel from '~model/App';

namespace AppPresenter {
  export class Contact {
    private view: View;
    private model: Model;

    constructor(view: View) {
      this.view = view;
      this.model = new AppModel();
    }

    public async initBluetang(user: Nullable<firebase.User>) {
      const [title, text] = await this.model.loadSavedDocument(user);
      this.view.initView(title, text);
    }
  }

  export interface View {
    initView(title: string, text: string): void;
  }

  export interface Model {
    loadSavedDocument(user: Nullable<firebase.User>): Promise<Array<string>>;
  }
}

export default AppPresenter;
