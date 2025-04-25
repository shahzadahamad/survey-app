import { useNavigate } from "react-router-dom"


const useNavigation = () => {

  const navigate = useNavigate();

  return {
    goToLogin: () => navigate('/login'),
    goToRegister: () => navigate('/register'),
    goToHome: () => navigate('/'),
    goToSurveyForm: () => navigate('/survey-form'),
    goToSurveySubmissions: () => navigate('/survey-submissions'),
    goBack: () => navigate(-1),
    navigateTo: (path: string) => navigate(path),
  }
}

export default useNavigation
