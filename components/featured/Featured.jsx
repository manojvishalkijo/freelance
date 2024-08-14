import React from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./Featured.scss";

function Featured() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.5, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const spanVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3, yoyo: Infinity },
    },
    tap: { scale: 0.9 },
  };

  return (
    <div className="featured">
      <div className="container">
        <motion.div
          className="left"
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.h1 variants={textVariants}>
            Find the perfect{" "}
            <motion.span variants={spanVariants}>freelance</motion.span>
            <br />
            services for your business
          </motion.h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="Search" />
              <input type="text" placeholder='Try "building mobile app"' />
              
            </div>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Search
            </motion.button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Web Design
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              WordPress
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Logo Design
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              AI Services
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Featured;
