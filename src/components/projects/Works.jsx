import { ArrowRight } from "lucide-react";
import { worksData } from "../../data/worksData";

function Works() {
  const recentProjects = worksData.slice(0, 4); // tampilkan 3 project terbaru

  return (
    <section className="px-30 py-24">
      <img
        className="place-self-end mb-16 w-[220px] md:w-[280px]"
        src="works/works.svg"
        alt="works"
      />

      <div className="flex flex-col divide-y divide-black/10">
        {recentProjects.map((proj) => (
          <div
            key={proj.id}
            className="flex items-center justify-between py-10 gap-8"
          >
            {/* Nomor dan judul */}
            <div className="flex items-start gap-8">
              <span className="text-lg font-semibold tracking-wider text-black/60">
                {proj.id}
              </span>
              <div>
                <h3 className="font-Jakarta-Bold text-4xl md:text-3xl leading-snug font-extrabold">
                  {proj.title}
                </h3>
              </div>
            </div>

            {/* Tanggal dan tombol */}
            <div className="flex flex-col md:flex-row items-end md:items-center gap-4 md:gap-8 text-right">
              <span className="text-lg md:text-xl font-medium text-black/80">
                {proj.date}
              </span>
              <a
                href={proj.link}
                className="border-2 border-black rounded-full px-5 py-2 md:px-6 md:py-2.5 flex items-center gap-2 font-semibold text-lg hover:bg-black hover:text-white transition-all duration-300"
              >
                Learn More <ArrowRight size={20} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Tombol More Projects */}
      <div className="flex justify-center mt-14">
        <a
          href="/works"
          className="border-2 border-black rounded-full px-8 py-3 flex items-center gap-2 font-semibold text-lg hover:bg-black hover:text-white transition-all duration-300"
        >
          More Projects <ArrowRight size={22} />
        </a>
      </div>
    </section>
  );
}

export default Works;