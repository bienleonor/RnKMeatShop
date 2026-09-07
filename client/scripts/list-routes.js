import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const possibleAppDirs = [
  path.join(root, "src", "app"),
  path.join(root, "app"),
];

const appDir = possibleAppDirs.find((dir) =>
  fs.existsSync(dir)
);

if (!appDir) {
  console.error("❌ Could not find Next.js app directory.");
  console.error("Expected either:");
  console.error("  src/app");
  console.error("  app");
  process.exit(1);
}

const pageFiles = new Set([
  "page.js",
  "page.jsx",
  "page.ts",
  "page.tsx",
]);

function getRoutes(dir, route = "") {
  const routes = [];

  for (const entry of fs.readdirSync(dir, {
    withFileTypes: true,
  })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      /*
       * Next.js route groups:
       *
       * (public)
       * (private)
       * (auth)
       *
       * These don't appear in the URL.
       */
      const isRouteGroup =
        entry.name.startsWith("(") &&
        entry.name.endsWith(")");

      /*
       * Private folders beginning with "_"
       * are ignored from the URL.
       */
      const isPrivateFolder =
        entry.name.startsWith("_");

      const segment =
        isRouteGroup || isPrivateFolder
          ? ""
          : `/${entry.name}`;

      routes.push(
        ...getRoutes(
          fullPath,
          `${route}${segment}`
        )
      );
    }

    if (entry.isFile() && pageFiles.has(entry.name)) {
      routes.push(route || "/");
    }
  }

  return routes;
}

const routes = getRoutes(appDir)
  .sort()
  .filter(
    (route, index, array) =>
      array.indexOf(route) === index
  );

console.log("\nNext.js Routes");
console.log("==============");

for (const route of routes) {
  console.log(route);
}

console.log("\nTotal:", routes.length);