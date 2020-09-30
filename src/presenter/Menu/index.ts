import MenuModel from '~model/Menu';

namespace MenuPresenter {
  export class Contact {
    private view: View;
    private model: Model;
    constructor(view: View) {
      this.view = view;
      this.model = new MenuModel();
    }

    public saveMarp() {
      this.model.saveAsMrap();
    }

    public saveMarkdown() {
      this.model.saveAsMarkdown();
    }

    public openHelpPage() {
      this.model.openHelp();
    }
  }

  export interface View {}

  export interface Model {
    saveAsMarkdown(): Promise<void>;
    saveAsMrap(): Promise<void>;
    openHelp(): void;
  }
}
export default MenuPresenter;
