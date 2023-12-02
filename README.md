# Meet App

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
   - **Given** the user is typing a city name in the city textbox, and a list of suggested cities is displayed.
   - **When** the user selects a specific city from the list.
   - **Then** the app updates to show events in the selected city.

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

## Technical Stack
- **Frontend**: React, PWA technologies
- **Backend**: Serverless functions (AWS Lambda preferred)
- **API**: Google Calendar API with OAuth2 authentication
- **Testing**: Test-Driven Development approach with >= 90% test coverage
- **Deployment**: Hosted on GitHub Pages, compatible with major browsers and responsive across devices

## Project Requirements
- React application using TDD
- Serverless functions for authorization
- App deployment on GitHub Pages
- Compliance with Lighthouse’s PWA checklist
- Offline functionality with service workers
- Data visualization implementation
- Comprehensive test coverage and performance monitoring
