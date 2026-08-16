import * as fs from "node:fs";
import * as path from "node:path";

import { EngineException } from "@fix-my-print/contracts";

import { AnalysisEngine } from "../src/index";

const CUBE = path.join(__dirname, "..", "..", "formats", "fixtures", "cube.stl");

describe("@fix-my-print/engine", () => {
  it("happy path analyzes cube to Completed", () => {
    const engine = new AnalysisEngine("run-cube");
    const result = engine.analyzeFile(new Uint8Array(fs.readFileSync(CUBE)));
    expect(result.faceCount).toBe(12);
    expect(engine.getState()).toBe("Completed");
  });

  it("cancel stops the run", () => {
    const engine = new AnalysisEngine("run-cancel");
    engine.cancel();
    expect(engine.getState()).toBe("Cancelled");
    expect(() => engine.analyzeFile(new Uint8Array(fs.readFileSync(CUBE)))).toThrow(
      EngineException,
    );
  });

  it("bad buffer fails closed", () => {
    const engine = new AnalysisEngine("run-bad");
    expect(() => engine.analyzeFile(new Uint8Array([1, 2, 3]))).toThrow(EngineException);
    expect(engine.getState()).toBe("Failed");
  });
});
