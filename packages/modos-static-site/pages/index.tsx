import { Layout, Leaflet } from '../components/index';

const Home = () => (
  <>
    <Layout>
      <section className="section">
        <p>
          "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit..."
        </p>
      </section>
      <section className="section">
        <h2>Nos valeurs</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed
          mauris turpis. Praesent est magna, fringilla id magna vitae, congue
          convallis metus. Integer pellentesque, nulla vel malesuada posuere,
          est urna blandit lectus, quis pulvinar quam ipsum sit amet quam.
          Suspendisse arcu enim, tincidunt eu nulla fermentum, lacinia fringilla
          nibh. Mauris arcu quam, tempor ut eleifend vel, iaculis a magna. Donec
          luctus mauris eget tempor mattis. Nam pharetra ultricies orci eu
          semper. Etiam ultricies auctor justo. Pellentesque elementum tincidunt
          facilisis.{' '}
        </p>
        <button className="button">call to action</button>
        <img src="zeit.svg" width="300" height="400"></img>
      </section>
      <section className="section">
        <h2>Pourquoi Contribuer</h2>
        <div>
          <span>1</span>
          <h3>Raison 1</h3>
        </div>
        <div>
          <span>2</span>
          <h3>Raison 2</h3>
        </div>
      </section>
      <section className="section">
        <h3>Codac</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed
          mauris turpis. Praesent est magna, fringilla id magna vitae, congue
          convallis metus. Integer pellentesque, nulla vel malesuada posuere,
          est urna blandit lectus, quis pulvinar quam ipsum sit amet quam.
          Suspendisse arcu enim, tincidunt eu nulla fermentum, lacinia fringilla
          nibh. Mauris arcu quam, tempor ut eleifend vel, iaculis a magna. Donec
          luctus mauris eget tempor mattis. Nam pharetra ultricies orci eu
          semper. Etiam ultricies auctor justo. Pellentesque elementum tincidunt
          facilisis.{' '}
        </p>
        <div>
          <img src="zeit.svg" width="200" height="50"></img>
          <img src="zeit.svg" width="200" height="50"></img>
          <img src="zeit.svg" width="200" height="50"></img>
        </div>
      </section>
      <section className="section">
        <Leaflet id="leaflet-map"></Leaflet>
      </section>
    </Layout>
  </>
);

export default Home;
