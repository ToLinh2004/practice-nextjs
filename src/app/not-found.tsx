import Link from 'next/link';
function NotFound() {
  return (
    <section className="flex h-screen items-center justify-center bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl lg:px-6 lg:py-16 mx-auto px-4 py-8">
        <div className="max-w-screen-sm mx-auto text-center">
          <h1 className="text-primary-600 dark:text-primary-500 lg:text-9xl mb-4 text-7xl font-extrabold tracking-tight">404</h1>

          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, we can not find that page. The page you are looking for doesn&apos;t exit or an other error occured, go back to home page
          </p>
          <Link href="/" className="underline">
            Back to home page
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
