export default function Footer() {
  return (
    <div className="mt-auto p-6 text-center">
      {' '}
      <h1>Alpine Sports, Inc.</h1>{' '}
      <p>All rights reserved, {new Date().getFullYear()}</p>{' '}
      <footer className="relative mt-16 pb-6 pt-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center justify-center md:justify-between">
                <div className="mx-auto w-full px-4 text-center md:w-6/12">
                  <div className="text-blueGray-500 py-1 text-sm font-semibold">
                    Made with{' '}
                    <a
                      href="https://www.creative-tim.com/product/notus-js"
                      className="text-blueGray-500 hover:text-gray-800"
                      target="_blank"
                    >
                      Notus JS
                    </a>{' '}
                    by{' '}
                    <a
                      href="https://www.creative-tim.com"
                      className="text-blueGray-500 hover:text-blueGray-800"
                      target="_blank"
                    >
                      {' '}
                      Creative Tim
                    </a>
                    .
                  </div>
                </div>
              </div>
            </div>
          </footer>
    </div>
  );
}
