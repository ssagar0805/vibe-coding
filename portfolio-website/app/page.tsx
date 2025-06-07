"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, ExternalLink, Code, Award } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/" className="flex items-center space-x-2">
              <Code className="h-6 w-6" />
              <span className="font-bold">Alex Chen</span>
            </Link>
          </motion.div>
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center gap-6 text-sm"
          >
            <Link href="#about" className="transition-colors hover:text-foreground/80">
              About
            </Link>
            <Link href="#skills" className="transition-colors hover:text-foreground/80">
              Skills
            </Link>
            <Link href="#projects" className="transition-colors hover:text-foreground/80">
              Projects
            </Link>
            <Link href="#certifications" className="transition-colors hover:text-foreground/80">
              Certifications
            </Link>
            <Link href="#contact" className="transition-colors hover:text-foreground/80">
              Contact
            </Link>
          </motion.nav>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button variant="outline" size="sm">
              Resume
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="about" className="container py-24 md:py-32 space-y-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="md:w-1/2 space-y-4"
          >
            <Badge className="px-3 py-1 text-sm">Frontend Developer</Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Hi, I'm Alex Chen</h1>
            <p className="text-xl text-muted-foreground">
              A passionate 4th year Computer Science student specializing in creating beautiful, responsive web
              experiences with modern technologies.
            </p>
            <p className="text-muted-foreground">
              I transform ideas into elegant, functional interfaces that users love. Currently seeking new opportunities
              to create impactful digital experiences.
            </p>
            <div className="flex gap-4 pt-4">
              <Button asChild>
                <Link href="#contact">Get in touch</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="#projects">View projects</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="md:w-1/2 flex justify-center"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/20">
              <img src="/placeholder.svg?height=400&width=400" alt="Alex Chen" className="object-cover w-full h-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="container py-24 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: scrollY > 200 ? 1 : 0, y: scrollY > 200 ? 0 : 20 }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-4"
        >
          <Badge className="px-3 py-1 text-sm">Skills</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Technical Expertise</h2>
          <p className="text-muted-foreground md:w-2/3 mx-auto">
            A comprehensive set of skills I've developed throughout my academic journey and professional experiences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: scrollY > 300 ? 1 : 0, y: scrollY > 300 ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-8"
        >
          {[
            "React",
            "Next.js",
            "TypeScript",
            "JavaScript",
            "Tailwind CSS",
            "HTML/CSS",
            "Redux",
            "Node.js",
            "Git",
            "Framer Motion",
            "Figma",
            "Responsive Design",
            "UI/UX",
            "RESTful APIs",
            "GraphQL",
            "Jest",
          ].map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: scrollY > 300 ? 1 : 0, y: scrollY > 300 ? 0 : 10 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="bg-card rounded-lg p-4 text-center border hover:border-primary/50 hover:shadow-md transition-all"
            >
              {skill}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container py-24 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: scrollY > 700 ? 1 : 0, y: scrollY > 700 ? 0 : 20 }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-4"
        >
          <Badge className="px-3 py-1 text-sm">Projects</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Featured Work</h2>
          <p className="text-muted-foreground md:w-2/3 mx-auto">
            A selection of projects that showcase my skills and passion for creating exceptional web experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
          {[
            {
              title: "E-commerce Dashboard",
              description:
                "A responsive admin dashboard for managing products, orders, and customers with real-time analytics.",
              tags: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
              link: "#",
            },
            {
              title: "Social Media App",
              description:
                "A full-featured social platform with real-time messaging, post sharing, and user authentication.",
              tags: ["Next.js", "Firebase", "Tailwind CSS", "Redux"],
              link: "#",
            },
            {
              title: "Weather Forecast App",
              description:
                "A beautiful weather application with 7-day forecasts, location search, and animated weather icons.",
              tags: ["React", "OpenWeather API", "Framer Motion"],
              link: "#",
            },
          ].map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: scrollY > 800 ? 1 : 0, y: scrollY > 800 ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
            >
              <Card className="overflow-hidden border border-muted h-full flex flex-col hover:shadow-lg transition-all">
                <CardHeader className="p-0">
                  <div className="h-48 bg-muted">
                    <img
                      src={`/placeholder.svg?height=300&width=600&text=Project+${index + 1}`}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription className="mt-2 text-muted-foreground">{project.description}</CardDescription>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={project.link} className="flex items-center justify-center gap-2">
                      View Project <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="container py-24 space-y-8 bg-muted/50 rounded-xl p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: scrollY > 1300 ? 1 : 0, y: scrollY > 1300 ? 0 : 20 }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-4"
        >
          <Badge className="px-3 py-1 text-sm">Certifications</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Professional Credentials</h2>
          <p className="text-muted-foreground md:w-2/3 mx-auto">
            Certifications and courses I've completed to enhance my skills and knowledge.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 pt-8">
          {[
            {
              title: "Meta Front-End Developer Professional Certificate",
              issuer: "Coursera",
              date: "2023",
              description:
                "Comprehensive front-end development program covering React, JavaScript, and responsive design principles.",
            },
            {
              title: "AWS Certified Cloud Practitioner",
              issuer: "Amazon Web Services",
              date: "2022",
              description:
                "Foundational understanding of AWS Cloud services, security, architecture, and deployment models.",
            },
            {
              title: "UI/UX Design Fundamentals",
              issuer: "Interaction Design Foundation",
              date: "2022",
              description: "Principles of user-centered design, wireframing, prototyping, and usability testing.",
            },
            {
              title: "JavaScript Algorithms and Data Structures",
              issuer: "freeCodeCamp",
              date: "2021",
              description:
                "Advanced JavaScript concepts, algorithms, and data structures for efficient problem-solving.",
            },
          ].map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: scrollY > 1400 ? 1 : 0, y: scrollY > 1400 ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.15 * index }}
            >
              <Card className="h-full hover:shadow-md transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{cert.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {cert.issuer} • {cert.date}
                      </CardDescription>
                    </div>
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container py-24 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: scrollY > 1800 ? 1 : 0, y: scrollY > 1800 ? 0 : 20 }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-4"
        >
          <Badge className="px-3 py-1 text-sm">Contact</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Get In Touch</h2>
          <p className="text-muted-foreground md:w-2/3 mx-auto">
            Feel free to reach out for collaborations, opportunities, or just to say hello!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: scrollY > 1900 ? 1 : 0, y: scrollY > 1900 ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center justify-center gap-6 pt-8"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="https://github.com/alexchen" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <Github className="h-5 w-5" />
                GitHub
              </Button>
            </Link>
            <Link href="https://linkedin.com/in/alexchen" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </Button>
            </Link>
            <Link href="mailto:alex.chen@example.com">
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email
              </Button>
            </Link>
          </div>

          <Card className="w-full max-w-md mt-8">
            <CardHeader>
              <CardTitle>Send me a message</CardTitle>
              <CardDescription>I'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Your message"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            <span className="font-medium">Alex Chen</span>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Alex Chen. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="https://github.com/alexchen" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://linkedin.com/in/alexchen" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="mailto:alex.chen@example.com">
              <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
