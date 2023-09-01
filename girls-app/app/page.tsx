import Link from "next/link"

export default function Home() {
  return (
    <header>
        <h1 className="logowrap">
            <img src="./images/logo.jpg" alt="로고"/>
        </h1>
        <div className="menuwrap">
            <h2>MENU</h2>
            <nav className="navbar">
            <Link href="/">메인</Link>
            <Link href="/artists">artists</Link>
            <Link href="/albums">Albums</Link>
            <Link href="/gallery">gallery</Link>
            <Link href="/videos">videos</Link>
            </nav>
        </div>
    </header>
  )
}
