// Initialize the habit pool
const habits = [
    "Drink a glass of water.",
    "Take a 5-minute walk.",
    "Do 10 push-ups.",
    "Meditate for 5 minutes.",
    "Read for 10 minutes.",
    "Stretch for 5 minutes.",
    "Write down 3 things you're grateful for.",
    "Make your bed.",
    "Eat a healthy breakfast.",
    "Journal for 10 minutes.",
    "Practice deep breathing for 5 minutes.",
    "Do 20 sit-ups.",
    "Have a healthy snack (e.g., fruit or nuts).",
    "Take a 10-minute power nap.",
    "Write down one thing you learned today.",
    "Call or text a friend/family member.",
    "Clean a small area of your home (desk, kitchen, etc.).",
    "Listen to a podcast or educational video for 10 minutes.",
    "Set a daily goal and review progress at the end of the day.",
    "Plan your tomorrow before going to bed.",
    "Do a 10-minute yoga session.",
    "Walk 10,000 steps in a day.",
    "Drink a green smoothie.",
    "Do a 5-minute mental workout (e.g., puzzles, brain games).",
    "Learn a new word and use it in a sentence.",
    "Take a break from screens for 30 minutes.",
    "Practice mindfulness for 10 minutes.",
    "Declutter a part of your room or home.",
    "Practice a hobby for 20 minutes (drawing, knitting, etc.).",
    "Try a new recipe or meal.",
    "Spend 10 minutes on a creative project (painting, writing, etc.).",
    "Write down a personal affirmation.",
    "Have a 5-minute dance party.",
    "Learn a new skill (e.g., language app, cooking technique).",
    "Watch the sunrise or sunset.",
    "Practice good posture for 10 minutes.",
    "Plan a future trip or vacation.",
    "Unsubscribe from unnecessary email lists.",
    "Spend 10 minutes outside in nature.",
    "Practice gratitude journaling before bed.",
    "Declutter your digital life (email inbox, desktop, etc.).",
    "Read an inspiring article or blog post.",
    "Give yourself a compliment in the mirror.",
    "Listen to relaxing music for 10 minutes.",
    "Do 10 squats.",
    "Spend 5 minutes on self-care (face mask, skincare, etc.).",
    "Write a handwritten letter or note to someone.",
    "Review your finances for the week/month.",
    "Take a cold shower for 30 seconds.",
    "Spend 10 minutes with a pet (if applicable).",
    "Go to bed 15 minutes earlier than usual.",
    "Wake up 15 minutes earlier than usual.",
    "Practice self-compassion (be kind to yourself).",
    "Avoid social media for an hour.",
    "Do a random act of kindness.",
    "Try a 5-minute breathing exercise to reduce stress.",
    "Create a vision board for future goals.",
    "Play a musical instrument for 10 minutes.",
    "Work on a puzzle (physical or online).",
    "Practice visualization (imagine your goals).",
    "Spend 10 minutes writing or brainstorming ideas.",
    "Learn a new recipe and cook a meal.",
    "Take a cold shower for 30 seconds.",
    "Do a brain dump: write down everything on your mind.",
    "Dance for 5 minutes.",
    "Read or listen to a motivational quote.",
    "Try a new form of exercise (e.g., swimming, cycling).",
    "Take a break and step outside for fresh air.",
    "Write a poem or short story.",
    "Do 10 jumping jacks.",
    "Clean out your email inbox.",
    "Do 5 minutes of visualization for your goals.",
    "Write a letter to your future self.",
    "Spend 15 minutes organizing your files.",
    "Give yourself a mini facial (skincare routine).",
    "Try a 5-minute stretching routine for flexibility.",
    "Take a 15-minute power nap.",
    "Practice saying no to something you don’t need to do.",
    "Send a positive text or message to someone.",
    "Set a timer and do a deep focus task for 20 minutes.",
    "Make a to-do list for the day or week.",
    "Take 10 minutes to practice breathing techniques.",
    "Go for a 10-minute jog.",
    "Cook a healthy meal from scratch.",
    "Listen to an audiobook for 10 minutes.",
    "Take a 5-minute break every hour.",
    "Reorganize your workspace for productivity.",
    "Plan your weekly meals and groceries.",
    "Do 10 minutes of bodyweight exercises (e.g., planks, lunges).",
    "Walk around the block and get some fresh air.",
    "Write a daily affirmation or mantra.",
    "Learn something new on YouTube or a learning platform.",
    "Do a short workout (e.g., HIIT, cardio).",
    "Eat 5 servings of fruits and vegetables in a day.",
    "Plan out your finances for the upcoming month.",
    "Try a new workout routine (e.g., HIIT, Pilates).",
    "Start a new hobby (e.g., photography, knitting).",
    "Take a 10-minute break to relax your mind.",
    "Try a 10-minute stretching routine.",
    "Do a short mindful walk.",
    "Plan a creative project to work on this week.",
    "Spend 10 minutes in quiet reflection.",
    "Engage in a fun activity for 10 minutes (play a game, hobby).",
    "Do a 10-minute body scan relaxation.",
    "Spend time doing something you've been procrastinating on.",
    "Watch a TED talk on a subject you're interested in.",
    "Read a chapter from a non-fiction book.",
    "Practice a language for 10 minutes using an app.",
    "Take 10 minutes to clean and organize your phone.",
    "Spend 10 minutes decluttering your home.",
    "Do 5 minutes of breathing exercises.",
    "Write down a personal achievement or success.",
    "Try a new fitness class or activity (online or in person).",
    "Start a daily gratitude journal.",
    "Use a fitness tracker and check your step count.",
    "Spend 5 minutes visualizing your goals."
];

