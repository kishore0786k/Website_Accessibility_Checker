export const sampleSites = [
  {
    id: 'startup-landing',
    name: 'Startup landing page',
    description: 'A marketing page with unlabeled controls, weak links, and skipped headings.',
    html: `<!doctype html>
<html>
  <head>
    <title></title>
  </head>
  <body>
    <header>
      <img src="/logo.svg">
      <nav>
        <a href="/pricing">click here</a>
        <a href="/docs">Learn more</a>
      </nav>
    </header>
    <main>
      <h1>Ship better launches</h1>
      <h3>Everything your team needs</h3>
      <img src="/dashboard.png">
      <form>
        <input id="email" type="email" placeholder="Email address">
        <button></button>
      </form>
      <section id="feature">
        <h2>Analytics</h2>
        <p style="color:#94a3b8;background-color:#cbd5e1">Tiny contrast text</p>
      </section>
      <section id="feature">
        <button aria-label="">☆</button>
      </section>
    </main>
  </body>
</html>`,
  },
  {
    id: 'checkout-flow',
    name: 'Checkout form',
    description: 'A form-heavy page with duplicate IDs and missing names.',
    html: `<!doctype html>
<html lang="en">
  <head>
    <title>Checkout</title>
  </head>
  <body>
    <main>
      <h1>Checkout</h1>
      <form>
        <label for="name">Full name</label>
        <input id="name" type="text">
        <input id="name" type="text" placeholder="Company">
        <select id="country">
          <option>United States</option>
        </select>
        <textarea placeholder="Delivery notes"></textarea>
        <button type="submit">Place order</button>
      </form>
      <a href="/terms">read more</a>
      <img alt="Credit cards accepted" src="/cards.png">
    </main>
  </body>
</html>`,
  },
  {
    id: 'clean-docs',
    name: 'Accessible docs page',
    description: 'A mostly healthy sample with semantic labels and good document basics.',
    html: `<!doctype html>
<html lang="en">
  <head>
    <title>Accessible component documentation</title>
  </head>
  <body>
    <main>
      <h1>Accessible component documentation</h1>
      <section>
        <h2>Buttons</h2>
        <p>Every icon-only control has an accessible name.</p>
        <button aria-label="Open settings">⚙</button>
      </section>
      <section>
        <h2>Newsletter</h2>
        <form>
          <label for="email">Email address</label>
          <input id="email" type="email">
          <button type="submit">Subscribe</button>
        </form>
      </section>
      <a href="/accessibility-statement">Read the accessibility statement</a>
      <img src="/chart.png" alt="Accessibility score improved from 72 to 94">
    </main>
  </body>
</html>`,
  },
]

