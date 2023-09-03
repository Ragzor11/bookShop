const { useState } = React

import { About } from "./pages/About.jsx";
import { BookIndex } from "./pages/BookIndex.jsx";
import { Home } from "./pages/Home.jsx";

export function App() {

    const [page, setPage] = useState('home')

    return (
        <section className="app main-layout">
            <header className="app-header full main-layout ">
                <h1>Book Shop V3</h1>
                <nav className="app-nav">
                    <a onClick={() => setPage('home')} href="#">Home</a>
                    <a onClick={() => setPage('about')} href="#">About</a>
                    <a onClick={() => setPage('books')} href="#">Books</a>
                </nav>
            </header>

            <main>
                {page === 'home' && < Home />}
                {page === 'about' && <About />}
                {page === 'books' && <BookIndex />}
            </main>
        </section>
    )
} 