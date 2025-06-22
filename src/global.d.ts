export {};

declare global {
  const libWrapper: function;
  namespace ClientSettings {
    interface Values {
      'mondarth-power-journal-preprocess.variables': ObjectConstructor;
    }
  }
}
