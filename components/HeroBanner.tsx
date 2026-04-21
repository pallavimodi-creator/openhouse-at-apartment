export function HeroBanner() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        marginLeft: "calc(-50vw + 50%)",
        marginRight: "calc(-50vw + 50%)",
        width: "100vw",
      }}
    >
      <div className="relative flex flex-col justify-center bg-brand-orange px-6 pt-8 pb-20 md:px-10 md:pt-10 md:pb-24">
        <div className="relative z-10 mx-auto w-full max-w-4xl">
          <p className="text-[12px] font-bold text-white/90 md:text-[13px]">
            welcome to
          </p>
          <h1 className="mt-1 text-[26px] font-extrabold leading-[1.1] text-white drop-shadow-sm md:text-[34px] lg:text-[40px]">
            openhouse at apartment — teacher hub
          </h1>
          <p className="mt-1.5 max-w-[560px] text-[12px] font-medium leading-relaxed text-white/90 md:text-[13px]">
            programme details, session plans, game library, experience books — all in one place.
          </p>
        </div>

        {/* Wave bottom edge — brand-cream fill carves into the orange */}
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 block h-16 w-full md:h-20"
          aria-hidden
        >
          <path
            d="M0,22 C220,72 560,58 820,30 C1040,8 1240,38 1440,26 L1440,80 L0,80 Z"
            fill="#F9F2E8"
          />
        </svg>
      </div>
    </section>
  );
}
