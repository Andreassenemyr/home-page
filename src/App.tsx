import * as React from "react";
const { useRef, useState, useEffect } = React;
import { useSpring, a } from "@react-spring/web";
import useMeasure from "react-use-measure";
import { Container, Title, Frame, Content, toggle } from "./styles";
import * as Icons from "./icons";

function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => void (ref.current = value), [value]);
  return ref.current;
}

const Tree = React.memo<
  React.HTMLAttributes<HTMLDivElement> & {
    defaultOpen?: boolean;
    name: string | JSX.Element;
  }
>(({ children, name, style, defaultOpen = false }) => {
  const [isOpen, setOpen] = useState(defaultOpen);
  const previous = usePrevious(isOpen);
  const [ref, { height: viewHeight }] = useMeasure();
  const { height, opacity, y } = useSpring({
    from: { height: 0, opacity: 0, y: 0 },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      y: isOpen ? 0 : 20,
    },
  });
  // @ts-ignore
  const Icon =
    Icons[`${children ? (isOpen ? "Minus" : "Plus") : "Close"}SquareO`];
  return (
    <Frame>
      <Icon
        style={{ ...toggle, opacity: children ? 1 : 0.3 }}
        onClick={() => setOpen(!isOpen)}
      />
      <Title style={style}>{name}</Title>
      <Content
        style={{
          opacity,
          height: isOpen && previous === isOpen ? "auto" : height,
        }}
      >
        <a.div ref={ref} style={{ y }} children={children} />
      </Content>
    </Frame>
  );
});

export default function App() {
  return (
    <Container>
      <Tree
        name="Andreas Enemyr - Fullstack Developer & Entrepreneur"
        defaultOpen
      >

        <Tree name="Basic Information" defaultOpen>
          <div style={{ padding: "10px 0", color: "#666" }}>
            Fullstack Developer with extensive experience in web and software
            development,
            <br /> managing multiple projects, and leading successful companies.
            <br /> Beside work, I play alot of padel, and I mean alot.🎾
          </div>
        </Tree>

        <Tree name="Currently working" defaultOpen>
          <Tree name="Ribban.co">
            <div style={{ padding: "10px 0", color: "#666" }}>
              Founder, since 2018
              <br />
              Full stack web agency specialized in custom projects.
              <br />
              Website:&nbsp;
              <a target="_blank" href="https://ribban.co">
                ribban.co
              </a>
            </div>
          </Tree>
          <Tree name="Stensjö Vårdresurs">
            <div style={{ padding: "10px 0", color: "#666" }}>
              Key account manager, since 2021
              <br />
              Digital marketing studio located in Sweden.
              <br />
              Website:&nbsp;
              <a target="_blank" href="https://stensjovard.se">
                stensjovard.se
              </a>
            </div>
          </Tree>
          <Tree name="VelocityWeb">
            <div style={{ padding: "10px 0", color: "#666" }}>
              Founder, since 2018
              <br />
              Wordpress agency based in Sweden
              <br />
              Website:&nbsp;
              <a target="_blank" href="https://velocityweb.se">
                velocityweb.se
              </a>
            </div>
          </Tree>
          <Tree name="709 Media">
            <div style={{ padding: "10px 0", color: "#666" }}>
              Project manager / Head dev, since 2019
              <br />
              Digital marketing studio located in Sweden.
              <br />
              Website:&nbsp;
              <a target="_blank" href="https://709media.com">
                709media.com
              </a>
            </div>
          </Tree>
        </Tree>

        <Tree name="Education / Certifications">
          <Tree name="Master in Economics">
            <div style={{ padding: "10px 0", color: "#666" }}>
              Master in Economics at Karlstads University in Sweden.
            </div>
          </Tree>
          <Tree name="Shopify partner">
            <div style={{ padding: "10px 0", color: "#666" }}>
              Certified Shopity+ partner and dev.
            </div>
          </Tree>
          <Tree name="Google certified">
            <div style={{ padding: "10px 0", color: "#666" }}>
              Certified in Google cloud
            </div>
          </Tree>
        </Tree>

        {/* Projects 
        <Tree name="Projects">
          <Tree name="Project 1">
            <div style={{ padding: "10px 0", color: "#666" }}>
              Details about Project 1.
            </div>
          </Tree>
          <Tree name="Project 2">
            <div style={{ padding: "10px 0", color: "#666" }}>
              Details about Project 2.
            </div>
          </Tree>
         Add more projects as needed
        </Tree> */}

        <Tree name="Contact Information" defaultOpen>
          <div style={{ padding: "10px 0", color: "#666" }}>
            Email:&nbsp;
            <a href="mailto:andreas@ribban.co">andreas@ribban.co</a>
            <br />
            Phone:&nbsp;
            <a href="tel:+46767767712">+46 76 776 77 12</a>
            <br />
            LinkedIn:&nbsp;
            <a target="_blank" href="https://linkedin.com/in/andreasenemyr">
              @andreasenemyr
            </a>
          </div>
        </Tree>
        <Tree name={<span>🙀 page is empty</span>} />
      </Tree>
    </Container>
  );
}
