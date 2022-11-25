// import type { CodegenConfig } from "@graphql-codegen/cli";

// const config: CodegenConfig = {
//   schema: import.meta.env.VITE_GQL_URL_PATH,
//   documents: ["src/**/*.tsx"],
//   generates: {
//     "./src/__generated__/": {
//       preset: "client",
//       plugins: [],
//       presetConfig: {
//         gqlTagName: "gql",
//       },
//     },
//   },
//   ignoreNoDocuments: true,
// };

module.exports = {
  schema: "http://localhost:4000/gql",
  documents: ["src/**/*.tsx"],
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

// export default config;
