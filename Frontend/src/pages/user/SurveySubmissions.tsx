import Header from '../../components/survey/Header'
import Submissions from '../../components/survey/Submissions'
import { NavTitles } from '../../enums/titles'
import { UserRoles } from '../../enums/userRoles'

const SurveySubmissions = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title={NavTitles.SURVEY_SUBMISSIONS} role={UserRoles.USER} />
      <Submissions role={UserRoles.USER} />
    </div>
  )
}

export default SurveySubmissions
