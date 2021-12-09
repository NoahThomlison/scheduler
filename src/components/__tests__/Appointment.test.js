import React from "react";
import Application from "components/Application";

import { render, cleanup} from "@testing-library/react";

import Appointment from "components/appointment";

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
      render(<Appointment/>);
  });
})