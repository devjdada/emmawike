import { motion } from "framer-motion";
import { TrendingUp, Users, Award, MapPin } from "lucide-react";
import { useEffect, useState } from "react";


const iconMap = {
  TrendingUp,
  Users,
  Award,
  MapPin,
};

const StatsSection = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  return (
    <section className="py-20 bg-primary text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Trusted by <span className="text-accent">Thousands</span>
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Our track record speaks for itself. We've been setting the standard in luxury real estate for over two decades.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading && <p>Loading...</p>}
          {error && <p>Error fetching stats: {error.message}</p>}
          {stats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-2xl mb-6">
                  <IconComponent className="h-8 w-8 text-accent" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold mb-2 text-accent">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold mb-2">
                  {stat.label}
                </div>
                <div className="text-white/80 text-sm">
                  {stat.description}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
