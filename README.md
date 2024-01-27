# Developer Portfolio <!-- omit from toc -->

- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Frontend Design](#frontend-design)
- [Backend Design](#backend-design)
- [Let's Work Together](#lets-work-together)

## Introduction

Hello my name's Jared. I'm a passionate full-stack web developer. This portfolio reflects my dedication to creating useful and impactful web solutions.

## Tech Stack

A [Jamstack](https://jamstack.org/) was chosen for its scalability, security and performance. Other stacks did not offer the features needed for this app and dynamically rendering pages for the site on the server was not required for this application.

| Frontend                                                      | Backend                                                | Both                              |
| ------------------------------------------------------------- | ------------------------------------------------------ | --------------------------------- |
| **Astro** <br> popular frontend framework for routing         | **Fastify** <br> fast and lightweight server framework | **TypeScript** <br> static typing |
| **Svelte** <br>frontend framework to easily create components | **ejs** <br>HTML templating engine                     |
| **Scss** <br>styling preprocessor                             | **Notion SDK** <br> connect with Notion API            |
|                                                               | **resend** <br> email client                           |                                   |

## Frontend Design

The website is being statically rendered using the Astro framework. The components are written in Svelte as I personally find their syntax straightforward.
Scss was chosen as its readability for deeply nested selectors. I've used Tailwind in the past and would have been quicker to implement, but wouldn't have been as readable and scalable as the solution Scss provided.

## Backend Design

The site is being served statically using a Fastify server. Fastify was chosen for it's speed and ease of setup. Using a Node.JS server instead of a SSG service to serve the site was necessary in order to include the desired features for the contact form.
When the contact form is submitted a new page is created in a database in my Notion workspace. Notion is my go-to for organizing my notes and life, so being able to incorporate contact form correspondence seemed like a great fit. Eliminating the need for copying over user's details from an email to Notion saves time and potential for error within my workflow.
Also a follow-up email is sent to the user using resend and EJS. Resend is a new email framework that I wanted to try for it's ease of set-up and use. I used EJS to generate the email HTML and add in the user's contact form details. EJS is straightforward and easy to use.

## Let's Work Together

If you want to work on an idea or project please let me know. I enjoy challenges and learning new things. Should you want to check out some of my other work, you can find a full-stack resource manager [here](https://github.com/LettsDev/service_portfolio).
If you have any suggestions or just want to chat about tech you can shoot me an email at [jared@lettsdev.ca](mailto:jared@lettsdev.ca). I look forward to hearing from you and discussing how we can work together on exciting projects.
