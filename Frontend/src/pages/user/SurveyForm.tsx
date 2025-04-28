import Header from '../../components/survey/Header'
import Form from '../../components/survey/Form'
import { NavTitles } from '../../enums/titles'
import { UserRoles } from '../../enums/userRoles'

const SurveyForm = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title={NavTitles.SURVEY_FORM} role={UserRoles.USER} />
      <Form />
    </div>
  )
}

export default SurveyForm
