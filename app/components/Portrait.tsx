export function Portrait() {
  return (
    <img
      src="/portrait.png"
      alt="Portrait of Daniel Israel"
      className="h-[min(42vw,170px)] w-[min(42vw,170px)] shrink-0 rounded-full border-[3px] border-sky-300/55 object-cover object-top shadow-lg shadow-slate-950/50 md:h-[min(36vw,220px)] md:w-[min(36vw,220px)]"
    />
  );
}
