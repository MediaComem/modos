import { Layout, Section, Grid, Cell } from '../components/index';

const About = () => (
  <>
    <Section>
      <h2>Le projet</h2>
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
      <img src="zeit.svg" width="300" height="300"></img>
    </Section>
    <Section>
      <h2>Team</h2>
      <Grid columns={2} rows={3}>
        <Cell>
          <img src="zeit.svg" width="50" height="50"></img>
        </Cell>
        <Cell>
          <img src="zeit.svg" width="50" height="50"></img>
        </Cell>
        <Cell>
          <img src="zeit.svg" width="50" height="50"></img>
        </Cell>
        <Cell>
          <img src="zeit.svg" width="50" height="50"></img>
        </Cell>
        <Cell>
          <img src="zeit.svg" width="50" height="50"></img>
        </Cell>
      </Grid>
    </Section>
  </>
);

export default About;
