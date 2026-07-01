import { useState } from 'react';
import Layout from './components/layout/Layout';
import Navbar from './components/layout/Navbar';

function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <Layout>
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* board goes here in the next steps */}
      </main>
    </Layout>
  );
}

export default App;