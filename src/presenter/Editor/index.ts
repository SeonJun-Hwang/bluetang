import EditorModel from '~model/Editor';
import { Nullable } from '~global/types';
import { use } from '~global/satellite';
import { DOC_TEXT } from '~global/constants';

namespace EditorPresenter {
  export class Contact {
    private view: View;
    private model: Model;

    constructor(view: View) {
      this.view = view;
      this.model = new EditorModel();
    }

    public async save(text: string): Promise<any> {
      const saveTime = await this.model.saveEditorStatus(text);
      this.view.notifySaveResult(saveTime);
    }
  }

  export interface View {
    notifySaveResult(result: Nullable<Date>): void;
  }

  export interface Model {
    saveEditorStatus(text: string): Promise<Nullable<Date>>;
  }
}

export default EditorPresenter;
