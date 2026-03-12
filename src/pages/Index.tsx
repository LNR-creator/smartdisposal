import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Recycle, Trophy, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WASTE_CATEGORIES } from "@/data/mockData";

const features = [
  { icon: <Truck className="h-6 w-6 text-primary" />, title: "Schedule Pickups", desc: "Request waste pickup from your doorstep with a few taps." },
  { icon: <Recycle className="h-6 w-6 text-primary" />, title: "Smart Sorting", desc: "Learn how to properly sort and dispose of different waste types." },
  { icon: <Trophy className="h-6 w-6 text-primary" />, title: "Earn Rewards", desc: "Get eco-points for every disposal and climb the leaderboard." },
  { icon: <Leaf className="h-6 w-6 text-primary" />, title: "Track Impact", desc: "See your environmental impact grow with every recycling effort." },
];

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="Eco landscape" className="h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>
      <div className="container relative z-10 mx-auto px-4 py-24 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
            <Recycle className="h-4 w-4" /> Eco-Friendly Waste Management
          </div>
          <h1 className="mb-6 font-display text-4xl font-extrabold leading-tight text-foreground md:text-6xl">
            Dispose Smarter, <br />
            <span className="text-gradient-hero">Live Greener</span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Schedule waste pickups, earn rewards for recycling, and make a real impact on the environment — all from one app.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/login">
              <Button variant="hero" size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/guide">
              <Button variant="outline" size="lg">Learn More</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Features */}
    <section className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="font-display text-3xl font-bold text-foreground">How It Works</h2>
        <p className="mt-2 text-muted-foreground">Four simple steps to a greener tomorrow</p>
      </motion.div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-elevated"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">{f.icon}</div>
            <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Categories */}
    <section className="bg-muted/50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground">Waste Categories</h2>
          <p className="mt-2 text-muted-foreground">We handle all types of recyclable waste</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {WASTE_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 shadow-card text-center"
            >
              <span className="text-4xl">{cat.icon}</span>
              <span className="font-display font-semibold text-foreground">{cat.name}</span>
              <span className="text-xs text-muted-foreground">{cat.description}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="container mx-auto px-4 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-lg rounded-2xl bg-gradient-hero p-10 shadow-elevated"
      >
        <h2 className="mb-4 font-display text-2xl font-bold text-primary-foreground">Ready to Make a Difference?</h2>
        <p className="mb-6 text-primary-foreground/80">Join thousands of eco-warriors who are transforming waste disposal.</p>
        <Link to="/login">
          <Button variant="gold" size="lg" className="gap-2">
            Join Now <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </motion.div>
    </section>

    <Footer />
  </div>
);

export default Index;
