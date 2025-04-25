import Header from '../../components/survey/Header'
import Submissions from '../../components/survey/Submissions'

const SurveySubmissions = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title={'Survey Submissions'} />
      <Submissions role="user" />
    </div>
  )
}

export default SurveySubmissions
