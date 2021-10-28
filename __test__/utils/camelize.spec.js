import { camelize } from "../../utils";

describe("Camelize helper function", () => {
  it("transform space seperated string to camelCase", () => {
    const testCase = ["camel case", "Apple tree", "blue Microphone"];
    const expected = ["camelCase", "appleTree", "blueMicrophone"];
    const camel = testCase.map((el) => camelize(el));
    for (let i = 0; i < expected.length; i++) {
      expect(camel[i]).toEqual(expected[i]);
    }
  });
});
