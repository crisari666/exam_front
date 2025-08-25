# English Exam Application

A modern React-based English language examination system built with Vite, Redux Toolkit, and Material-UI.

## Features

- **Multiple Question Types**: Fill-in-the-gap, multiple choice, reading comprehension, matching, verb-to-be, and writing questions
- **Real-time Progress Tracking**: Visual progress indicators and question navigation
- **Backend Integration**: Connects to a real backend API for customer validation and exam submission
- **Responsive Design**: Modern UI built with Material-UI components
- **Internationalization**: Support for multiple languages (English/Spanish)
- **State Management**: Robust state management with Redux Toolkit

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **State Management**: Redux Toolkit, RTK Query
- **UI Framework**: Material-UI (MUI)
- **Testing**: Vitest, React Testing Library
- **Package Manager**: Yarn

## Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn package manager
- Backend API server running (see [Environment Setup](./ENVIRONMENT_SETUP.md))

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   ```

3. Configure environment variables (see [Environment Setup](./ENVIRONMENT_SETUP.md))

4. Start the development server:
   ```bash
   yarn dev
   ```

## Backend Integration

This application integrates with a real backend API for:
- Customer code validation
- Exam results submission
- Participant management

See [Environment Setup](./ENVIRONMENT_SETUP.md) for configuration details and [EXAM_API_ENDPOINT.md](./EXAM_API_ENDPOINT.md) for API specifications.

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn test` - Run tests

## Project Structure

```
src/
├── features/           # Feature-based modules
│   ├── exam/          # Exam functionality
│   ├── participant/   # Participant management
│   └── shared/        # Shared components
├── app/               # App configuration
├── services/          # API services
└── utils/             # Utility functions
```

## Contributing

1. Follow the established TypeScript and React patterns
2. Ensure all tests pass
3. Follow the coding standards defined in the project

## License

This project is licensed under the MIT License.
