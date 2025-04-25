import Header from '../../components/survey/Header'
import Home from '../../components/survey/Home'

const Survey = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title={'Survey'} />
      <Home />
    </div>
  )
}

export default Survey
