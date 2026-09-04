import React from 'react'
import { motion } from 'framer-motion'

function Before() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex justify-center"
    >
      <img className="hidden md:block mx-auto" src="before footer/befoot.svg" alt="Before footer" />
      <img className="md:hidden pb-10 w-90 mx-auto" src="before footer/befoot_mobile.svg" alt="Before footer mobile" />
    </motion.div>
  );
}

export default Before;