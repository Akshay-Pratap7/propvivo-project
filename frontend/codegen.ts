import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./schema.graphql",
  documents: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  ignoreNoDocuments: true,
  generates: {
    "graphql/generated/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
