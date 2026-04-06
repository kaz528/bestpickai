import { useState } from 'react'
import Landing from './components/Landing'
import Chat from './components/Chat'
import Results from './components/Results'
import Detail from './components/Detail'
import Compare from './components/Compare'
import Header from './components/Header'

function App() {
  const [page, setPage] = useState('landing')
  const [device, setDevice] = useState('phone')
  const [results, setResults] = useState([])
  const [view, setView] = useState('chat')
  const [selectedItem, setSelectedItem] = useState(null)
  const [compareList, setCompareList] = useState([])
  const [budget, setBudget] = useState('$0 – $800')
  const toggleCompare = (item) => {
    setCompareList(prev =>
      prev.find(i => i.id === item.id)
        ? prev.filter(i => i.id !== item.id)
        : prev.length < 3 ? [...prev, item] : prev
    )
  }

  const startNewSearch = () => {
    setCompareList([])
    setResults([])
    setSelectedItem(null)
    setView('chat')
  }

  if (page === 'landing') {
    return <Landing onStart={() => setPage('app')} />
  }

  return (
    <div className="app-wrap">
      <Header device={device} setDevice={(d) => { setDevice(d); setCompareList([]); setResults([]); setView('chat') }} onHome={() => setPage('landing')} />
      {view === 'chat' && (
        <Chat
          device={device}
          budget={budget}
          setBudget={setBudget}
          setResults={setResults}
          setView={setView}
        />
      )}

      {view === 'results' && (
        <Results
          results={results}
          compareList={compareList}
          toggleCompare={toggleCompare}
          setSelectedItem={setSelectedItem}
          setView={setView}
          budget={budget}
          setBudget={setBudget}
          startNewSearch={startNewSearch}
        />
      )}

      {view === 'detail' && selectedItem && (
        <Detail
          item={selectedItem}
          setView={setView}
          toggleCompare={toggleCompare}
          compareList={compareList}
        />
      )}

      {view === 'compare' && (
        <Compare
          compareList={compareList}
          setView={setView}
          setSelectedItem={setSelectedItem}
        />
      )}
    </div>
  )
}

export default App