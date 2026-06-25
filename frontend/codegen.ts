import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:5056/graphql",
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
