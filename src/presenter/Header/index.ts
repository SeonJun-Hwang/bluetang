import HeaderModel from '~model/Header';
import { Nullable } from '~global/types';

namespace HeaderPresenter {
  export class Contact {
    private view: View;
    private model: Model;

    constructor(view: View) {
      this.view = view;
      this.model = new HeaderModel();
    }

    public async save(title: string) {
      const date = await this.model.saveHeader(title);
      this.view.notifySaveResult(date);
    }
  }

  export interface View {
    notifySaveResult(result: Nullable<Date>): void;
  }

  export interface Model {
    saveHeader(title: string): Promise<Date>;
  }
}

export default HeaderPresenter;
