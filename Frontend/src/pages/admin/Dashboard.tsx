import Header from '../../components/survey/Header'
import Submissions from '../../components/survey/Submissions'

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title={'Dashboard'} />
      <Submissions role='admin' />
    </div>
  )
}

export default Dashboard
