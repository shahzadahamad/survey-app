import Header from '../../components/survey/Header'
import Submissions from '../../components/survey/Submissions'
import { NavTitles } from '../../enums/titles'
import { UserRoles } from '../../enums/userRoles'

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title={NavTitles.DASHBOARD} role={UserRoles.ADMIN} />
      <Submissions role={UserRoles.ADMIN} />
    </div>
  )
}

export default Dashboard
