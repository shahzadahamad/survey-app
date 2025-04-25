import Header from '../../components/survey/Header'
import Form from '../../components/survey/Form'

const SurveyForm = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title={'Survey Form'} />
      <Form />
    </div>
  )
}

export default SurveyForm
