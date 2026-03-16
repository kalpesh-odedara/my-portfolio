import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import studentsStudying from "@/assets/students-studying.jpg";
import graduation from "@/assets/graduation.jpg";
import heroCampus from "@/assets/hero-campus.jpg";

const images = [
  {
    src: heroCampus,
    title: "Modern Campus",
    description: "State-of-the-art facilities for learning",
  },
  {
    src: studentsStudying,
    title: "Collaborative Learning",
    description: "Students working together in modern libraries",
  },
  {
    src: graduation,
    title: "Celebrate Success",
    description: "Join thousands of successful graduates",
  },
];

export const ImageShowcase = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experience Academic Excellence
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover a vibrant learning environment designed for your success
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <ScrollReveal key={image.title} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {image.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {image.description}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
