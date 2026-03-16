import { motion } from "framer-motion";

interface MapEmbedProps {
  className?: string;
}

export const MapEmbed = ({ className = "" }: MapEmbedProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl overflow-hidden shadow-lg ${className}`}
    >
      <iframe
        title="Campus Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019112383!2d-122.419415!3d37.774929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064e9c7e53f%3A0xf5ee6e6f9c4b9!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1704067200000!5m2!1sen!2sus"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full"
      />
    </motion.div>
  );
};
