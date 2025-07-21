export default function MovieBanner({ children, movieBanner }) {
  return (
    <div
      style={{
        background: `
                radial-gradient(
                 circle,
                 rgba(0, 0, 0, 0) 25%,
                 rgba(0, 0, 0, 1) 95%
                ),
                linear-gradient(
                 to bottom,
                 rgba(0, 0, 0, 1),
                 rgba(0, 0, 0, 0.6),
                 rgba(0, 0, 0, 0.4),
                 rgba(0, 0, 0, 0.2),
                 rgba(0, 0, 0, 0.4),
                 rgba(0, 0, 0, 0.6),
                 rgba(0, 0, 0, 1)
                ),
                url(${movieBanner}) no-repeat center / cover
              `,
      }}
      className='w-full h-[800px] flex items-end justify-start p-12 text-white'
    >
      {children}
    </div>
  );
}
