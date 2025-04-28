import { ChevronRight, Database, FileText } from 'lucide-react';
import useNavigation from '../../hooks/useNavigation';
import { isLoggedIn } from '../../helpers/isLoggedIn';
import toast from 'react-hot-toast';
import { MESSAGES } from '../../constants/messages';

const Home = () => {
  const { goToSurveyForm, goToSurveySubmissions } = useNavigation();
  const isUserLoggedIN = isLoggedIn();
  return (
    <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-10 py-12 px-4 max-w-2xl mx-auto text-center">
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => isUserLoggedIN ? goToSurveyForm() : toast.error(MESSAGES.ERROR.SURVEY_FORM_SUBMISSION)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md transition-all transform hover:scale-105 shadow-lg w-64 justify-center"
          >
            <FileText size={20} />
            <span>Submit Form</span>
            <ChevronRight size={20} />
          </button>
          <p className="text-gray-600 text-sm max-w-md">
            Complete our comprehensive survey to share your valuable feedback. Your insights help us improve our services and better meet your needs.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => isUserLoggedIN ? goToSurveySubmissions() : toast.error(MESSAGES.ERROR.SURVEY_VIEW_SUBMISSION, { position: 'top-center' })}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md transition-all transform hover:scale-105 shadow-lg w-64 justify-center"
          >
            <Database size={20} />
            <span>View Submissions</span>
            <ChevronRight size={20} />
          </button>
          <p className="text-gray-600 text-sm max-w-md">
            Access and review your personal survey responses in a secure, organized data table. Track your submission history and manage your feedback in one place.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home;
