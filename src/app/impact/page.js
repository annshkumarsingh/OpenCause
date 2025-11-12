"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const impactStats = [
  { id: 1, label: "Trees Planted", value: 12540, icon: "🌳" },
  { id: 2, label: "Meals Served", value: 89320, icon: "🍽️" },
  { id: 3, label: "Lives Impacted", value: 45000, icon: "❤️" },
  { id: 4, label: "Children Educated", value: 2310, icon: "🎓" },
];

const featuredStories = [
  {
    id: 1,
    title: "500 Families Rebuilt Homes",
    desc: "Your support helped rebuild homes in Kerala after the floods.",
    img: "/globe.svg",
  },
  {
    id: 2,
    title: "10,000 Trees Planted",
    desc: "Communities across Maharashtra benefited from reforestation projects.",
    img: "/globe.svg",
  },
  {
    id: 3,
    title: "Meals for 20,000 People",
    desc: "With your contributions, 20,000 nutritious meals were served.",
    img: "/globe.svg",
  },
];

export default function ImpactPage() {
  const [animatedStats, setAnimatedStats] = useState(
    impactStats.map((stat) => ({ ...stat, displayed: 0 }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStats((prev) =>
        prev.map((stat) => {
          const increment = Math.ceil(stat.value / 60);
          if (stat.displayed < stat.value) {
            return {
              ...stat,
              displayed: Math.min(stat.displayed + increment, stat.value),
            };
          }
          return stat;
        })
      );
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-11/12 md:w-3/4 mx-auto pb-20 pt-[80px] flex flex-col gap-21">
      {/* 🏁 Hero Section */}
      <section className="text-center mt-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3">
          Your Impact <span className="text-emerald-600">Matters</span>
        </h1>
        <p className="text-gray-600 md:w-2/3 mx-auto">
          Every donation counts. Together, we’re building a kinder, greener world.
        </p>
      </section>

      {/* 🔢 Global Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {animatedStats.map((stat) => (
          <motion.div
            key={stat.id}
            className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: stat.id * 0.1 }}
          >
            <span className="text-4xl">{stat.icon}</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              {stat.displayed.toLocaleString()}
            </h2>
            <p className="text-gray-600 mt-1 text-center">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* 🌍 Featured Stories */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          Featured Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredStories.map((story) => (
            <motion.div
              key={story.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img
                src={story.img}
                alt={story.title}
                className="w-full h-48 object-cover bg-emerald-50"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800">{story.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{story.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🌱 Call to Action */}
      <section className="text-center bg-emerald-50 p-10 rounded-2xl shadow-sm">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          Let’s Create More Stories Together 🌍
        </h2>
        <p className="text-gray-600 mb-6">
          Explore new causes and continue making a real impact.
        </p>
        <a
          href="/causes"
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-md"
        >
          Explore Causes
        </a>
      </section>
    </div>
  );
}
