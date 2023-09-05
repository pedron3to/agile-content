import { motion } from "framer-motion";
const Footer = ({ isSelected }: { isSelected?: boolean }) => {
  const containerClasses = "flex flex-row items-center justify-between";
  const textClasses = "text-gray-600";

  return (
    <motion.footer
      className={`${containerClasses} py-6 px-4 bg-gray-100`}
      animate={{ opacity: isSelected ? 0 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={textClasses}>&copy; Google 2021</div>
      <div className={textClasses}>version: 0.1.0</div>
    </motion.footer>
  );
};

export default Footer;
