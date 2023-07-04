// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import("eslint").Linter.Config} */
const config = {
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: path.join(__dirname, "tsconfig.json"),
      },
    },
    // override "simple-import-sort" config
    {
      "files": ["*.js", "*.jsx", "*.ts", "*.tsx"],
      "rules": {
        "simple-import-sort/imports": [
          "error",
          {
            "groups": [
              // Packages `react` related packages come first.
              ["^react", "^@?\\w"],
              // Internal packages.
              ["^(@|components)(/.*|$)"],
              // Side effect imports.
              ["^\\u0000"],
              // Parent imports. Put `..` last.
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
              // Other relative imports. Put same-folder imports and `.` last.
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
              // Style imports.
              ["^.+\\.?(css)$"]
            ]
          }
        ]
      }
    }
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.join(__dirname, "tsconfig.json"),
  },
  plugins: ["@typescript-eslint", "simple-import-sort"],
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-misused-promises": [2, {
      "checksVoidReturn": {
        "attributes": false
      }
    }],
    // increase the severity of rules so they are auto-fixable
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error"
  },
};

module.exports = config;
