import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  globalIgnores([".next/**", ".next-staging/**", ".tooling/**", ".npm-cache/**", "artifacts/**", "next-env.d.ts"]),
]);
