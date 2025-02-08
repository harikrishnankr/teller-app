export default function Loader() {
  return (
    <section className="rounded-xl bg-card text-card-foreground shadow-sm p-6">
      <div className="flex justify-between mb-4">
        <div className="h-7 w-32 animate-pulse bg-[#414e61] rounded-md"></div>
        <div className="flex gap-2">
          <div className="h-7 w-10 md:w-24 animate-pulse bg-[#414e61] rounded-md"></div>
          <div className="h-7 w-10 md:w-24 animate-pulse bg-[#414e61] rounded-md"></div>
        </div>
      </div>
      <div>
        <div className="flex flex-wrap justify-between">
          {Array.from({ length: 20 }, () => "").map((_, idx) => (
            <div
              key={idx}
              className="flex justify-between mb-3 w-full md:w-[45%]"
            >
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 animate-pulse bg-[#414e61] rounded-md"></div>
                <div className="w-[34px] h-[34px] animate-pulse bg-[#414e61] rounded-full"></div>
                <div className="w-28 h-5 animate-pulse bg-[#414e61] rounded-md"></div>
              </div>
              <div className="flex justify-between gap-2">
                <div className="h-7 w-10 animate-pulse bg-[#414e61] rounded-md"></div>
                <div className="h-7 w-10 animate-pulse bg-[#414e61] rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
