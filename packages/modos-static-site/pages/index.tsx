import { Layout, Leaflet, Section, Button } from '../components/index';

const Home = () => (
  <>
    <Layout>
      <Section>
        <p>
          "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit..."
        </p>
      </Section>
      <Section>
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
          facilisis.
        </p>
        <Button>call to action</Button>
        <img src="zeit.svg" width="300" height="400"></img>
      </Section>
      <Section>
        <h2>Pourquoi Contribuer</h2>
        <div>
          <span>1</span>
          <h3>Raison 1</h3>
        </div>
        <div>
          <span>2</span>
          <h3>Raison 2</h3>
        </div>
      </Section>
      <Section>
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
      </Section>
      <Section>
        <Leaflet id="leaflet-map"></Leaflet>
      </Section>
    </Layout>
  </>
);

export default Home;
