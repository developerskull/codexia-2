# XOR+ - Real-time Collaborative Code Editor

![XOR+](image.png)

XOR+ is a modern, real-time collaborative code editor that enables seamless code collaboration. Built with Next.js 15, Socket.IO, and TypeScript, it provides powerful features for instant code synchronization and team collaboration.

## 🚀 Key Features

### Real-time Collaboration
- **Instant Code Synchronization** - See code changes across all users in real-time
- **Live User Presence** - View team members currently in the room with avatars
- **Typing Indicators** - Know when someone is actively coding
- **Multi-user Support** - Collaborate with multiple developers simultaneously

### Code Editor
- **Syntax Highlighting** - Support for multiple programming languages
- **Code Execution** - Run code directly in the browser (Ctrl+Alt+N)
- **Language Support** - JavaScript, TypeScript, Python, Java, C++, HTML, CSS, JSX, TSX
- **Dark Theme** - Easy on the eyes for long coding sessions

### User Experience
- **Room-based Collaboration** - Create or join rooms with unique IDs
- **User Profiles** - Display names and avatars for each participant
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Modern UI** - Clean, minimalist design with smooth animations

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.2.5** - React framework with Turbopack
- **React 19** - Latest React features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Shadcn/ui** - Beautiful UI components

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web server framework
- **Socket.IO** - Real-time bidirectional communication
- **CORS** - Cross-origin resource sharing

### Code Execution
- **Judge0 API** - Secure code compilation and execution

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or pnpm package manager

### Frontend Setup

1. Clone the repository:
```bash
git clone https://github.com/developerskull/XOR-plus.git
cd XOR-plus
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env.local` file in the root directory:
```env
# Backend URL for Socket.IO connection
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

# RapidAPI configuration for code compilation (optional)
NEXT_PUBLIC_RAPID_API_KEY=your_rapidapi_key_here
NEXT_PUBLIC_RAPID_API_HOST=your_rapidapi_host_here
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Clone the backend repository:
```bash
git clone https://github.com/YashNuhash/XOR-backend.git
cd XOR-backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:3001`

## 🎯 Usage

1. **Access the Application**
   - Open `http://localhost:3000` in your browser

2. **Create or Join a Room**
   - Navigate to the Collaborate page
   - Enter your name
   - Click "Generate Now" to create a new room OR paste an existing Room ID
   - Click "Join Room"

3. **Start Coding**
   - Select your programming language from the dropdown
   - Write your code in the editor
   - Press `Ctrl+Alt+N` to execute code
   - Share the Room ID with teammates to collaborate

4. **Collaborate in Real-time**
   - See team members in the left sidebar
   - Watch live typing indicators
   - Code changes sync instantly across all users

## 🔧 Available Scripts

### Frontend
```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Backend
```bash
npm start        # Start backend server
npm run dev      # Start with nodemon (auto-reload)
```

## 🌐 Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Backend (Heroku/Railway)
1. Push backend code to GitHub
2. Create new app on Heroku/Railway
3. Set PORT environment variable
4. Deploy

## 📁 Project Structure

```
XOR-plus/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── Collaborate/        # Room join page
│   │   ├── Editor/             # Code editor page
│   │   └── page.tsx            # Landing page
│   ├── components/             # React components
│   │   ├── ui/                 # UI components
│   │   ├── code-editor.tsx     # Main editor component
│   │   ├── login.tsx           # Room join form
│   │   └── app-sidebar.tsx     # Sidebar with team members
│   ├── services/               # API services
│   └── socket.jsx              # Socket.IO client setup
├── public/                     # Static assets
└── package.json                # Dependencies
```

## 🔑 Key Components

### Socket.IO Events
- `joinRoom` - User joins a collaboration room
- `leaveRoom` - User leaves the room
- `codeChange` - Code update from a user
- `codeUpdate` - Broadcast code to all users
- `updateRoom` - Room member list update
- `userTyping` - User started typing
- `userStoppedTyping` - User stopped typing

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Kunal Ahire**
- GitHub: [@developerskull](https://github.com/developerskull)
- LinkedIn: [Kunal Ahire](https://www.linkedin.com/in/kunal-ahire-9592aa300)

## 🙏 Acknowledgments

- Original XOR project by [YashNuhash](https://github.com/YashNuhash)
- Socket.IO for real-time communication
- Next.js team for the amazing framework
- Shadcn/ui for beautiful components

## 📞 Support

For support, email or open an issue in the GitHub repository.

---

Made with ❤️ by Kunal Ahire
