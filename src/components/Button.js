import { Link } from "react-router-dom";

// One button for the whole site.
//   <Button to="/contact">Book now</Button>        -> page inside the site
//   <Button href="tel:8848432124">Call</Button>    -> outside link / phone
//   <Button onClick={fn} type="submit">Send</Button>
// variant: "primary" (default), "ghost", "light"
export default function Button({ to, href, variant = "primary", children, ...rest }) {
  const className = `btn-fn btn-fn-${variant}`;
  if (to) return <Link to={to} className={className} {...rest}>{children}</Link>;
  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={className}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return <button className={className} {...rest}>{children}</button>;
}
