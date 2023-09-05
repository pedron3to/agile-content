import dynamic from "next/dynamic";

const Footer = dynamic(() => import("./Footer"));
const Header = dynamic(() => import("./Header"));
const Layout = dynamic(() => import("./Layout"));

export { Footer, Header, Layout };
