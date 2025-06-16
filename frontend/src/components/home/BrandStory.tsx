import { motion } from "framer-motion";

export default function BrandStory() {
  return (
    <section id="story" className="py-6 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative z-10">
        {/* Titre principal */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Apropos</h2>
          <div className="w-28 h-1 bg-green-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Grille principale */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-semibold text-gray-900">
              « Né dans la rue, forgé par l'effort »
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              FITIX est né de la passion brute pour le sport, le style et la résilience dans tous les
              domaines de la vie. Fondée par un passionné de sport issu de quartiers où chaque
              terrain de sport est une scène, chaque match un combat, chaque tenue une
              déclaration d'identité.
            </p>
          </motion.div>

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="aspect-square overflow-hidden rounded-2xl shadow-lg">
              <img
                src="https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg"
                alt="Urban sports"
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl shadow-lg">
              <img
                src="https://images.pexels.com/photos/1480520/pexels-photo-1480520.jpeg"
                alt="Street workout"
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
              />
            </div>
          </motion.div>
        </div>

        {/* Valeurs de la marque */}
        <div className="mt-14 grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Énergie urbaine",
              desc: "Un style ancré dans la rue, inspiré des playgrounds, du hip-hop et des codes de la culture urbaine ivoirienne."
            },
            {
              title: "Résilience & Performance",
              desc: "Vêtements faits pour bouger, durer, résister tout comme ceux qui les portent."
            },
            {
              title: "Style affirmé",
              desc: "Coupes modernes, graphismes forts, symboles qui parlent sans dire un mot."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >
              <h4 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Arrière-plan décoratif */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl -z-10 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-100 rounded-full opacity-20 blur-3xl -z-10 translate-x-1/2 translate-y-1/2"></div>
    </section>
  );
}
