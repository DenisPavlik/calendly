import clsx from "clsx";
import Image from "next/image";

type CompaniesProps = {
  left: string;
  top: string;
};

export default function Companies(props: CompaniesProps) {
  return (
    <section className={clsx("absolute overflow-hidden", props.left, props.top)}>
      <div className="flex text-center gap-8 *:h-8 mt-6">
        <Image
          src="https://images.ctfassets.net/k0lk9kiuza3o/Y595RQBDR1fW5blQZfd9l/b9f3e2557c598b1ea51bb4e55f507833/lyft-customer-logo.svg"
          alt="lyft"
          width={200}
          height={200}
        />
        <Image
          src="https://images.ctfassets.net/k0lk9kiuza3o/6PFPRWMRMxRXthyXYcDRiR/ee7cc3f3ca0ed78752db06ce662a95f8/compass-customer-logo.svg"
          alt="compass"
          width={200}
          height={200}
        />
        <Image
          src="https://images.ctfassets.net/k0lk9kiuza3o/42drnxHfXrNOGKnVE9iA3r/a7f1bea3f67ca614e359eb6de12d8ba1/loreal-customer-logo.svg"
          alt="loreal"
          width={200}
          height={200}
        />
        <Image
          src="//images.ctfassets.net/k0lk9kiuza3o/4AUQ47IN6ZBtXtWXt65L3D/24dae32ff49baaf8feecf9471804420d/zendesk-customer-logo.svg"
          alt="zendesk"
          width={200}
          height={200}
        />
        <Image
          src="https://images.ctfassets.net/k0lk9kiuza3o/bOnLOncEyDdb8izczJggp/b98f4d8da30cfff0a87e8dce2bced46e/dropbox-customer-logo.svg"
          alt="dropbox"
          width={200}
          height={200}
        />
        <Image
          src="https://images.ctfassets.net/k0lk9kiuza3o/6fo1ntHspDIwlAN45IgxRU/fbba98755d036e6d87631d0c5eccab25/doordash-customer-logo.svg"
          alt="dorrdash"
          width={200}
          height={200}
        />
      </div>
    </section>
  );
}
