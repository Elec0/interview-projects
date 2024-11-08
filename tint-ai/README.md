# Technical Test

## Context

Tint provides a low-code tool that allows our customers to propose whole-fledged Insurance protection to their end-users using only a few lines of code (you can think of it as Google Analytics for insurance).

You are going to work on our Protection Portal. This portal is the one the end-users are interacting with. And more precisely, you will work on the payment flow. After the initial quote and successful payment, we'll turn the end-user submission into a policy, covering them for the transaction.

For alerting, Tint is using Datadog. We set up alerts based on the log attributes. For instance, we could trigger a `Slow response` alert if our `response.durationMs` property exceeds 2,000. 

## Expectations

We expect you to scope down the given high-level objective and implement it. At the end of the case study, you should submit:

* A pull request containing all your changes,
* A quick overview of the feature (eg. through a [Loom video](https://www.loom.com/looms/videos), screenshots, etc.).

If you need to detail your thought process or to mention how you would handle alerts, you can use the PR description.

To speed up the review process, don't hesitate to ping your hiring manager once you are done.

## Guidelines

As in a real-world situation, you have access to all the resources you may need. Google, StackOverflow, AI-powered assistants... Take all the tools you are comfortable with to make it work!

As an early-stage start-up, Tint is **focused on the speed of execution rather than on long-term scalability**. You should keep it in mind when working on this technical test. 

**You should not spend more than 3 hours on this exercise.**  You may need to take shortcuts or reduce the scope to make it fit. This is expected, as a Senior Software Engineer should also challenge the decisions to find the fastest way to provide value to our customers.

This exercise is going to use Stripe. You can create a [free account](https://dashboard.stripe.com/) if you don't already have one.

## Objective

The end-user currently has access to a quote to estimate the cost of his protection. We now need to implement the payment system (using Stripe) to turn their quote into a policy. 

For the sake of this technical test, we don't provide any mock-ups. 

**Acceptance criteria:**

* The user should pay the premium related to the created quote.
* In case of a successful payment, we should turn the quote into a policy, in a new `policies` table.
* In case of a failed payment, an alert should warn the Tint team of an issue.
* A Tint admin should be able to proceed to a refund in the rare cases where an end-user requests it.

## Launching the Project

To launch this project, you need to install:

* [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/), to launch the Postgres database
* Node 20 (you can install it through [nvm](https://github.com/nvm-sh/nvm))

Once these dependencies are installed, you can set up and launch the projects:

```sh
# install dependencies, load the database fixtures
make init

# launch the project
make start

# launch the tests
make test
make test-watch
```

Don't hesitate to check the `Makefile` to get a list of all available commands.