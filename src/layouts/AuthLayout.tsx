import bgImg from "@/assets/AppInicio_residuos.webp";
import "./styles.css";
import { Outlet, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';

const AuthLayout = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-27F5A3">
            <img src={bgImg} alt="Mi logo" className="w-full h-auto" />
          </div>
          <div className="bg-white p-4">
            <Outlet />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthLayout;
