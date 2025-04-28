import Header from '../../components/survey/Header'
import Home from '../../components/survey/Home'
import { NavTitles } from '../../enums/titles'
import { UserRoles } from '../../enums/userRoles'

const Survey = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title={NavTitles.SURVEY} role={UserRoles.USER} />
      <Home />
    </div>
  )
}

export default Survey
