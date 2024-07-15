import Link from 'next/link';
function NotFound() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="text-primary-600 dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
              404
            </h1>

            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Sorry, we can not find that page. You will find lost to explore on
              the home page.
            </p>
            <Link href="/">Back to homepage</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFound;
