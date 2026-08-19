import React from 'react'

const About = () => {
  const cards = [
    {
      title: "Private Chat",
      content: "Chat privately with individual users through dedicated conversations."
    },
    {
      title: "Secure Authentication",
      content: "User authentication is handled using Django Simple JWT."
    },
    {
      title: "User List",
      content: "View available users and quickly start a conversation."
    },
    {
      title: "Message History",
      content: "Previous messages are stored and displayed inside your conversations."
    },
    {
      title: "Responsive Design",
      content: "ChatOn works across desktop and mobile devices."
    },
    {
      title: "Simple Interface",
      content: "A clean and focused interface designed around messaging."
    }
  ]

  const frontend = [
    "React",
    "Tailwind CSS",
    "Axios",
    "React Router",
    "Lucide React"
  ]

  const backend = [
    "Django",
    "Django REST Framework",
    "Simple JWT"
  ]

  return (
    <div className="min-h-screen bg-[#0f1117] px-4 py-8 text-white sm:px-8 lg:px-16">

      {/* Hero */}
      <section className="mx-auto max-w-5xl text-center">

        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
          <span className="text-2xl font-bold text-indigo-400">
            C
          </span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Chat<span className="text-indigo-400">On</span>
        </h1>

        <p className="mt-3 text-lg text-gray-400">
          Simple. Private. Connected.
        </p>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-gray-500">
          ChatOn is a simple private messaging application built to make
          connecting with people easy, fast, and straightforward.
        </p>

      </section>


      {/* About */}
      <section className="mx-auto mt-16 max-w-5xl">

        <div className="mb-6">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-indigo-400">
            About the project
          </p>

          <h2 className="text-3xl font-bold">
            About ChatOn
          </h2>
        </div>

        <div className="rounded-2xl border border-[#292d38] bg-[#171a22] p-6 sm:p-8">

          <p className="leading-7 text-gray-400">
            ChatOn is a private messaging application that allows registered
            users to discover other users and start one-to-one conversations.
            Users can send messages, view previous conversations, and continue
            chatting from where they left off.
          </p>

          <p className="mt-4 leading-7 text-gray-400">
            The project was created as a full-stack application to explore
            authentication, REST APIs, database relationships, React state
            management, and responsive user interface development.
          </p>

        </div>

      </section>


      {/* Features */}
      <section className="mx-auto mt-16 max-w-5xl">

        <div className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-indigo-400">
            What it offers
          </p>

          <h2 className="text-3xl font-bold">
            Features
          </h2>
        </div>


        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {cards.map((card) => {
            return (
              <div
                key={card.title}
                className="group rounded-2xl border border-[#292d38] bg-[#171a22] p-5 transition duration-200 hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-[#1b1f29]"
              >

                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                  <span className="font-bold">
                    ✓
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-100">
                  {card.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {card.content}
                </p>

              </div>
            )
          })}

        </div>

      </section>


      {/* Tech Stack */}
      <section className="mx-auto mt-16 max-w-5xl">

        <div className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-indigo-400">
            Built with
          </p>

          <h2 className="text-3xl font-bold">
            Tech Stack
          </h2>
        </div>


        <div className="grid gap-5 md:grid-cols-2">

          {/* Frontend */}
          <div className="rounded-2xl border border-[#292d38] bg-[#171a22] p-6">

            <h3 className="mb-5 text-xl font-semibold">
              Frontend
            </h3>

            <div className="flex flex-wrap gap-2">

              {frontend.map((tech) => {
                return (
                  <span
                    key={tech}
                    className="rounded-full border border-[#303642] bg-[#1c2029] px-4 py-2 text-sm text-gray-300"
                  >
                    {tech}
                  </span>
                )
              })}

            </div>

          </div>


          {/* Backend */}
          <div className="rounded-2xl border border-[#292d38] bg-[#171a22] p-6">

            <h3 className="mb-5 text-xl font-semibold">
              Backend
            </h3>

            <div className="flex flex-wrap gap-2">

              {backend.map((tech) => {
                return (
                  <span
                    key={tech}
                    className="rounded-full border border-[#303642] bg-[#1c2029] px-4 py-2 text-sm text-gray-300"
                  >
                    {tech}
                  </span>
                )
              })}

            </div>

          </div>

        </div>

      </section>


      {/* How it works */}
      <section className="mx-auto mt-16 max-w-5xl">

        <div className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-indigo-400">
            Getting started
          </p>

          <h2 className="text-3xl font-bold">
            How ChatOn Works
          </h2>
        </div>


        <div className="grid gap-4 md:grid-cols-3">

          <div className="rounded-2xl border border-[#292d38] bg-[#171a22] p-6">

            <div className="mb-4 text-2xl font-bold text-indigo-400">
              01
            </div>

            <h3 className="font-semibold">
              Create an account
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Sign up and securely authenticate yourself to access ChatOn.
            </p>

          </div>


          <div className="rounded-2xl border border-[#292d38] bg-[#171a22] p-6">

            <div className="mb-4 text-2xl font-bold text-indigo-400">
              02
            </div>

            <h3 className="font-semibold">
              Choose a person
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Browse the available users and select someone you want to chat
              with.
            </p>

          </div>


          <div className="rounded-2xl border border-[#292d38] bg-[#171a22] p-6">

            <div className="mb-4 text-2xl font-bold text-indigo-400">
              03
            </div>

            <h3 className="font-semibold">
              Start chatting
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Send messages and continue your private conversation whenever
              you want.
            </p>

          </div>

        </div>

      </section>


      {/* Project Purpose */}
      <section className="mx-auto mt-16 max-w-5xl">

        <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6 text-center sm:p-10">

          <h2 className="text-2xl font-bold">
            Built as a Learning Project
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500">
            ChatOn was built to practice full-stack web development concepts
            including React, Django, REST APIs, JWT authentication, database
            communication, and responsive UI design.
          </p>

        </div>

      </section>

      <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5 text-center">
        <p className="text-sm leading-6 text-gray-400">
          <span className="font-semibold text-yellow-400">Note:</span>{" "}
          ChatOn is purely a learning and knowledge-building project.
          It is created for educational purposes and is not intended for
          commercial use or any other activity.
        </p>
      </div>


      {/* Footer */}
      <footer className="mx-auto mt-20 max-w-5xl border-t border-[#292d38] pt-6 text-center">

        <p className="text-sm text-gray-600">
          ChatOn © 2026 Ganesh Ralla
        </p>

        <p className="mt-1 text-xs text-gray-700">
          Simple Private Connected
        </p>

      </footer>

    </div>
  )
}

export default About