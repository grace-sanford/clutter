import CreateGame from '@/components/CreateGame'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <CreateGame />
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://github.com/grace-sanford"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <code className="font-mono font-bold">@gracesanford</code>
          </a>
        </div>
      </div>
    </main>
  )
}
