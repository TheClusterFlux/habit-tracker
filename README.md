# Random Habit Tracker

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

A minimalist habit tracking application that suggests random habits to build consistency and help establish a daily practice of self-improvement. This application is designed to make habit-building more engaging by introducing an element of surprise through random habit suggestions.

## ✨ Features

- **Random Habit Suggestions**: Get a random habit suggestion each time you're ready to build a new habit.
- **Streak Tracking**: Monitor your consistency through a streak counter.
- **Habit Categories**: Habits are organized by categories like physical, mental, nutrition, and productivity.
- **Progress Visualization**: See your progress with a visual progress bar that changes color as your streak grows.
- **Habit History**: View your completed habits and their timestamps.
- **Habit Summary**: See statistics on your most frequently completed habits.
- **Skip Functionality**: Skip habits that don't apply to your current situation.
- **Data Export**: Export your habit tracking data to JSON for backup or analysis.
- **Responsive Design**: Works on both desktop and mobile devices.
- **Dark Theme**: Easy on the eyes with a modern dark theme design.

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/TheClusterFlux/habit-tracker.git
   cd habit-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   Open your browser and navigate to [http://localhost:8080](http://localhost:8080)

### Docker

1. **Build the Docker image**
   ```bash
   npm run docker:build
   ```

2. **Run the container**
   ```bash
   npm run docker:run
   ```

3. **Access the application**
   Open your browser and navigate to [http://localhost:8080](http://localhost:8080)

### Kubernetes Deployment

1. **Set up your Kubernetes cluster**

2. **Apply the Kubernetes configuration**
   ```bash
   kubectl apply -f deployment.yaml
   ```

3. **Access via the configured Ingress**
   Once deployed, the application will be available at the hostname specified in the Ingress configuration.

## 🛠️ Technologies Used

- HTML5, CSS3, JavaScript (ES6+)
- Node.js server for serving static assets
- Docker for containerization
- Kubernetes for orchestration

## 📊 How Habit Tracking Works

1. **Complete a habit**: Click "Mark as Completed" when you've finished a suggested habit.
2. **Skip a habit**: If a habit doesn't apply to you, click "Skip" to get a new suggestion.
3. **Build a streak**: Complete at least one habit each day to build and maintain your streak.
4. **Track progress**: View your habit history and summary to see your consistency over time.

## 🔒 Security & Privacy

All habit tracking data is stored locally in your browser using localStorage. No data is sent to or stored on any server.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Made with ❤️ by TheClusterFlux