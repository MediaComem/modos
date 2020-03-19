import {
  Layout,
  Leaflet,
  Section,
  Button,
  Grid,
  Cell
} from '../components/index';

const Home = props => (
  <>
    <Section>
      <p style={{fontSize:"5vh", textAlign:"center", color:"lightgrey", fontStyle:"italic" ,alignSelf:"center", height:"100%", padding:"15%"}}>
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
        consectetur, adipisci velit..."
      </p>
    </Section>
    <Section>
      <h2>Nos valeurs</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed
        mauris turpis. Praesent est magna, fringilla id magna vitae, congue
        convallis metus. Integer pellentesque, nulla vel malesuada posuere, est
        urna blandit lectus, quis pulvinar quam ipsum sit amet quam. Suspendisse
        arcu enim, tincidunt eu nulla fermentum, lacinia fringilla nibh. Mauris
        arcu quam, tempor ut eleifend vel, iaculis a magna. Donec luctus mauris
        eget tempor mattis. Nam pharetra ultricies orci eu semper. Etiam
        ultricies auctor justo. Pellentesque elementum tincidunt facilisis.
      </p>
      <Button>call to action</Button>
      <img src="zeit.svg" width="300" height="400"></img>
    </Section>
    <Section>
      <h2>Pourquoi Contribuer</h2>
      <Grid columns={1} rows={2}>
        <Cell className="inline-flex">
          <span style={{border:'5px solid black', borderRadius:'50%',fontSize:"2em", width:'50px',height:'50px',textAlign:"center",lineHeight:'50px', display:"block"}}>1</span>
          <h3>Raison 1</h3>
        </Cell>
        <Cell className="inline-flex">
          <span style={{border:'5px solid black', borderRadius:'50%',fontSize:"2em", width:'50px',height:'50px',textAlign:"center",lineHeight:'50px', display:"block"}}>2</span>
          <h3>Raison 2</h3>
        </Cell>
      </Grid>
    </Section>
    <Section>
      <h3>Codac</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed
        mauris turpis. Praesent est magna, fringilla id magna vitae, congue
        convallis metus. Integer pellentesque, nulla vel malesuada posuere, est
        urna blandit lectus, quis pulvinar quam ipsum sit amet quam. Suspendisse
        arcu enim, tincidunt eu nulla fermentum, lacinia fringilla nibh. Mauris
        arcu quam, tempor ut eleifend vel, iaculis a magna. Donec luctus mauris
        eget tempor mattis. Nam pharetra ultricies orci eu semper. Etiam
        ultricies auctor justo. Pellentesque elementum tincidunt facilisis.{' '}
      </p>
      <Grid gap="0" columns={2} rows={2}>
        <Cell width={2}>
          <img src="zeit.svg" style={{ width: '100%', height: '50px' }}></img>
        </Cell>
        <Cell>
          <img src="zeit.svg" style={{ width: '100%', height: '50px' }}></img>
        </Cell>
        <Cell>
          <img src="zeit.svg" style={{ width: '100%', height: '50px' }}></img>
        </Cell>
      </Grid>
    </Section>
    <Section>
      <Leaflet id="leaflet-map"></Leaflet>
    </Section>
  </>
);

export default Home;
