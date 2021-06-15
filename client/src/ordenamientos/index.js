export const findRazaLista = function (data, str) {
  return data?.filter(
    (x) =>
      (str === "Existentes" && typeof x.id === "number") ||
      (str === "Creadas por mi" && typeof x.id === "string")
  );
};
