import Presenter from '~presenter/Menu';
import { saveFile } from '~utils/file';
import { get } from '~global/satellite';
import { BLUE_TANG_TO_MARP_FIRST_PAGE, DOC_TEXT, DOC_TITLE, HELP_PAGE_URL } from '~global/constants';

class MenuModel implements Presenter.Model {
  public async saveAsMarkdown(): Promise<void> {
    const title = get(DOC_TITLE) as string;
    saveFile(`${title}.md`, get(DOC_TEXT));
  }

  public async saveAsMrap(): Promise<void> {
    const title = get(DOC_TITLE) as string;
    const editorText = get(DOC_TEXT) as string;
    const firstPage = BLUE_TANG_TO_MARP_FIRST_PAGE.replace('title', title);
    saveFile(
      `${title}-marp.md`,
      `${firstPage}${editorText
        .split('\n')
        .map((str: string) => str.replace(/^{(.*)}$/, ''))
        .join('\n')}`
    );
  }

  public openHelp() {
    window.open(HELP_PAGE_URL, '_blank');
  }
}

export default MenuModel;
