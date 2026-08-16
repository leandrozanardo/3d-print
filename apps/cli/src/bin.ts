#!/usr/bin/env node
import { EXIT_SIGINT, EXIT_USAGE, runCli } from "./index";

process.on("SIGINT", () => {
  process.stderr.write("Interrupted\n");
  process.exit(EXIT_SIGINT);
});

void runCli(process.argv).then(
  (code) => {
    process.exitCode = code;
  },
  (err: unknown) => {
    const message = err instanceof Error ? err.message : String(err);
    process.stderr.write(`${message}\n`);
    process.exitCode = EXIT_USAGE;
  },
);
