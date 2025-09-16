import React, { useState, useEffect } from "react";
import { Play, RotateCcw, Check, X, Clock, Brain, Code, CheckCircle, AlertCircle, Sun, Moon } from "lucide-react";

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const cn = (...inputs: any[]) => {
  const classes = inputs.filter(Boolean);
  if (classes.length === 0) return "";
  return classes.join(" ");
};

// ============================================================================
// UI COMPONENTS - ALL INLINE COMPONENT DEFINITIONS
// ============================================================================

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
    
    const variantClasses = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    };

    const sizeClasses = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

// Card Components
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
      {...props}
    />
  )
);

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
);

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
);

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);

// Badge Component
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

const Badge = ({ className, variant = "default", ...props }: BadgeProps) => {
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  
  const variantClasses = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground",
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)} {...props} />
  );
};

// Separator Component
const Separator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
}>(({ className, orientation = "horizontal", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    )}
    {...props}
  />
));

// ScrollArea Component (simplified version)
const ScrollArea = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative overflow-auto", className)}
      {...props}
    >
      {children}
    </div>
  )
);

// ============================================================================
// MAIN COMPONENT - BitCodeMaster
// ============================================================================

const QuestionDetail= () => {
  const [isDark, setIsDark] = useState(true);
  const [code, setCode] = useState(`function twoSum(nums, target) {
    // Write your solution here
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}`);
  
  const [isRunning, setIsRunning] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  const [results, setResults] = useState<any>(null);
  const [history, setHistory] = useState([
    { id: 1, timestamp: "2024-01-15 14:30", status: "Success", runtime: "68ms", memory: "42.1MB" },
    { id: 2, timestamp: "2024-01-15 14:25", status: "Failed", error: "Time Limit Exceeded", runtime: ">1000ms" },
    { id: 3, timestamp: "2024-01-15 14:20", status: "Success", runtime: "72ms", memory: "41.8MB" }
  ]);

  const problemData = {
    setId: "ARRAY-001",
    questionNo: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    testCases: [
      { id: 1, input: "[2,7,11,15], 9", output: "[0,1]" },
      { id: 2, input: "[3,2,4], 6", output: "[1,2]" }
    ]
  };

  const statusSteps = [
    { key: "compiling", label: "Compiling Code", icon: Code },
    { key: "evaluating", label: "Evaluating Test Cases", icon: CheckCircle },
    { key: "reviewing", label: "AI Reviewing Code", icon: Brain }
  ];

  // Theme toggle
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const runCode = async () => {
    setIsRunning(true);
    setResults(null);
    
    for (let i = 0; i < statusSteps.length; i++) {
      setCurrentStatus(statusSteps[i].key);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    // Simulate results
    const mockResults = {
      status: "Success",
      runtime: "64ms",
      memory: "41.9MB",
      testsPassed: 2,
      totalTests: 2,
      aiReview: "Good solution! Time complexity: O(n²), Space complexity: O(1). Consider using a hash map for O(n) solution."
    };
    
    setResults(mockResults);
    setHistory((prev: any) => [{
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      status: mockResults.status,
      runtime: mockResults.runtime,
      memory: mockResults.memory
    }, ...prev]);
    
    setIsRunning(false);
    setCurrentStatus("");
  };

  const StatusIndicator = ({ step, isActive, isCompleted }: any) => {
    const Icon = step.icon;
    let statusColor = "text-muted-foreground";
    
    if (isCompleted) statusColor = "text-success";
    else if (isActive) statusColor = "text-status-running";
    
    return (
      <div className={`flex items-center gap-2 py-2 transition-all duration-300 ${isActive ? 'scale-105' : ''}`}>
        <Icon className={`h-4 w-4 ${statusColor} ${isActive ? 'status-pulse' : ''}`} />
        <span className={`text-sm ${statusColor}`}>{step.label}</span>
        {isCompleted && <Check className="h-3 w-3 text-success ml-auto" />}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background theme-transition">
      {/* Header */}
      <header className="border-b border-border bg-card theme-transition">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              BitCode Master
            </h1>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="theme-transition hover:shadow-[var(--shadow-glow)]"
            >
              {isDark ? (
                <Sun className="h-4 w-4 mr-2" />
              ) : (
                <Moon className="h-4 w-4 mr-2" />
              )}
              {isDark ? 'Light' : 'Dark'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-120px)]">
          
          {/* Left Panel - Problem Description */}
          <div className="space-y-6 animate-fade-in">
            {/* Problem Info */}
            <Card className="shadow-[var(--shadow-card)] theme-transition">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="theme-transition">Set {problemData.setId}</Badge>
                    <Badge variant="outline" className="theme-transition">#{problemData.questionNo}</Badge>
                    <Badge variant="secondary" className="bg-success/20 text-success-foreground theme-transition">
                      {problemData.difficulty}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-xl theme-transition">{problemData.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed theme-transition">
                  {problemData.description}
                </p>
              </CardContent>
            </Card>

            {/* Test Case Input */}
            <Card className="shadow-[var(--shadow-card)] theme-transition">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 theme-transition">
                  <Code className="h-5 w-5 text-primary" />
                  Test Case Input
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {problemData.testCases.map((testCase, index) => (
                  <div key={testCase.id} className="space-y-2">
                    <div className="font-medium theme-transition">Test Case {index + 1}:</div>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm theme-transition border">
                      <div className="text-primary font-medium mb-2">Input:</div>
                      <div className="pl-2 border-l-2 border-primary/30">
                        {testCase.input}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Test Case Output */}
            <Card className="shadow-[var(--shadow-card)] theme-transition">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 theme-transition">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Test Case Output
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {problemData.testCases.map((testCase, index) => (
                  <div key={testCase.id} className="space-y-2">
                    <div className="font-medium theme-transition">Expected Output {index + 1}:</div>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm theme-transition border">
                      <div className="text-success font-medium mb-2">Output:</div>
                      <div className="pl-2 border-l-2 border-success/30">
                        {testCase.output}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Code Editor & Results */}
          <div className="space-y-6 animate-fade-in">
            {/* Code Editor */}
            <Card className="shadow-[var(--shadow-card)] flex-1 theme-transition">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg theme-transition">Code Editor</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setCode("")} className="theme-transition">
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Reset
                    </Button>
                    <Button 
                      onClick={runCode} 
                      disabled={isRunning}
                      className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-[var(--shadow-glow)] transition-all duration-300 animate-scale-in"
                    >
                      <Play className="h-4 w-4 mr-1" />
                      {isRunning ? "Running..." : "Run Code"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="code-editor min-h-[300px] relative">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-full min-h-[300px] p-4 bg-transparent resize-none border-none outline-none font-mono text-sm custom-scrollbar theme-transition"
                    placeholder="Write your code here..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Status & Results */}
            {(isRunning || results) && (
              <Card className="shadow-[var(--shadow-card)] theme-transition animate-scale-in">
                <CardHeader>
                  <CardTitle className="text-lg theme-transition">Execution Status</CardTitle>
                </CardHeader>
                <CardContent>
                  {isRunning && (
                    <div className="space-y-2">
                      {statusSteps.map((step, index) => (
                        <StatusIndicator
                          key={step.key}
                          step={step}
                          isActive={currentStatus === step.key}
                          isCompleted={statusSteps.findIndex(s => s.key === currentStatus) > index}
                        />
                      ))}
                    </div>
                  )}
                  
                  {results && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <span className="font-medium text-success">Execution Complete</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground theme-transition">Runtime</div>
                          <div className="font-mono theme-transition">{results.runtime}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground theme-transition">Memory</div>
                          <div className="font-mono theme-transition">{results.memory}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground theme-transition">Test Cases</div>
                        <div className="text-success">{results.testsPassed}/{results.totalTests} passed</div>
                      </div>
                      
                      <Separator className="theme-transition" />
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4 text-primary" />
                          <span className="font-medium theme-transition">AI Review</span>
                        </div>
                        <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md theme-transition">
                          {results.aiReview}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Response History */}
            <Card className="shadow-[var(--shadow-card)] theme-transition">
              <CardHeader>
                <CardTitle className="text-lg theme-transition">Response History</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px] custom-scrollbar">
                  <div className="space-y-3">
                    {history.map((entry: any) => (
                      <div key={entry.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-md theme-transition">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {entry.status === "Success" ? (
                              <Check className="h-4 w-4 text-success" />
                            ) : (
                              <X className="h-4 w-4 text-destructive" />
                            )}
                            <span className="font-medium text-sm theme-transition">{entry.status}</span>
                          </div>
                          <div className="text-xs text-muted-foreground theme-transition">{entry.timestamp}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-mono theme-transition">{entry.runtime}</div>
                          {entry.memory && (
                            <div className="text-xs text-muted-foreground theme-transition">{entry.memory}</div>
                          )}
                          {entry.error && (
                            <div className="text-xs text-destructive theme-transition">{entry.error}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;