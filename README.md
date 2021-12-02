# Interview Scheduler

## Project Summary

Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. Appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted. The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database.

### User Experiance
- Interviews can be booked between Monday and Friday.
- A user can switch between weekdays.
- A user can book an interview in an empty appointment slot.
- Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
- A user can cancel an existing interview.
- A user can edit the details of an existing interview.
- The list of days informs the user how many slots are available for each day.
- The expected day updates the number of spots available when an interview is booked or canceled.
- A user is presented with a confirmation when they attempt to cancel an interview.
- A user is shown an error if an interview cannot be saved or deleted.
- A user is shown a status indicator while asynchronous operations are in progress.
- When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
- The application makes API requests to load and persist data. We do not lose data after a browser refresh.

## Project Images


### Main Page
![Main Page](https://user-images.githubusercontent.com/80222250/144094594-abfc858f-0c51-424d-aa53-9bbd9f70eac8.png)

### Create/Edit Appointment
![Create Appointment](https://user-images.githubusercontent.com/80222250/144094857-c870f5ce-bf34-40e3-9528-b98429aca992.png)

### Booked Appointment
![Booked Appointment](https://user-images.githubusercontent.com/80222250/144094908-39d8f7bd-31fb-4ee7-9ca2-66a977c33667.png)

### Empty Appointment
![Empty Appointment](https://user-images.githubusercontent.com/80222250/144094622-1959f839-42aa-42de-844f-39f525bf3752.png)

### Delete Appointment Confirmation
![Delete Confirm](https://user-images.githubusercontent.com/80222250/144094651-f69c0a04-55d1-445f-97ac-51289d1d093d.png)

### Delete Transition 
![Delete Transition](https://user-images.githubusercontent.com/80222250/144094662-672b1ae1-9133-491b-9116-dbc6cc6bd84b.png)

### Saving Transition 
![Saving Transition](https://user-images.githubusercontent.com/80222250/144094709-0de26022-efd3-418f-b383-84cb042fa0ea.png)


## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
