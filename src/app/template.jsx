import PageTransitions from "@/components/PageTransitions";
export default function Template({ children }) {
  return <PageTransitions className="route-enter">{children}</PageTransitions>;
}