// Load stored data from localStorage (if any)
let habitHistory = JSON.parse(localStorage.getItem('habitHistory')) || [];
let streak = parseInt(localStorage.getItem('streak')) || 0;
let lastCompletionDate = localStorage.getItem('lastCompletionDate') || null;
let skippedHabits = JSON.parse(localStorage.getItem('skippedHabits')) || [];
let categories = {
    physical: ["Do 10 push-ups.", "Walk 10,000 steps in a day.", "Do 20 sit-ups.", "Do 10 squats."],
    mental: ["Meditate for 5 minutes.", "Practice mindfulness for 10 minutes.", "Do a 5-minute mental workout."],
    nutrition: ["Drink a glass of water.", "Eat a healthy breakfast.", "Have a healthy snack.", "Drink a green smoothie."],
    productivity: ["Make your bed.", "Clean a small area of your home.", "Declutter your digital life.", "Set a daily goal."]
};

// Update the progress section with the current streak
function updateStreak() {
    document.getElementById('streak').textContent = `Current Streak: ${streak} days`;
}

// Display completed habits with their timestamps
function displayCompletedHabits() {
    const habitListElement = document.getElementById('completed-habits-list');
    habitListElement.innerHTML = ''; // Clear current list

    // Get only the last 30 habits to display
    const recentHabits = habitHistory.slice(-30);

    recentHabits.forEach((entry) => {
        const listItem = document.createElement('li');
        const date = new Date(entry.timestamp);
        listItem.textContent = `${entry.habit} - Completed on ${date.toLocaleString()}`;
        habitListElement.appendChild(listItem);
    });
}

