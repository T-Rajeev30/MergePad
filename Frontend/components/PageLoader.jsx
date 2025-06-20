import { LoaderIcon } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="min-h-screen flex items-center  justify-center">
      <LoaderIcon className="animate-spin w-10 h-10 text-primary" />
    </div>
  );
};

export default PageLoader;
