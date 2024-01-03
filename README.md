# MeetNCode App

![Logo MeetNCode](src/img/logo2.png)

### Link: https://bobs83.github.io/meetberlin_app/

## Introduction

**Meet App** is a serverless Progressive Web Application (PWA) built with React. Utilizing a Test-Driven Development (TDD) approach, this app seamlessly integrates with the Google Calendar API to fetch and display upcoming events.

## Objective

The primary objective is to create an app that embodies the future of web development by combining serverless architecture and the benefits of PWAs. This includes:

- **Serverless Architecture**: Ensures no backend maintenance, easy scalability, availability, and no cost for idle time.
- **Progressive Web App (PWA) Features**: Includes instant loading, offline support, push notifications, "add to home screen" prompt, responsive design, and cross-platform compatibility.

## Key Features

- **Event Filtering**: Search and filter events by city.
- **Event Details**: Option to show or hide details of events.
- **Event Count Specification**: Users can specify the number of events to display.
- **Offline Usage**: Access the app even without an internet connection.
- **Home Screen Shortcut**: Add the app shortcut to your device's home screen.
- **Data Visualization**: Charts displaying event details, including scatterplots and pie charts for event locations and genre popularity.

## Features and User Stories

### Feature 1: Filter Events by City

**User Story**:
As an event explorer, I should be able to filter events by city, so that I can easily discover events happening specifically in my area of interest.

#### Scenarios:

1. **City Search**:

   - **Given** the user is on the main page with a search option.
   - **When** the user enters a specific city.
   - **Then** the app displays upcoming events for that city.

2. **Default View Without City Search**:

   - **Given** the user is on the main page.
   - **When** no city is searched.
   - **Then** the app shows a list of all events in all cities.

3. **City Selection from Suggestions**:
   - **Given** the user is typing a city name in the city textbox,
   - **And** a list of suggested cities is displayed.
   - **When** the user selects a specific city from the list.
   - **Then** the app updates to show events in the selected city.
   - **And** the user should receive a list of upcoming events in that city.

### Feature 2: Show/Hide Event Details

**User Story**:
As an event attendee, I should be able to show or hide an event's details, so that I can manage the amount of information displayed for easier navigation.

#### Scenarios:

1. **Default Collapsed Event View**:

   - **Given** the user first opens the app.
   - **When** the list of events is presented.
   - **Then** all events are collapsed by default.

2. **Expand Event Details**:

   - **Given** the user views the list of events.
   - **When** the user selects an event to see its details.
   - **Then** the app expands to show the details of that event.

3. **Collapse Event Details**:
   - **Given** the event details are displayed.
   - **When** the user chooses to hide these details.
   - **Then** the app collapses the event details.

### Feature 3: Specify Number of Displayed Events

**User Story**:
As a user with specific preferences, I should be able to specify the number of events displayed, so that I can tailor the event list to my desired scope and avoid information overload.

#### Scenarios:

1. **Default Event Count**:

   - **Given** the user hasn't specified a number of events.
   - **When** the user views the event list.
   - **Then** the app displays 32 events by default.

2. **Customize Event Count**:
   - **Given** the event list is displayed.
   - **When** the user selects a different number of events to be displayed.
   - **Then** the app updates the list to show the selected number of events.

### Feature 4: Use the App When Offline

**User Story**:
As a user who may not always have internet access, I should be able to get event information when offline, so that I can still plan and view events without needing a constant internet connection.

#### Scenarios:

1. **Access Cached Data Offline**:

   - **Given** there is no internet connection.
   - **When** the user accesses the app.
   - **Then** the app provides cached data.

2. **Error on New Data Requests Offline**:
   - **Given** the user has no internet connection.
   - **When** the user tries to fetch new event data (e.g., changing the city).
   - **Then** the app displays an error message.

### Feature 5: Add an App Shortcut to the Home Screen

**User Story**:
As a frequent app user, I should be able to add the Meet app as a shortcut on my device's home screen, so that I can access the app quickly and conveniently.

#### Scenarios:

1. **Install Shortcut on Home Screen**:
   - **Given** the user is using the Meet app.
   - **When** the user chooses to add the app as a shortcut.
   - **Then** the app creates a shortcut icon on the user's device home screen for easy access.

### Feature 6: Display Charts Visualizing Event Details

**User Story**:
As an analytical user, I should be able to view charts visualizing event details, so that I can get a clear and quick overview of event distributions, like the number of upcoming events in each city.

#### Scenarios:

1. **View Event Distribution Chart**:
   - **Given** the user is looking at event details in the app.
   - **When** the user accesses the section displaying event statistics.
   - **Then** the app displays a chart showing the number of upcoming events in each city, providing a visual representation of event distribution.

## Technical Stack

- **Frontend**: Developed using React, incorporating Progressive Web App (PWA) technologies for a responsive and offline-capable user experience.
- **Backend**: Serverless architecture leveraging AWS Lambda for scalable, maintenance-free backend solutions. Serverless functions are utilized to handle dynamic backend processes such as authentication, data processing, and integration with the Google Calendar API. This approach allows for efficient scaling, cost-effective operations (as costs are based on actual usage), and eliminates the need for dedicated server management, making the app more reliable and easier to maintain.
- **API Integration**: Utilizing the Google Calendar API with OAuth2 authentication for secure and reliable data fetching.
- **Testing**: Adhering to Test-Driven Development (TDD) principles with a target of at least 90% test coverage to ensure code reliability and quality.
- **Deployment**: The app is hosted on GitHub Pages and is designed to be compatible across major browsers, ensuring a seamless user experience on various devices.

## Project Requirements

- **React Application**: The app is built using React, following best practices and modern development standards.
- **Serverless Functions**: Implementation of serverless functions, preferably AWS Lambda, for handling backend processes, including authorization.
- **Deployment Strategy**: Deployment on GitHub Pages, emphasizing accessibility and performance across different browsers and devices.
- **PWA Compliance**: Adhering to Lighthouse's PWA checklist to guarantee a high-quality Progressive Web App experience.
- **Offline Functionality**: Ensuring robust offline functionality using service workers for a seamless user experience even without internet connectivity.
- **Data Visualization**: Integration of data visualization tools for effective representation of event data.
- **Testing and Performance**:

  - **Comprehensive Testing**: Embracing a thorough Test-Driven Development (TDD) approach, the application undergoes extensive testing. This includes:
    - **Unit Testing**: Ensuring individual components function correctly.
    - **Integration Testing**: Validating the interaction between various components.
    - **End-to-End Testing**: Testing the entire application workflow as experienced by the end user.
  - **Performance Optimization**: Performance assessments are conducted through tools such as Google Lighthouse to ensure optimal application speed and efficiency. Key focus areas include: - **Load Time**: Minimizing the time it takes for the app to become fully operational. - **Responsiveness**: Ensuring the app responds swiftly to user interactions regardless of the device or browser. - **Resource Efficiency**: Optimizing the use of resources to ensure a smooth, lag-free experience, especially in offline mode.
