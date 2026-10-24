import { Background, Contact, EngineeringPointOfView, Experience, Footer, Hero, Navbar, ProjectGrid, TechnicalFocus } from "@/components/portfolio";

export default function Home() {
  return <main className="page-shell"><a className="skip-link" href="#main-content">Skip to content</a><Navbar /><div id="main-content"><Hero /><EngineeringPointOfView /><ProjectGrid /><Experience /><TechnicalFocus /><Background /><Contact /></div><Footer /></main>;
}
