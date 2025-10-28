export default function Introduction() {
  return (
    <div className='w-full h-auto flex flex-col items-start gap-6'>
      <h1 className='text-white text-2xl font-medium tracking-wide'>
        <span className='text-amber-400'>01.</span>&nbsp;Introduction
      </h1>

      <div className='w-full h-auto flex flex-col items-start gap-3'>
        <p className='w-full max-w-[1024px] text-neutral-200 text-base font-normal tracking-wider'>
          Moviepire was inspired by platforms like IMDb, but it takes a more
          personal approach — designed as a digital diary for people who are
          truly passionate about movies, TV shows, and animations. The idea
          started from a simple goal: to create a space where users can track,
          rate, and reflect on what they've watched, while I learn and grow as a
          developer.
        </p>

        <p className='w-full max-w-[1024px] text-neutral-200 text-base font-normal tracking-wider'>
          From the very beginning, the project's main purpose wasn't commercial
          — it was educational. I wanted to build something real, end-to-end,
          that would help me practice full-stack development, improve
          architectural thinking , and apply everything I've learned about
          modern web technologies.
        </p>

        <p className='w-full max-w-[1024px] text-neutral-200 text-base font-normal tracking-wider'>
          Even if it doesn't claim to be unique, Moviepire already includes a
          solid set of well-built features:
        </p>

        <ul className='w-full max-w-[1024px] h-auto flex flex-col gap-3 list-disc list-inside leading-relaxed marker:text-amber-400'>
          <li className='w-full h-auto text-neutral-200 text-base font-normal tracking-wider'>
            <span className='text-white font-medium'>
              Authentication system
            </span>
            &nbsp;— powered by Supabase (including email confirmation)
          </li>

          <li className='w-full h-auto text-neutral-200 text-base font-normal tracking-wider'>
            <span className='text-white font-medium'>Smart search</span>
            &nbsp;— for movies and shows by title
          </li>

          <li className='w-full h-auto text-neutral-200 text-base font-normal tracking-wider'>
            <span className='text-white font-medium'>Discovery page</span>
            &nbsp;— for finding random ideas about what to watch next
          </li>

          <li className='w-full h-auto text-neutral-200 text-base font-normal tracking-wider'>
            <span className='text-white font-medium'>Personal diary</span>
            &nbsp;— to log, rate, and filter your watched items by multiple
            criteria
          </li>

          <li className='w-full h-auto text-neutral-200 text-base font-normal tracking-wider'>
            <span className='text-white font-medium'>Statistics page</span>
            &nbsp;— summarizing your movie journey — including total watched,
            total rated, favorites, and average rating
          </li>

          <li className='w-full h-auto text-neutral-200 text-base font-normal tracking-wider'>
            <span className='text-white font-medium'>Profile management</span>
            &nbsp;— for updating account data
          </li>

          <li className='w-full h-auto text-neutral-200 text-base font-normal tracking-wider'>
            <span className='text-white font-medium'>
              Spam protection logic
            </span>
            &nbsp;— that restricts key actions (like rating, diary updates, and
            profile changes) until the email is verified
          </li>
        </ul>

        <p className='w-full max-w-[1024px] text-neutral-200 text-base font-normal tracking-wider'>
          Ultimately, Moviepire is a learning project with a soul — a blend of
          my love for cinema and my dedication to mastering web development
          through practical experience.
        </p>
      </div>
    </div>
  );
}
