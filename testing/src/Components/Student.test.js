import { render } from "@testing-library/react";
import Student from "./Student";

describe("Student Component Snapshot Test", () => {
  test("render Student snapshot", () => {
    const { container } = render(
      <Student name="Yash" age={20} section="Krg 3A" />,
    );
    expect(container).toMatchSnapshot();
  });
});
