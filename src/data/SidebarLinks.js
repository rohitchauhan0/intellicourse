import { Book, LayoutDashboardIcon, Phone, Plus, Puzzle, PuzzleIcon } from "lucide-react";

export const SIDEBAR_LINKS = [
    {
        id: 1,
        title: "Dashboard",
        link: "/dashboard/my-profile",
        icon: LayoutDashboardIcon,
        accountType: "user"
     },  
     {
        id: 2,
        title: "Dashboard",
        link: "/dashboard/admin",
        icon: LayoutDashboardIcon,
        accountType: "admin"
     },
     {
        id: 3,
        title: "Create course",
        link: "/dashboard/create-course",
        icon: Plus,
        accountType: "admin"
     },
     {
        id: 4,
        title: "Your courses",
        link: "/dashboard/your-courses",
        icon: Book,
        accountType: "admin"
     },
     {
        id: 5,
        title: "Create quizz",
        link: "/dashboard/create-quizz",
        icon: Plus,
        accountType: "admin"
     },
     {
        id: 6,
        title: "Your quizzes",
        link: "/dashboard/your-quizzes",
        icon: PuzzleIcon,
        accountType: "admin"
     },
     {
      id: 7,
      title: "My courses",
      link: "/dashboard/my-courses",
      icon: Book,
      accountType: "user"
     }
   
]