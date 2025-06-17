import clsx from "clsx";
import Image from "next/image";
import Marquee from "react-fast-marquee";

type CompaniesProps = {
  left: string;
  top: string;
};

const logos = [
  {
    alt: "lyft",
    src: "https://images.ctfassets.net/k0lk9kiuza3o/Y595RQBDR1fW5blQZfd9l/b9f3e2557c598b1ea51bb4e55f507833/lyft-customer-logo.svg",
  },
  {
    alt: "compass",
    src: "https://images.ctfassets.net/k0lk9kiuza3o/6PFPRWMRMxRXthyXYcDRiR/ee7cc3f3ca0ed78752db06ce662a95f8/compass-customer-logo.svg",
  },
  {
    alt: "loreal",
    src: "https://images.ctfassets.net/k0lk9kiuza3o/42drnxHfXrNOGKnVE9iA3r/a7f1bea3f67ca614e359eb6de12d8ba1/loreal-customer-logo.svg",
  },
  {
    alt: "zendesk",
    src: "https://images.ctfassets.net/k0lk9kiuza3o/4AUQ47IN6ZBtXtWXt65L3D/24dae32ff49baaf8feecf9471804420d/zendesk-customer-logo.svg",
  },
  {
    alt: "dropbox",
    src: "https://images.ctfassets.net/k0lk9kiuza3o/bOnLOncEyDdb8izczJggp/b98f4d8da30cfff0a87e8dce2bced46e/dropbox-customer-logo.svg",
  },
  {
    alt: "doordash",
    src: "https://images.ctfassets.net/k0lk9kiuza3o/6fo1ntHspDIwlAN45IgxRU/fbba98755d036e6d87631d0c5eccab25/doordash-customer-logo.svg",
  },
  {
    alt: "crocs",
    src: "https://images.ctfassets.net/k0lk9kiuza3o/56cjEhKMIFlRPdVUSQqMYD/a33ef976df35d4e240246d5e08bcb610/crocs-customer-logo.svg",
  },
  {
    alt: "texas",
    src: "https://images.ctfassets.net/k0lk9kiuza3o/2mrcuJTrXykG4Caan2TpE6/0661ed94e3fa2f1e19dba6b8a1e40f65/texas-ut-austin-customer-logo.svg",
  },
  {
    alt: "ancestry",
    src: "https://images.ctfassets.net/k0lk9kiuza3o/6aSAknGku3oEB7jL7xEjLs/7004d26e48686e4a2b6e99348e1899fc/ancestry-customer-logo.svg",
  },
  {
    alt: "clickup",
    src: "https://images.ctfassets.net/k0lk9kiuza3o/1t4mL2cJruvAambU0hhBlA/37d38090e2283844cc368e6ec4633feb/clickup-customer-logo.svg",
  },
];

export default function Companies(props: CompaniesProps) {
  return (
    <section
      className={clsx("absolute overflow-hidden py-6", props.left, props.top)}
    >
      <Marquee speed={40} pauseOnHover gradient={false}>
        {logos.map((logo, index) => (
          <Image
            key={index}
            src={logo.src}
            alt={logo.alt}
            width={120}
            height={60}
            className="mx-10 h-8 w-auto"
          />
        ))}
      </Marquee>
    </section>
  );
}
