import Image from "next/image";

type PropType = {
  selected: boolean;
  image: {
    url: string;
    name: string;
  };
  onClick: () => void;
};

export const Thumb = ({ selected, image, onClick }: PropType) => {
  return (
    <div className={`flex	shrink-0 grow-0 basis-1/4 pl-3 min-[576px]:basis-1/6`}>
      <button
        onClick={onClick}
        type="button"
        className={`h-[110px] w-full brightness-50 hover:brightness-100 ${selected ? " brightness-100" : ""}`}
      >
        <Image unoptimized
          src={image.url}
          alt={image.name}
          width={0}
          height={0}
          className="h-[110px] w-full sm:w-[182px]"
          sizes="20vw"
          placeholder="blur"
          blurDataURL={`data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mP8/OVbPQMRgHFUIX0VAgBWRiGjO2Ny1QAAAABJRU5ErkJggg==`}
          style={{
            borderRadius: "3px",
            objectFit: "cover",
          }}
        />
      </button>
    </div>
  );
};
