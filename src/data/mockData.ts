export const mockResourceData = [
  {
    uid: "EMP001",
    name: "John Smith",
    domain: "Technology",
    status: "Available",
    skill: "React Development",
    experience: "5 years",
    ageing: "15 days",
    location: "New York"
  },
  {
    uid: "EMP002", 
    name: "Sarah Johnson",
    domain: "Data Science",
    status: "On Project",
    skill: "Python/ML",
    experience: "3 years", 
    ageing: "45 days",
    location: "San Francisco"
  },
  {
    uid: "EMP003",
    name: "Mike Chen",
    domain: "Technology", 
    status: "Available",
    skill: "Java Development",
    experience: "7 years",
    ageing: "8 days",
    location: "Seattle"
  },
  {
    uid: "EMP004",
    name: "Emily Davis",
    domain: "Consulting",
    status: "On Bench",
    skill: "Business Analysis",
    experience: "4 years",
    ageing: "92 days", 
    location: "Chicago"
  },
  {
    uid: "EMP005",
    name: "Alex Rodriguez",
    domain: "Technology",
    status: "Available", 
    skill: "DevOps",
    experience: "6 years",
    ageing: "23 days",
    location: "Austin"
  },
  {
    uid: "EMP006",
    name: "Lisa Wang",
    domain: "Data Science",
    status: "On Project",
    skill: "Data Analytics", 
    experience: "4 years",
    ageing: "67 days",
    location: "Boston"
  },
  {
    uid: "EMP007",
    name: "David Brown",
    domain: "Consulting",
    status: "On Bench",
    skill: "Project Management",
    experience: "8 years", 
    ageing: "156 days",
    location: "Denver"
  },
  {
    uid: "EMP008",
    name: "Maria Garcia",
    domain: "Technology",
    status: "Available",
    skill: "Full Stack Development",
    experience: "5 years",
    ageing: "31 days",
    location: "Miami"
  }
];

export const mockStatusData = [
  { name: "Available", value: 35, color: "#4DB6AC" },
  { name: "On Project", value: 28, color: "#81C784" },
  { name: "On Bench", value: 15, color: "#FFB74D" }, 
  { name: "In Transition", value: 12, color: "#F06292" },
  { name: "On Leave", value: 8, color: "#9575CD" },
  { name: "Training", value: 2, color: "#64B5F6" }
];

export const mockTrendsData = [
  { month: "Jan", available: 32, onProject: 25, onBench: 18 },
  { month: "Feb", available: 35, onProject: 28, onBench: 15 },
  { month: "Mar", available: 30, onProject: 32, onBench: 13 },
  { month: "Apr", available: 28, onProject: 35, onBench: 12 },
  { month: "May", available: 35, onProject: 28, onBench: 15 },
  { month: "Jun", available: 38, onProject: 25, onBench: 17 }
];

export const mockBreakdownData = [
  { name: "Technology", value: 45, color: "#4DB6AC" },
  { name: "Data Science", value: 25, color: "#81C784" },
  { name: "Consulting", value: 20, color: "#FFB74D" },
  { name: "Operations", value: 10, color: "#F06292" }
];

export const filterOptions = {
  skills: ["React Development", "Python/ML", "Java Development", "Business Analysis", "DevOps", "Data Analytics", "Project Management", "Full Stack Development"],
  domains: ["Technology", "Data Science", "Consulting", "Operations"],
  locations: ["New York", "San Francisco", "Seattle", "Chicago", "Austin", "Boston", "Denver", "Miami"],
  statusCategories: ["Available", "On Project", "On Bench", "In Transition", "On Leave", "Training"],
  agingGroups: ["0-30 days", "31-60 days", "61-90 days", "90+ days"]
};