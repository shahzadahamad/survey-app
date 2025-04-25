import useNavigation from "../../hooks/useNavigation";
import { SubmissionProps, SubmissionType } from "../../interfaces/surveyInterface";

const Submissions = ({ role }: SubmissionProps) => {

  const { goToHome } = useNavigation();

  const submissions: SubmissionType[] = [
    { id: 1, name: 'John Doe', gender: 'Male', nationality: 'USA', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St', message: 'Great survey!', date: '24/02/2024' },
    { id: 2, name: 'Jane Smith', gender: 'Female', nationality: 'Canada', email: 'jane@example.com', phone: '987-654-3210', address: '456 Oak Ave', message: 'Looking forward to more surveys!', date: '24/02/2024' },
    { id: 3, name: 'Alex Wong', gender: 'Non-binary', nationality: 'Singapore', email: 'alex@example.com', phone: '555-123-4567', address: '789 Pine Rd', message: 'Thanks for the opportunity!', date: '24/02/2024' },
  ];

  return (
    <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-50 flex justify-start">
      <div className="w-full py-6 px-2 sm:px-8 transition-all duration-500 transform translate-y-0 opacity-100">
        {
          role === 'user' && (
            <div className="flex justify-end mb-4">
              <button
                onClick={() => goToHome()}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-all text-sm"
              >
                Back
              </button>
            </div>
          )
        }
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nationality</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {submissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">{submission.id}</td>
                  <td className="py-4 px-4 text-sm text-gray-800">{submission.name}</td>
                  <td className="py-4 px-4 text-sm text-gray-800">{submission.gender}</td>
                  <td className="py-4 px-4 text-sm text-gray-800">{submission.nationality}</td>
                  <td className="py-4 px-4 text-sm text-gray-800">{submission.email}</td>
                  <td className="py-4 px-4 text-sm text-gray-800">{submission.phone}</td>
                  <td className="py-4 px-4 text-sm text-gray-800">{submission.address}</td>
                  <td className="py-4 px-4 text-sm text-gray-800">{submission.message}</td>
                  <td className="py-4 px-4 text-sm text-gray-800">{submission.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Submissions;
