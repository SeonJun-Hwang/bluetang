import PresenterModel from '~model/Presenter';

namespace Presenter {
  export class Contact {
    private view: View;
    private model: Model;

    constructor(view: View) {
      this.view = view;
      this.model = new PresenterModel();
    }

    public start() {}

    public finish() {}

    public moveNext() {}

    public movePrev() {}
  }

  export interface View {}

  export interface Model {}
}

export default Presenter;