// Display habit summary (count and sort by frequency)
function displayHabitSummary() {
    const habitSummaryElement = document.getElementById('habit-summary-list');
    habitSummaryElement.innerHTML = ''; // Clear current summary list

    const habitCount = {};

    // Count frequency of each habit
    habitHistory.forEach((entry) => {
        const habit = entry.habit;
        if (habitCount[habit]) {
            habitCount[habit]++;
        } else {
            habitCount[habit] = 1;
        }
    });

    // Sort habits by frequency (highest to lowest)
    const sortedHabits = Object.entries(habitCount)
        .sort((a, b) => b[1] - a[1]);

    // Display sorted habit summary
    sortedHabits.forEach(([habit, count]) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${habit}: ${count} times`;
        habitSummaryElement.appendChild(listItem);
    });
}

// Avoid recently completed habits by checking timestamps
function getRandomHabit() {
    // Filter out habits that have been done recently (within the last 3 habits)
    const recentHabits = habitHistory.slice(-3).map((entry) => entry.habit);
    
    // Also filter out skipped habits
    const availableHabits = habits.filter((habit) => 
        !recentHabits.includes(habit) && !skippedHabits.includes(habit)
    );

    // If all habits have been completed recently or skipped, reset skipped habits and choose from full pool minus recent
    if (availableHabits.length === 0) {
        skippedHabits = [];
        localStorage.setItem('skippedHabits', JSON.stringify(skippedHabits));
        return habits.filter(habit => !recentHabits.includes(habit))[Math.floor(Math.random() * (habits.length - recentHabits.length))];
    }

    // Pick a random habit from the available ones
    return availableHabits[Math.floor(Math.random() * availableHabits.length)];
}

// Handle the completion of a habit
document.getElementById('complete-btn').addEventListener('click', function () {
    const selectedHabit = document.getElementById('habit-description').textContent;

    // Add the completed habit to the history with timestamp
    const currentTimestamp = new Date().toISOString();
    habitHistory.push({ 
        habit: selectedHabit, 
        timestamp: currentTimestamp,
        category: getCategoryForHabit(selectedHabit)
    });

    // Track last completion date for streak calculation
    const today = new Date().toDateString();
    
    // Check the streak based on habitHistory
    updateHabitStreak();

    // Save data to localStorage
    localStorage.setItem('habitHistory', JSON.stringify(habitHistory));
    localStorage.setItem('streak', streak);
    localStorage.setItem('lastCompletionDate', today);

    // Update the UI
    displayCompletedHabits();
    updateStreak();
    displayHabitSummary();
    updateProgressBar();
    showNewHabit(); // Show a new random habit
    updateStatistics();
});

// Calculate and update the user's streak
function updateHabitStreak() {
    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Group habits by date
    const habitsByDate = {};
    habitHistory.forEach(entry => {
        const date = new Date(entry.timestamp);
        const dateString = date.toDateString();
        if (!habitsByDate[dateString]) {
            habitsByDate[dateString] = [];
        }
        habitsByDate[dateString].push(entry);
    });
    
    // Create an array of dates that have at least one habit completed
    const completedDates = Object.keys(habitsByDate).map(dateStr => new Date(dateStr));
    completedDates.sort((a, b) => b - a); // Sort dates in descending order
    
    // Calculate streak
    let currentStreak = 0;
    let checkDate = new Date(today);
    
    // Go back one day if no habits completed today
    if (!habitsByDate[today.toDateString()]) {
        checkDate.setDate(checkDate.getDate() - 1);
    }
    
    while (true) {
        const dateString = checkDate.toDateString();
        if (habitsByDate[dateString]) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break;
        }
    }
    
    streak = currentStreak;
}

// Helper function to check if two dates are consecutive days
function isNextDay(previousDate, currentDate) {
    const previous = new Date(previousDate);
    const current = new Date(currentDate);

    // Increment previous date by one day to compare with current date
    previous.setDate(previous.getDate() + 1);

    return previous.toDateString() === current.toDateString();
}

// Display a new random habit
function showNewHabit() {
    const randomHabit = getRandomHabit();
    document.getElementById('habit-description').textContent = randomHabit;
    document.getElementById('habit-title').textContent = "Today's Habit";
    
    // Show habit category if available
    const category = getCategoryForHabit(randomHabit);
    const habitTitleElement = document.getElementById('habit-title');
    
    if (category) {
        habitTitleElement.textContent = `Today's Habit (${category})`;
    } else {
        habitTitleElement.textContent = "Today's Habit";
    }
}

// Get category for a habit
function getCategoryForHabit(habit) {
    for (const [category, habitsInCategory] of Object.entries(categories)) {
        if (habitsInCategory.includes(habit)) {
            return category;
        }
    }
    return null;
}

// Update progress bar based on streak
function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    // Visualize progress - max width of 100%
    const progressWidth = Math.min(streak * 10, 100);
    progressBar.style.width = `${progressWidth}%`;
    progressBar.style.backgroundColor = getProgressColor(progressWidth);
}

// Get color for progress bar based on progress percentage
function getProgressColor(percentage) {
    if (percentage < 30) return '#FF4500'; // Orange-Red
    if (percentage < 70) return '#FFD700'; // Gold
    return '#00FF7F'; // Spring Green
}

