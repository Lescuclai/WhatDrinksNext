export default function getDrinkData(params) {
  return [
    {
      label: "Nom",
      key: "nom",
      require: true,
    },
    {
      label: "Producteur",
      key: "producteur",
    },
    {
      label: "Pays d'origine",
      key: "origine",
    },
    {
      label: "Catégorie",
      key: "categorie",
    },
    {
      label: "Année",
      key: "annee",
      require: params.type === "vin",
    },
    {
      label: "Arômes",
      key: "aromes",
    },
    {
      label: "Degrès d'alcool",
      key: "alcool",
      percent: true,
    },
    {
      label: "Commentaire",
      key: "commentaire",
      multiline: true,
    },
  ];
}
