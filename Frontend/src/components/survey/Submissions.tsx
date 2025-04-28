import { useState, useEffect, useMemo } from "react";
import useNavigation from "../../hooks/useNavigation";
import { SubmissionProps, SubmissionType } from "../../interfaces/survey";

const Submissions = ({ role }: SubmissionProps) => {
  const { goToHome } = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{ key: keyof SubmissionType | null; direction: 'asc' | 'desc' | null }>({
    key: null,
    direction: null,
  });

  const submissions: SubmissionType[] = [
    { id: 1, name: 'John Doe', gender: 'Male', nationality: 'USA', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St', message: 'Great survey!' },
    { id: 2, name: 'Jane Smith', gender: 'Female', nationality: 'Canada', email: 'jane@example.com', phone: '987-654-3210', address: '456 Oak Ave', message: 'Looking forward to more surveys!' },
    { id: 3, name: 'Alex Wong', gender: 'Non-binary', nationality: 'Singapore', email: 'alex@example.com', phone: '555-123-4567', address: '789 Pine Rd', message: 'Thanks for the opportunity!' },
    { id: 1, name: 'John Doe', gender: 'Male', nationality: 'USA', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St', message: 'Great survey!' },
    { id: 2, name: 'Jane Smith', gender: 'Female', nationality: 'Canada', email: 'jane@example.com', phone: '987-654-3210', address: '456 Oak Ave', message: 'Looking forward to more surveys!' },
    { id: 3, name: 'Alex Wong', gender: 'Non-binary', nationality: 'Singapore', email: 'alex@example.com', phone: '555-123-4567', address: '789 Pine Rd', message: 'Thanks for the opportunity!' },
    { id: 1, name: 'John Doe', gender: 'Male', nationality: 'USA', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St', message: 'Great survey!' },
    { id: 2, name: 'Jane Smith', gender: 'Female', nationality: 'Canada', email: 'jane@example.com', phone: '987-654-3210', address: '456 Oak Ave', message: 'Looking forward to more surveys!' },
    { id: 3, name: 'Alex Wong', gender: 'Non-binary', nationality: 'Singapore', email: 'alex@example.com', phone: '555-123-4567', address: '789 Pine Rd', message: 'Thanks for the opportunity!' },
    { id: 1, name: 'John Doe', gender: 'Male', nationality: 'USA', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St', message: 'Great survey!' },
    { id: 2, name: 'Jane Smith', gender: 'Female', nationality: 'Canada', email: 'jane@example.com', phone: '987-654-3210', address: '456 Oak Ave', message: 'Looking forward to more surveys!' },
    { id: 3, name: 'Alex Wong', gender: 'Non-binary', nationality: 'Singapore', email: 'alex@example.com', phone: '555-123-4567', address: '789 Pine Rd', message: 'Thanks for the opportunity!' },
    { id: 1, name: 'John Doe', gender: 'Male', nationality: 'USA', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St', message: 'Great survey!' },
    { id: 2, name: 'Jane Smith', gender: 'Female', nationality: 'Canada', email: 'jane@example.com', phone: '987-654-3210', address: '456 Oak Ave', message: 'Looking forward to more surveys!' },
    { id: 3, name: 'Alex Wong', gender: 'Non-binary', nationality: 'Singapore', email: 'alex@example.com', phone: '555-123-4567', address: '789 Pine Rd', message: 'Thanks for the opportunity!' },
    { id: 1, name: 'John Doe', gender: 'Male', nationality: 'USA', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St', message: 'Great survey!' },
    { id: 2, name: 'Jane Smith', gender: 'Female', nationality: 'Canada', email: 'jane@example.com', phone: '987-654-3210', address: '456 Oak Ave', message: 'Looking forward to more surveys!' },
    { id: 3, name: 'Alex Wong', gender: 'Non-binary', nationality: 'Singapore', email: 'alex@example.com', phone: '555-123-4567', address: '789 Pine Rd', message: 'Thanks for the opportunity!' },
    { id: 1, name: 'John Doe', gender: 'Male', nationality: 'USA', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St', message: 'Great survey!' },
    { id: 2, name: 'Jane Smith', gender: 'Female', nationality: 'Canada', email: 'jane@example.com', phone: '987-654-3210', address: '456 Oak Ave', message: 'Looking forward to more surveys!' },
    { id: 3, name: 'Alex Wong', gender: 'Non-binary', nationality: 'Singapore', email: 'alex@example.com', phone: '555-123-4567', address: '789 Pine Rd', message: 'Thanks for the opportunity!' },
  ];

  // Filter submissions based on search term
  const filteredSubmissions = submissions.filter(submission => {
    if (searchTerm === "") return true;
    const searchLower = searchTerm.toLowerCase();

    return (
      submission.name.toLowerCase().includes(searchLower) ||
      submission.gender.toLowerCase().includes(searchLower) ||
      submission.nationality.toLowerCase().includes(searchLower) ||
      submission.email.toLowerCase().includes(searchLower) ||
      submission.phone.toLowerCase().includes(searchLower) ||
      submission.address.toLowerCase().includes(searchLower) ||
      submission.message.toLowerCase().includes(searchLower)
    );
  });

  // Sorting function
  const sortedData = useMemo(() => {
    const sortableItems = [...filteredSubmissions];
    if (sortConfig.key !== null && sortConfig.direction !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredSubmissions, sortConfig]);

  // Request sort function
  const requestSort = (key: keyof SubmissionType) => {
    let direction: 'asc' | 'desc' | null = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null;
    }
    setSortConfig({ key, direction });
  };

  // Get sort icon
  const getSortIcon = (columnName: keyof SubmissionType) => {
    if (sortConfig.key !== columnName) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }

    if (sortConfig.direction === 'asc') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      );
    }

    if (sortConfig.direction === 'desc') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      );
    }

    return null;
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Reset to first page when search term or items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage, sortConfig]);

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const pageButtons = [];
    const maxVisibleButtons = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    if (startPage > 1) {
      pageButtons.push(
        <button key="1" onClick={() => paginate(1)} className="py-1 px-3 border rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50">
          1
        </button>
      );
      if (startPage > 2) {
        pageButtons.push(
          <span key="ellipsis1" className="py-1 px-2 text-gray-500">...</span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`py-1 px-3 border rounded-md text-sm ${currentPage === i
            ? 'bg-blue-500 text-white border-blue-500'
            : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageButtons.push(
          <span key="ellipsis2" className="py-1 px-2 text-gray-500">...</span>
        );
      }
      pageButtons.push(
        <button
          key={totalPages}
          onClick={() => paginate(totalPages)}
          className="py-1 px-3 border rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50"
        >
          {totalPages}
        </button>
      );
    }

    return pageButtons;
  };

  const columnHeaders = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'gender', label: 'Gender' },
    { key: 'nationality', label: 'Nationality' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'address', label: 'Address' },
    { key: 'message', label: 'Message' },
    { key: 'date', label: 'Date' },
  ];

  return (
    <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-50 flex justify-start">
      <div className="w-full py-6 px-2 sm:px-8 transition-all duration-500 transform translate-y-0 opacity-100">
        {role === 'user' && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => goToHome()}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-all text-sm"
            >
              Back
            </button>
          </div>
        )}

        {/* Search and limit control row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          {/* Search input */}
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search submissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Records per page selector */}
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Show</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-gray-600 ml-2">per page</span>
          </div>
        </div>

        {/* Table with results */}
        <div className="overflow-x-auto mb-4 bg-white shadow-md rounded-md">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                {columnHeaders.map((column) => (
                  <th
                    key={column.key}
                    className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => requestSort(column.key as keyof SubmissionType)}
                  >
                    <div className="flex items-center">
                      {column.label}
                      {getSortIcon(column.key as keyof SubmissionType)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((submission, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{submission.id}</td>
                    <td className="py-4 px-4 text-sm text-gray-800">{submission.name}</td>
                    <td className="py-4 px-4 text-sm text-gray-800">{submission.gender}</td>
                    <td className="py-4 px-4 text-sm text-gray-800">{submission.nationality}</td>
                    <td className="py-4 px-4 text-sm text-gray-800">{submission.email}</td>
                    <td className="py-4 px-4 text-sm text-gray-800">{submission.phone}</td>
                    <td className="py-4 px-4 text-sm text-gray-800">{submission.address}</td>
                    <td className="py-4 px-4 text-sm text-gray-800">{submission.message}</td>
                    <td className="py-4 px-4 text-sm text-gray-800">24/16/2025</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-6 px-4 text-sm text-center text-gray-500">No matching records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="text-sm text-gray-600">
            Showing {sortedData.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, sortedData.length)} of {sortedData.length} entries
          </div>

          <div className="flex flex-wrap justify-center gap-1">
            <button
              onClick={() => paginate(1)}
              disabled={currentPage === 1}
              className={`py-1 px-3 border rounded-md text-sm ${currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
              First
            </button>

            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`py-1 px-3 border rounded-md text-sm ${currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
              Previous
            </button>

            {renderPaginationButtons()}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`py-1 px-3 border rounded-md text-sm ${currentPage === totalPages || totalPages === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
              Next
            </button>

            <button
              onClick={() => paginate(totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`py-1 px-3 border rounded-md text-sm ${currentPage === totalPages || totalPages === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
              Last
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submissions;