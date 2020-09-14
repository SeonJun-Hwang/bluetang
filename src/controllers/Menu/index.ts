import { $, addClass, removeClass } from "~utils/DOM";
import { saveFile } from "~utils/file";
import { BLUE_TANG_TO_MARP_FIRST_PAGE, HELP_PAGE_URL } from "./constants";
import Editor from "../Editor";

class Menu {
  private editor: Editor;
  private $button = $(".menu-open");
  private $menu = $(".menu");
  private $saveMd = $(".menu-list > #save-md");
  private $saveMarp = $(".menu-list > #save-marp");
  private $help = $(".menu-list > #help");

  constructor(editor: Editor) {
    this.editor = editor;

    this.bindEvent();
  }

  private bindEvent() {
    this.$button!.addEventListener("click", this.menuClickEvent.bind(this));
    this.$menu!.addEventListener("click", this.menufocusOutEvent.bind(this));
    this.$saveMd!.addEventListener("click", this.saveMd.bind(this));
    this.$saveMarp!.addEventListener("click", this.saveMarp.bind(this));
    this.$help!.addEventListener("click", this.helpPage.bind(this));
  }

  private menuClickEvent() {
    addClass(this.$menu as HTMLElement, "open");
  }

  private menufocusOutEvent({ target }: Event) {
    const $target = target as HTMLElement;
    if (this.$menu !== $target) return;
    removeClass(this.$menu as HTMLElement, "open");
  }

  private saveMd() {
    saveFile("blue.md", this.editor.text());
  }

  private saveMarp() {
    saveFile(
      "blue-marp.md",
      `${BLUE_TANG_TO_MARP_FIRST_PAGE}${this.editor
        .text()
        .split("\n")
        .map((str: string) => str.replace(/^{(.*)}$/, ""))
        .join("\n")}`
    );
  }

  private helpPage() {
    window.open(HELP_PAGE_URL, "_blank");
  }
}

export default Menu;
