import { useLocation, Link } from "react-router-dom";

function BreadCrumpos() {
  const location = useLocation();
  const pathname = location.pathname;
  const pathnames = pathname.split("/").filter((elem) => elem);
  const crumbs = pathnames.map((elem) => {
    const path = `/${pathnames
      .slice(0, pathnames.indexOf(elem) + 1)
      .join("/")}`;
    return { name: elem, path };
  });
  return (
    <div>
      <nav className="flex bg-neutral-secondary-medium" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="gggg inline-flex items-center">
            <Link to="/" className="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand">
              <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" /></svg>
              Home
            </Link>
          </li>
          {crumbs.map((elem, index) => (
            <li key={index}>
              <div className="flex items-center space-x-1.5">
                <svg className="w-3.5 h-3.5 rtl:rotate-180 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" /></svg>
                <Link to={elem.path} className="gggg inline-flex items-center text-sm font-medium text-body hover:text-fg-brand">{elem.name}</Link>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}

export default BreadCrumpos;
