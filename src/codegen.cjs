

module.exports = {
  schema: "http://localhost:4000/gql",
  documents: ["src/**/*.tsx","src/**/*.ts"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};
