#!/usr/bin/env node
import { runCli } from "./index";

void runCli(process.argv).then(
  (code) => {
    process.exitCode = code;
  },
  (err: unknown) => {
    const message = err instanceof Error ? err.message : String(err);
    process.stderr.write(`${message}\n`);
    process.exitCode = 2;
  },
);
