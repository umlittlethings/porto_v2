import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { worksData } from "../../data/worksData";
import { useNavigate, Link } from "react-router-dom";

function Works() {
  const navigate = useNavigate();
  const recentProjects = worksData.slice(0, 4); 

  const handleLearnMore = (projectLink) => {
    navigate(projectLink);
  };

  return (
    <section className="px-7 md:px-30 py-10 md:py-24">
      {/* Works Section Title Scroll Reveal */}
      <motion.img
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="block mx-auto mb-8 md:mb-16 w-[150px] md:w-[220px] lg:w-[280px]"
        src="works/works.svg"
        alt="works"
      />

      <div className="flex flex-col divide-y divide-black/10">
        {recentProjects.map((proj, index) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            className="flex flex-col md:flex-row md:items-center md:justify-between py-6 md:py-10 gap-4 md:gap-8 group"
          >
            {/* Project Index & Title */}
            <div className="flex items-start gap-3 md:gap-8">
              <span className="text-sm md:text-lg font-semibold tracking-wider text-black/60 flex-shrink-0">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-Jakarta-Bold text-2xl md:text-3xl lg:text-4xl leading-snug font-extrabold group-hover:translate-x-2 transition-transform duration-300">
                  {proj.title}
                </h3>
              </div>
            </div>

            {/* Date & Action Button */}
            <div className="flex flex-row justify-between md:flex-col items-center md:items-end gap-3 md:gap-4 lg:gap-8 w-full md:w-auto flex-shrink-0">
              <span className="text-base md:text-lg lg:text-xl font-medium text-black/80">
                {proj.date}
              </span>
              <button
                onClick={() => handleLearnMore(typeof proj.link === 'string' ? proj.link : proj.link?.route)}
                className="border-2 border-black rounded-full px-4 py-1.5 md:px-6 md:py-2.5 flex items-center gap-2 font-semibold text-base md:text-lg hover:bg-black hover:text-white transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                Learn More <ArrowRight size={18} className="md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* More Projects Button Scroll Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-center mt-8 md:mt-14"
      >
        <Link
          to="/works"
          className="border-2 border-black rounded-full px-6 md:px-8 py-2 md:py-3 flex items-center gap-2 font-semibold text-base md:text-lg hover:bg-black hover:text-white transition-all duration-300"
        >
          More Projects <ArrowRight size={20} />
        </Link>
      </motion.div>
    </section>
  );
}

export default Works;