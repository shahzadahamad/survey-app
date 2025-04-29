import { useNavigate } from "react-router-dom"
import { ROUTES } from "../constants/routes";

const useNavigation = () => {

  const navigate = useNavigate();

  return {
    goToLogin: () => navigate(ROUTES.USER.LOGIN),
    goToAdminLogin: () => navigate(ROUTES.ADMIN.LOGIN),
    goToRegister: () => navigate(ROUTES.USER.REGISTER),
    goToHome: () => navigate(ROUTES.USER.HOME),
    goToSurveyForm: () => navigate(ROUTES.USER.SURVEY_FORM),
    goToSurveySubmissions: () => navigate(ROUTES.USER.SURVEY_SUBMISSIONS),
    goToDashboard: () => navigate(ROUTES.ADMIN.DASHBOARD),
    goBack: () => navigate(-1),
    navigateTo: (path: string) => navigate(path),
  }
}

export default useNavigation