// Toggle between completed habits list and habit summary
function toggleSummary() {
    const habitList = document.getElementById('completed-habits-list');
    const habitSummary = document.getElementById('habit-summary-list');

    if (habitList.style.display === "none") {
        habitList.style.display = "block";
        habitSummary.style.display = "none";
        document.getElementById('toggle-summary').textContent = "View Habit Summary";
    } else {
        habitList.style.display = "none";
        habitSummary.style.display = "block";
        document.getElementById('toggle-summary').textContent = "View Completed Habits";
    }
}

// Event listener for skipping the habit
document.getElementById('skip-btn').addEventListener('click', function () {
    const selectedHabit = document.getElementById('habit-description').textContent;

    // Add the habit to the skipped habits list
    if (!skippedHabits.includes(selectedHabit)) {
        skippedHabits.push(selectedHabit);
    }

    // Save skipped habits to localStorage
    localStorage.setItem('skippedHabits', JSON.stringify(skippedHabits));

    // Move on to the next habit
    showNewHabit();
});

// Initialize the app with a random habit and display data
document.addEventListener('DOMContentLoaded', () => {
    displayCompletedHabits();
    displayHabitSummary();
    updateStreak();
    updateProgressBar();
    showNewHabit();
    updateStatistics();
    
    // Check if it's a new day and reset daily habits if needed
    checkAndResetDailyHabits();
});

// Update statistics display
function updateStatistics() {
    // Update total habits completed
    document.getElementById('total-habits').textContent = habitHistory.length;
    
    // Calculate and update best streak
    const bestStreak = calculateBestStreak();
    document.getElementById('best-streak').textContent = bestStreak;
    
    // Calculate habits completed this week
    const thisWeekCount = getHabitsThisWeek();
    document.getElementById('this-week').textContent = thisWeekCount;
}

// Calculate the longest streak of consecutive days
function calculateBestStreak() {
    if (habitHistory.length === 0) return 0;
    
    // Group habits by date
    const habitsByDate = {};
    habitHistory.forEach(entry => {
        const date = new Date(entry.timestamp);
        const dateString = date.toDateString();
        if (!habitsByDate[dateString]) {
            habitsByDate[dateString] = [];
        }
        habitsByDate[dateString].push(entry);
    });
    
    // Get unique dates and sort them
    const uniqueDates = Object.keys(habitsByDate).map(dateStr => new Date(dateStr));
    uniqueDates.sort((a, b) => a - b);
    
    // Calculate streaks
    let maxStreak = 0;
    let currentStreak = 1;
    
    for (let i = 1; i < uniqueDates.length; i++) {
        const prevDate = uniqueDates[i - 1];
        const currDate = uniqueDates[i];
        
        // Check if dates are consecutive
        prevDate.setDate(prevDate.getDate() + 1);
        if (prevDate.toDateString() === currDate.toDateString()) {
            currentStreak++;
        } else {
            // Streak broken, reset counter
            maxStreak = Math.max(maxStreak, currentStreak);
            currentStreak = 1;
        }
    }
    
    // Check if the current streak is the best
    maxStreak = Math.max(maxStreak, currentStreak);
    return maxStreak;
}

// Calculate how many habits were completed this week
function getHabitsThisWeek() {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Start on Sunday
    startOfWeek.setHours(0, 0, 0, 0);
    
    // Filter habits completed this week
    const habitsThisWeek = habitHistory.filter(entry => {
        const habitDate = new Date(entry.timestamp);
        return habitDate >= startOfWeek;
    });
    
    return habitsThisWeek.length;
}

// Check if it's a new day and reset daily habits if needed
function checkAndResetDailyHabits() {
    const lastSessionDate = localStorage.getItem('lastSessionDate');
    const today = new Date().toDateString();
    
    if (lastSessionDate !== today) {
        // It's a new day, reset daily tracking
        localStorage.setItem('lastSessionDate', today);
    }
}

// Export streak data for user to download
document.getElementById('export-btn').addEventListener('click', function() {
    const data = {
        habitHistory: habitHistory,
        streak: streak,
        lastCompletionDate: lastCompletionDate,
        skippedHabits: skippedHabits
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'habit-tracker-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});
