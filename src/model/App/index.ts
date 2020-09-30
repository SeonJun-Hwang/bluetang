import Presenter from '~presenter/App';
import { read, write } from '~global/localStorage';
import { use } from '~global/satellite';
import { getLatest } from '~global/firebase';
import { readData } from '~global/firestore';
import { DEFAULT_TITLE, DEFAULT_TEXT, NOW_DOC_ID } from '~global/constants';
import fb from 'firebase/app';
import { Nullable } from '~/src/global/types';

class AppModel implements Presenter.Model {
  public async loadSavedDocument(user: Nullable<fb.User>): Promise<string[]> {
    const [title, text] = user ? await this.loadOnCloud(user) : this.loadOnLocal();
    return [title, text];
  }

  private async loadOnCloud({ email }: fb.User): Promise<Array<string>> {
    const latest = await getLatest(email!);
    use(NOW_DOC_ID, latest);
    const { title, text } = await readData(email!, latest);
    return [title || DEFAULT_TITLE, text || DEFAULT_TEXT];
  }

  private loadOnLocal(): Array<string> {
    const { title, text } = read();
    return [title || DEFAULT_TITLE, text || DEFAULT_TEXT];
  }
}

export default AppModel;
