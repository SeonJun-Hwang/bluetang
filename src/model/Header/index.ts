import Presenter from '~presenter/Header';
import { use, get } from '~global/satellite';
import { write } from '~global/localStorage';
import { getEmail, getUser, updateTitle } from '~global/firestore';
import { DOC_TEXT, DOC_TITLE, NOW_DOC_ID } from '~/src/global/constants';

class HeaderModel implements Presenter.Model {
  public async saveHeader(title: string): Promise<Date> {
    const firebaseUser = getUser();
    use(DOC_TITLE, title);
    return firebaseUser ? this.saveFirestore(title) : this.saveLocal(title);
  }

  private saveLocal(title: string): Date {
    const text = get(DOC_TEXT);
    write(title, text);
    return new Date();
  }

  private async saveFirestore(title: string): Promise<Date> {
    return await updateTitle(getEmail()!, get(NOW_DOC_ID), title);
  }
}

export default HeaderModel;
