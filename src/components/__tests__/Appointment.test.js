import React from "react";
import Application from "components/Application";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByPlaceholderText, getByAltText, queryByText, queryByAltText } from "@testing-library/react";

import Appointment from "components/appointment";

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
      render(<Appointment/>);
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
      // 1. Render the Application.
    const {container} = render(<Application/>);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete your appointment?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots  remaining".
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });


  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
      // 1. Render the Application.
    const {container} = render(<Application/>);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    console.log(prettyDOM(day))

    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Edit"));

    // // 4. Check that the Save button is shown.
    expect(getByText(appointment, "Save")).toBeInTheDocument();

    // 5. Select the other interviewer.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Check that the element with the text "Deleting" is displayed.
    fireEvent.click(queryByText(appointment, "Save"));

    // expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    // await expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Edit"));

    // // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    console.log(prettyDOM(day))
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

    // console.log(prettyDOM(container))
    // console.log(prettyDOM(appointment))


  // it("shows the save error when failing to save an appointment", () => {
  //   render(<Appointment/>);
  // });
 
  // it("shows the delete error when failing to delete an existing appointment"
  // , () => {
  //   render(<Appointment/>);
  // });


})