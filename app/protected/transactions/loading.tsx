export default function Loader() {
  return (
    <section className="rounded-xl bg-card text-card-foreground shadow-sm p-6">
      <div>
        <div className="flex flex-wrap justify-between">
          {Array.from({ length: 5 }, () => "").map((_, idx) => (
            <div
              key={idx}
              className="flex justify-between mb-3 w-full flex-col"
            >
              <div className="mb-3">
                <div className="w-[180px] h-5 animate-pulse bg-[#414e61] rounded-md"></div>
              </div>
              {Array.from({ length: 5 }, () => "").map((_, idx) => (
                <div className="flex justify-between gap-4 mb-4" key={idx}>
                  <div className="w-1/3 max-w-28 h-5 animate-pulse bg-[#414e61] rounded-md"></div>
                  <div className="w-1/2 max-w-52 h-5 animate-pulse bg-[#414e61] rounded-md"></div>
                  <div className="w-[100px] h-5 animate-pulse bg-[#414e61] rounded-md"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
