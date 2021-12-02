import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/appointment";
import PropTypes from 'prop-types'; 

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment/>);
  });
})