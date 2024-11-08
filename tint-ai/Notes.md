#

## Steps
### Environment setup
* Running the initial `make start` command didn't work, as it appears this project is set up to run on linux or mac.
  * I had to modify my system environment variables to overwrite the expected windows executables.
* When running `make test`, I had to install `cross-env` to allow the setting of `NODE_ENV` environment variable.
* Then, the database didn't want to start, complainig about not being able to open the needed ports.
  * Turns out the `5432` port is reserved by Hyper-V on Windows, so I changed the port to 6000 and the DB was able to start
  * But that didn't end up working, so I just disabled Hyper-V and re-made the docker image
* Then I looked up a tutorial on Drizzle, realized I needed to run `make db-migrate` to initialize the tables

### Next
* Now, finally I'm actually at the start of the test itself.
* Look up the Stipe docs
* Find tutorial, which talks about adding an API route to Next
  * Look up how that works
  * Set up a basic one, install Postman to test it
  * Turns out it *has* to be in `pages/api`, so I made that in `src/pages/api`, which feels messy to me but we'll leave it for now
  * Jk it changed: https://stackoverflow.com/questions/75418329/how-do-you-put-api-routes-in-the-new-app-folder-of-next-js
* Learned about Stripe's Sandboxes, which is what I'm going to leave the payment details as
* Continue to try to figure out how to actually integrate Stripe into the webpage
  * Got some part of the code, but then I need a client secret, which none of the tutorials say how to get, they just assume it's already known
  * So now I go to the Stripe Payment Intents API docs
* Followed tutorials, figured out how to get the checkout session created and retrieve the client secret
* Need to set up a webhook for payment completed, locally authenticated the stripe CLI
* Followed the Stripe CLI docs to set up local forwarding (which will be done with `make start-stripe`, or integrated into the `make start` command)
* Nice! The basics are all wired up, now I need to expand the fields that can be entered on the payment form
* Turns out I misunderstood part of the Stripe docs. There's an option to just redirect the client to a stripe-hosted page that will handle all of the payment stuff. I'm going to do that instead of trying to create a payment page using the elements, since it's faster.
* Payment page is all hooked up, and redirects to a temporary page at `/quotes/done`.
* Issue I ran into, the price from the quote isn't being used in Stripe.
  * I tried to figure out how to do ad-hoc pricing, but the solution in the Stripe docs didn't end up working for some reason, and I'm low on time, so I left a TODO.
* 