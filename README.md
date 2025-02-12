# Slush Mobile App

## Project Overview
Slush is a mobile payment splitting application designed to streamline group payments and reimbursements. The app allows users to easily split bills, track shared expenses, and facilitate payments through various payment platforms.

### Core Features
- User authentication (email/password)
- Quick payment entry via number pad
- Flexible group splitting functionality
- QR code and link sharing
- Platform-agnostic payment integration (Venmo, Cash App, PayPal)
- User-less claiming system for recipients

## Tech Stack
### Frontend (Mobile)
- React Native with Expo
- TypeScript for type safety
- React Navigation for routing
- React Native Paper for UI components
- Expo Haptics for tactile feedback
- AsyncStorage for local storage

### Backend
- FastAPI (Python)
- PostgreSQL database
- JWT authentication
- RESTful API design

## Project Structure
```
slush-frontend/
├── src/
│   ├── components/
│   │   ├── common/        # Reusable components
│   │   └── specific/      # Feature-specific components
│   ├── hooks/           # Custom React hooks
│   ├── navigation/        # Navigation configuration
│   ├── providers/        # Context providers
│   ├── screens/          # Screen components
│   │   ├── auth/         # Authentication screens
│   │   └── app/          # Main app screens
│   ├── services/        # API and service integrations
│   ├──theme/           # Theming and styling
│   ├──types/           # types
│   ├── utils/           # Utility functions
├── assets/              # Static assets
└── App.tsx             # Root component
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator

### Installation
1. Clone the repository:
```bash
git clone [repository-url]
cd slush-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

### Environment Configuration
Create a `.env` file in the root directory:
```env
API_URL=your_api_url
```

## Features and Implementation

### Authentication Flow
- Email/password authentication
- Form validation
- Error handling
- Loading states
- Haptic feedback
- Dark mode support

### Payment Flow
- Number pad for amount entry
- Group split configuration
- Payment platform integration
- QR code generation
- Link sharing functionality

## Testing
- TestFlight for iOS beta testing
- Manual testing procedures
- User acceptance testing

## Deployment
### TestFlight
1. Register for Apple Developer Account
2. Configure App Store Connect
3. Upload build through Xcode
4. Distribute to testers

### Production (Future)
- App Store submission requirements
- Review guidelines compliance
- Marketing materials preparation

## Future Enhancements
- Social authentication (Google, Apple)
- Receipt scanning
- Bank linking
- Advanced splitting algorithms
- Business-specific features
- Web dashboard integration

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React Native best practices
- Implement proper error handling
- Add comments for complex logic

### Git Workflow
1. Create feature branches from development
2. Use meaningful commit messages
3. Submit pull requests for review
4. Merge to main branch after approval

### Documentation
- Document new components
- Update README as needed
- Maintain API documentation
- Comment complex business logic

## Security Considerations
- JWT token management
- Secure storage practices
- API error handling
- Data validation

## Performance Considerations
- Optimize image assets
- Minimize re-renders
- Efficient state management
- Proper error boundaries

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
