"use client"

import { executeCode } from "@/services/compilerAPI"
import { toast } from "react-hot-toast"

import { useState, useEffect } from "react"
import Editor from "react-simple-code-editor"
import Prism from "prismjs"
import { initSocket } from "@/socket"
import { useRouter } from "next/navigation"

import "prismjs/components/prism-javascript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-css"
import "prismjs/components/prism-markup"

import "prismjs/components/prism-c"
import "prismjs/components/prism-cpp"
import "prismjs/components/prism-java"
import "prismjs/components/prism-python"
import "prismjs/themes/prism-tomorrow.css"
import { TypingIndicator } from "./typing-indicator"
import { useRef, useCallback } from "react"

export function CodeEditor({
  value = "",
  language = "javascript",
  onChange,
  roomId: propRoomId,
}: {
  value?: string
  language?: string
  onChange?: (value: string) => void
  roomId?: string
}) {
  const [output, setOutput] = useState<string>("")
  const [isExecuting, setIsExecuting] = useState(false)
  const [code, setCode] = useState(value)
  const [roomId, setRoomId] = useState<string | undefined>(propRoomId)
  const [socket, setSocket] = useState<any>(null)
  const router = useRouter()
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [typingUsers, setTypingUsers] = useState<{ name: string; timestamp: number; }[]>([]);

  interface LanguageMapping {
  id: number;
  name: string;
  extensions: string[];
  identifiers: string[];
}

 const LANGUAGE_CONFIG: LanguageMapping[] = [
  {
    id: 105, // C++ (GCC 14.1.0)
    name: "cpp",
    extensions: [".cpp", ".hpp", ".cc", ".h"],
    identifiers: ["#include", "using namespace", "cout", "cin"]
  },
  {
    id: 102, // JavaScript (Node.js 22.08.0)
    name: "javascript",
    extensions: [".js"],
    identifiers: ["const ", "let ", "function", "=>"]
  },
  {
    id: 101, // TypeScript (5.6.2)
    name: "typescript",
    extensions: [".ts", ".tsx"],
    identifiers: ["interface ", "type ", "namespace"]
  },
  {
    id: 109, // Python (3.13.2)
    name: "python",
    extensions: [".py"],
    identifiers: ["def ", "import ", "from ", "class "]
  },
  {
    id: 91, // Java (JDK 17.0.6)
    name: "java",
    extensions: [".java"],
    identifiers: ["public class", "import java", "package "]
  }
];

  // Socket initialization effect
  useEffect(() => {
    const init = async () => {
      const socketInstance = await initSocket()
      setSocket(socketInstance)
    }
    init()

    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [])

    // Typing indicator setup
  useEffect(() => {
    if (!socket) return;

    const handleUserTyping = ({ name }: { name: string }) => {
      setTypingUsers(prev => {
        const filtered = prev.filter(user => user.name !== name);
        return [...filtered, { name, timestamp: Date.now() }];
      });
    };

    const handleUserStoppedTyping = ({ name }: { name: string }) => {
      setTypingUsers(prev => prev.filter(user => user.name !== name));
    };

    socket.on('userTyping', handleUserTyping);
    socket.on('userStoppedTyping', handleUserStoppedTyping);

    // Cleanup old typing indicators
    const interval = setInterval(() => {
      setTypingUsers(prev => prev.filter(user => Date.now() - user.timestamp < 3000));
    }, 3000);

    return () => {
      socket.off('userTyping', handleUserTyping);
      socket.off('userStoppedTyping', handleUserStoppedTyping);
      clearInterval(interval);
    };
  }, [socket]);
  
    // Debounced typing handler
  const emitTyping = useCallback((name: string) => {
    if (socket && roomId) {
      socket.emit('userTyping', { roomId, name });

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('userStoppedTyping', { roomId, name });
      }, 1500);
    }
  }, [socket, roomId]);



  // Room ID effect
  useEffect(() => {
    if (!propRoomId) {
      const currentUserData = localStorage.getItem("currentUser")
      const storedRoomId = currentUserData ? JSON.parse(currentUserData).roomId : undefined
      if (storedRoomId) {
        setRoomId(storedRoomId)
      } else {
        console.error("Room ID is missing in both props and localStorage. Redirecting to login.")
        router.push("/")
      }
    }
  }, [propRoomId, router])

  // Socket room management effect
  useEffect(() => {
    if (!socket || !roomId) {
      return
    }

    const currentUserData = localStorage.getItem("currentUser")
    const name = currentUserData ? JSON.parse(currentUserData).name : "Anonymous"

    socket.emit("joinRoom", { roomId, name })

    socket.on("codeUpdate", (updatedCode: string) => {
      console.log("Received code update:", updatedCode)
      setCode(updatedCode)
    })

    return () => {
      socket.off("codeUpdate")
      socket.emit("leaveRoom", roomId)
    }
  }, [socket, roomId])

  // Code execution effect
  useEffect(() => {
const detectLanguage = (code: string, defaultLang: string): number => {
    // Find language by code content
    for (const lang of LANGUAGE_CONFIG) {
      if (lang.identifiers.some(id => code.includes(id))) {
        return lang.id;
      }
    }
    
    // Find language by selected language name
    const selectedLang = LANGUAGE_CONFIG.find(l => l.name === defaultLang);
    return selectedLang?.id || 102; // Default to Node.js if no match
  };

  const handleCodeExecution = async (e: KeyboardEvent) => {
    if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'n') {
      e.preventDefault();
      setIsExecuting(true);

      const languageId = detectLanguage(code, language);

      try {
        const result = await executeCode(code, languageId);
        if (result.error) {
          toast.error('Execution failed');
          setOutput(result.error);
        } else {
          setOutput(result.output);
          toast.success("Code executed successfully!");
        }
      } catch (error) {
        toast.error("Failed to execute code");
        setOutput(`Error: ${(error as Error).message}`);
      } finally {
        setIsExecuting(false);
      }
    }
  };

  document.addEventListener("keydown", handleCodeExecution);
  return () => {
    document.removeEventListener("keydown", handleCodeExecution);
  };
}, [code, language]);

   const handleValueChange = (newCode: string) => {
    setCode(newCode);
    onChange?.(newCode);

    if (socket && roomId) {
      // Emit code change (keep existing functionality)
      console.log("Emitting code change:", newCode);
      socket.emit("codeChange", { roomId, code: newCode });

      // Handle typing indicator
      const currentUser = localStorage.getItem("currentUser");
      const name = currentUser ? JSON.parse(currentUser).name : "Anonymous";
      
      // Emit typing event
      socket.emit('userTyping', { roomId, name });

      // Clear previous timeout if it exists
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Set new timeout to emit stopped typing
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('userStoppedTyping', { roomId, name });
        typingTimeoutRef.current = null;
      }, 1500);
    }
  };
  // Determine which language to use for highlighting
  const getLanguage = (lang: string) => {
    switch (lang) {
      case "javascript":
        return Prism.languages.javascript
      case "jsx":
        return Prism.languages.jsx
      case "typescript":
        return Prism.languages.typescript
      case "tsx":
        return Prism.languages.tsx
      case "css":
        return Prism.languages.css
      case "html":
        return Prism.languages.markup
      // Add new language cases
      case "cpp":
        return Prism.languages.cpp
      case "java":
        return Prism.languages.java
      case "python":
        return Prism.languages.python
      default:
        return Prism.languages.javascript
    }
  }

  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);


 return (
    <div className="flex h-full">
      <div className="w-3/4 h-full">
        <Editor
          value={code}
          onValueChange={handleValueChange}
          highlight={code => Prism.highlight(code, Prism.languages[language], language)}
          padding={16}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 18,
            backgroundColor: "#2d2d2d",
            minHeight: "500px",
            height: "100%",
            color: "#ccc",
          }}
          className="min-h-[500px] h-full w-full"
        />
      </div>
      <div className="w-1/4 p-4 bg-[#2d2d2d]">
        <h2 className="text-lg text-white mb-2"> User Terminal </h2>
        <div className=" h-60px typing-indicator">
          {typingUsers.map(user => (
            <div key={user.name} className="typing-user">
              <span>
                {user.name} is typing
                <div className="typing-dots">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </span>
            </div>
          ))}
        </div>
        {output && (
          <div className="output-panel mt-4">
            <h3 className="text-sm text-white mb-2">Output:</h3>
            <pre className="whitespace-pre-wrap text-white ">{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
