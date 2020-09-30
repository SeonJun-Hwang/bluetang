import { Nullable } from '~/src/global/types';
import Presenter from '~presenter/Editor';
import { get, use } from '~global/satellite';
import { getEmail, getUser, updateData } from '~global/firestore';
import { write } from '~global/localStorage';
import { DOC_TEXT, DOC_TITLE, NOW_DOC_ID } from '~global/constants';

class Model implements Presenter.Model {
  public async saveEditorStatus(text: string): Promise<Nullable<Date>> {
    const firebaseUser = getUser();
    use(DOC_TEXT, text);
    return firebaseUser ? this.saveFirestore(text) : this.saveLocal(text);
  }

  private saveLocal(text: string): Date {
    const title = get(DOC_TITLE);
    write(title, text);
    return new Date();
  }

  private async saveFirestore(text: string): Promise<Date> {
    return await updateData(getEmail()!, get(NOW_DOC_ID), text);
  }
}

export default Model;
