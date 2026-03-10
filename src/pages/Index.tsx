import Terminal from "@/components/Terminal";
import MatrixBackground from "@/components/MatrixBackground";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center p-0 md:p-4 overflow-hidden">
      <MatrixBackground />
      <div className="relative z-10 w-full flex justify-center">
        <Terminal />
      </div>
    </div>
  );
};

export default Index;

