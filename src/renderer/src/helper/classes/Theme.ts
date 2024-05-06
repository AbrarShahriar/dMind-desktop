export default class Theme {
  private themes: any;

  constructor() {
    this.themes = {
      dark: {
        "--editor-background": "#090f13",
        "--topbar-background": "#09191f",
        "--left-panel-background": "#153b47",
        "--button-background": "#0e639c",
        "--button-active-background": "#3588bf",
        "--button-background-danger": "#b14b34",
        "--button-active-background-danger": "#c0604b",
        "--border-color": "#30535f",
        "--text-color": "white",
      },
      light: {
        "--editor-background": "#E3FEF7",
        "--topbar-background": "#77B0AA",
        "--left-panel-background": "#77B0AA",
        "--button-background": "#003C43",
        "--button-active-background": "#135D66",
        "--button-background-danger": "#b14b34",
        "--button-active-background-danger": "#c0604b",
        "--border-color": "#003C43",
        "--text-color": "black",
      },
    };
  }

  setTheme(themeName: string) {
    for (const varName in this.themes[themeName]) {
      document.documentElement.style.setProperty(
        varName,
        this.themes[themeName][varName]
      );
    }
  }
}
