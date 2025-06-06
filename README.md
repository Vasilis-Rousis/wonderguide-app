# WonderGuide 🌍

A modern, AI-powered travel planning application built with Nuxt 3 that helps users create personalized travel itineraries with intelligent suggestions for destinations worldwide.

## ✨ Features

- **AI-Powered Itinerary Generation**: Leverages OpenAI's GPT-3.5 to create detailed day-by-day travel plans
- **Smart Location Search**: Google Maps integration with autocomplete for precise destination selection
- **User Authentication**: Secure sign-up/sign-in system powered by Supabase
- **Trip Management**: Save, view, and delete your travel plans
- **Responsive Design**: Beautiful, mobile-first UI built with Tailwind CSS
- **Real-time Loading States**: Skeleton loaders and smooth transitions for enhanced UX
- **Organized Itineraries**: Plans structured by days with morning, afternoon, and evening activities

## 🚀 Tech Stack

- **Frontend**: Nuxt 3, Vue 3 (Composition API)
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Authentication & Database**: Supabase
- **AI Integration**: OpenAI API (GPT-3.5-turbo)
- **Maps Integration**: Google Maps JavaScript API
- **Icons**: Heroicons
- **UI Components**: Headless UI

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 16+ installed
- A Supabase account and project
- An OpenAI API key
- A Google Maps API key with Places API enabled

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wonderguide
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_anon_key
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Database Setup**
   
   Create a table in your Supabase database:
   ```sql
   CREATE TABLE trips (
     id SERIAL PRIMARY KEY,
     email TEXT NOT NULL,
     user_id UUID REFERENCES auth.users(id),
     trip JSONB NOT NULL,
     place TEXT NOT NULL,
     days INTEGER NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

## 🚦 Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Build

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 📁 Project Structure

```
├── components/           # Vue components
│   ├── AutocompleteInput.vue    # Google Maps autocomplete
│   ├── DayCard.vue             # Individual day itinerary display
│   ├── FunctionalButtonsContainer.vue  # Save/regenerate buttons
│   ├── InputForm.vue           # Travel planning form
│   ├── MyTripsWrapper.vue      # Saved trips container
│   ├── Navbar.vue              # Navigation component
│   ├── TravelPlanWrapper.vue   # Generated plan display
│   └── TripCard.vue            # Individual saved trip card
├── pages/               # Nuxt pages
│   ├── index.vue        # Dashboard/home page
│   ├── login.vue        # Authentication
│   ├── sign-up.vue      # User registration
│   └── my-trips.vue     # Saved trips page
├── server/api/          # API routes
│   └── getTravelPlan.js # OpenAI integration
├── stores/              # Pinia stores
│   ├── travelPlan.js    # Travel plan state
│   ├── userFormInput.js # User input state
│   └── functionalButtonsVisibility.js # UI state
├── middleware/          # Route middleware
│   └── auth.js          # Authentication guard
├── plugins/             # Nuxt plugins
│   └── google-maps.client.js   # Google Maps loader
└── assets/css/          # Global styles
    └── main.css
```

## 🔧 Configuration

### Supabase Setup

1. Create a new Supabase project
2. Enable authentication with email/password
3. Create the trips table using the SQL provided above
4. Configure RLS (Row Level Security) policies as needed

### Google Maps API

1. Enable the Places API in Google Cloud Console
2. Create an API key and restrict it to your domain
3. Add the key to your environment variables

### OpenAI API

1. Get an API key from OpenAI
2. Add the key to your environment variables
3. Ensure you have sufficient credits for API calls

## 🎨 Key Components

### InputForm
Handles user input for destination and trip duration with Google Maps autocomplete integration.

### TravelPlanWrapper
Displays AI-generated travel plans with skeleton loading states and smooth transitions.

### TripCard
Shows saved trips with expandable/collapsible content and delete functionality.

### Authentication
Complete authentication flow with login, signup, and protected routes.

## 🔒 Authentication Flow

1. Users can sign up with email/password
2. Email verification is handled by Supabase
3. Protected routes require authentication
4. User sessions are managed automatically

## 🤖 AI Integration

The application uses OpenAI's GPT-3.5-turbo model to generate travel itineraries based on:
- Destination
- Number of days
- Structured format (Morning, Afternoon, Evening activities)

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS utility classes
- Smooth animations and transitions
- Optimized for all screen sizes

## 🚀 Deployment

This project can be deployed on various platforms:

- **Vercel**: `vercel --prod`
- **Netlify**: Build command: `npm run build`, Publish directory: `.output/public`
- **Heroku**: Add buildpack for Node.js
- **Railway**: Connect GitHub repository

Make sure to set environment variables in your deployment platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) section
2. Review the Nuxt 3 [documentation](https://nuxt.com/docs)
3. Check Supabase [documentation](https://supabase.com/docs)

## 🙏 Acknowledgments

- [Nuxt 3](https://nuxt.com/) for the amazing framework
- [OpenAI](https://openai.com/) for AI-powered itinerary generation
- [Supabase](https://supabase.com/) for backend services
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities
- [Google Maps](https://developers.google.com/maps) for location services

---

**Happy Traveling! ✈️**
